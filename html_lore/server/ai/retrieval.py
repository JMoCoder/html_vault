from __future__ import annotations

import re
from dataclasses import dataclass
from html.parser import HTMLParser
from typing import Any

from html_lore.server.items import ItemContentError, ItemService

from .model_client import ModelClient


MAX_CHUNK_CHARS = 1800
MAX_EVIDENCE_CHARS = 5000
RETRIEVAL_MODES = {"keyword", "vector", "hybrid"}


@dataclass(frozen=True)
class Evidence:
    item_id: str
    title: str
    snippet: str
    score: int

    def as_dict(self) -> dict[str, Any]:
        return {
            "item_id": self.item_id,
            "title": self.title,
            "snippet": self.snippet,
            "score": self.score,
        }


class RetrievalUnavailable(RuntimeError):
    pass


@dataclass(frozen=True)
class RetrievalResult:
    evidence: list[dict[str, Any]]
    status: dict[str, Any]


class SafeTextExtractor(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.skip_stack: list[str] = []
        self.parts: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attr_map = {name.lower(): str(value or "") for name, value in attrs}
        if tag.lower() in {"script", "style", "noscript", "template", "iframe", "svg"} or is_hidden(attr_map):
            self.skip_stack.append(tag.lower())
            return
        if tag.lower() in {"p", "div", "section", "article", "br", "li", "tr", "h1", "h2", "h3", "h4", "h5", "h6"}:
            self.parts.append("\n")

    def handle_endtag(self, tag: str) -> None:
        if self.skip_stack:
            if self.skip_stack[-1] == tag.lower():
                self.skip_stack.pop()
            return
        if tag.lower() in {"p", "div", "section", "article", "li", "tr"}:
            self.parts.append("\n")

    def handle_data(self, data: str) -> None:
        if not self.skip_stack and data.strip():
            self.parts.append(data)

    def text(self) -> str:
        return normalize_space(" ".join(self.parts))


def extract_safe_text(html: str) -> str:
    parser = SafeTextExtractor()
    parser.feed(html)
    parser.close()
    return parser.text()


def retrieve_evidence(item_service: ItemService, context_snapshot: dict[str, Any], query: str, *, max_results: int = 5) -> list[dict[str, Any]]:
    return retrieve_keyword_evidence(item_service, context_snapshot, query, max_results=max_results)


def retrieve_evidence_with_status(
    item_service: ItemService,
    context_snapshot: dict[str, Any],
    query: str,
    *,
    mode: str = "keyword",
    model_client: ModelClient | None = None,
    max_results: int = 5,
) -> RetrievalResult:
    requested_mode = normalize_retrieval_mode(mode)
    if requested_mode == "keyword":
        evidence = retrieve_keyword_evidence(item_service, context_snapshot, query, max_results=max_results)
        return RetrievalResult(
            evidence=evidence,
            status={
                "requested_mode": requested_mode,
                "effective_mode": "keyword",
                "fallback": False,
                "source_count": len(evidence),
            },
        )

    try:
        evidence = retrieve_vector_evidence(
            item_service,
            context_snapshot,
            query,
            model_client=model_client,
            max_results=max_results,
        )
        return RetrievalResult(
            evidence=evidence,
            status={
                "requested_mode": requested_mode,
                "effective_mode": "vector",
                "fallback": False,
                "source_count": len(evidence),
            },
        )
    except Exception as exc:
        evidence = retrieve_keyword_evidence(item_service, context_snapshot, query, max_results=max_results)
        return RetrievalResult(
            evidence=evidence,
            status={
                "requested_mode": requested_mode,
                "effective_mode": "keyword",
                "fallback": True,
                "reason": retrieval_error_reason(exc),
                "source_count": len(evidence),
            },
        )


def retrieve_keyword_evidence(item_service: ItemService, context_snapshot: dict[str, Any], query: str, *, max_results: int = 5) -> list[dict[str, Any]]:
    item_ids = [str(item_id) for item_id in context_snapshot.get("item_ids", []) if item_id]
    if not item_ids:
        return []
    manifest_items = {str(item.get("id") or ""): item for item in item_service.manifest().get("items", [])}
    evidences: list[Evidence] = []
    fallback_candidates: list[Evidence] = []
    scope = str(context_snapshot.get("scope") or "")
    generic_question = is_generic_context_question(query)
    allow_generic_fallback = scope in {"reader", "manual"} and generic_question
    overview_scope = scope not in {"reader", "manual"} and is_context_overview_question(query)
    for item_id in item_ids:
        item = manifest_items.get(item_id)
        if not item or bool(item.get("archived")):
            continue
        try:
            html = item_service.read_item_content(item_id)
        except ItemContentError:
            continue
        text = evidence_text(item, html)
        score = score_text(query, text)
        if overview_scope:
            fallback_candidates.append(
                Evidence(
                    item_id=item_id,
                    title=str(item.get("title") or item_id),
                    snippet=overview_snippet(item, text),
                    score=max(score, 1),
                ),
            )
            continue
        if score <= 0:
            if allow_generic_fallback:
                fallback_candidates.append(
                    Evidence(
                        item_id=item_id,
                        title=str(item.get("title") or item_id),
                        snippet=snippet_for_query(text, query),
                        score=1,
                    ),
                )
            continue
        evidences.append(
            Evidence(
                item_id=item_id,
                title=str(item.get("title") or item_id),
                snippet=snippet_for_query(text, query),
                score=score,
            ),
        )
    if overview_scope and fallback_candidates:
        return [
            evidence.as_dict()
            for evidence in sorted(fallback_candidates, key=lambda item: (-item.score, item.title))[:max_results]
        ]
    if not evidences and fallback_candidates:
        return [evidence.as_dict() for evidence in fallback_candidates[:max_results]]
    return [evidence.as_dict() for evidence in sorted(evidences, key=lambda item: (-item.score, item.title))[:max_results]]


def retrieve_vector_evidence(
    item_service: ItemService,
    context_snapshot: dict[str, Any],
    query: str,
    *,
    model_client: ModelClient | None,
    max_results: int = 5,
) -> list[dict[str, Any]]:
    if model_client is None:
        raise RetrievalUnavailable("Embedding model client is not configured.")
    # The embedding/vector-store path is intentionally scaffolded only. It lets
    # deployments enable vector mode without breaking QA while the concrete
    # vector store remains a later pluggable backend.
    model_client.embed(text=query)
    raise RetrievalUnavailable("Vector store is not configured.")


def normalize_retrieval_mode(mode: str) -> str:
    normalized = str(mode or "keyword").strip().lower()
    return normalized if normalized in RETRIEVAL_MODES else "keyword"


def retrieval_error_reason(exc: Exception) -> str:
    if isinstance(exc, NotImplementedError):
        return "embedding_not_implemented"
    if isinstance(exc, RetrievalUnavailable):
        return "vector_unavailable"
    return exc.__class__.__name__


def evidence_text(item: dict[str, Any], html: str) -> str:
    fields = [
        str(item.get("title") or ""),
        str(item.get("summary") or ""),
        str(item.get("collection") or ""),
        " ".join(str(tag) for tag in item.get("tags") or []),
        extract_safe_text(html),
    ]
    return normalize_space(" ".join(fields))[:MAX_EVIDENCE_CHARS]


def score_text(query: str, text: str) -> int:
    normalized_query = normalize_space(query).lower()
    normalized_text = text.lower()
    if not normalized_query:
        return 0
    score = 0
    if normalized_query in normalized_text:
        score += 30
    for token in query_tokens(normalized_query):
        if token in normalized_text:
            score += max(2, min(len(token), 20))
    return score


def snippet_for_query(text: str, query: str) -> str:
    normalized = normalize_space(text)
    lowered = normalized.lower()
    positions = [lowered.find(token) for token in query_tokens(query.lower()) if token and lowered.find(token) >= 0]
    start = max(min(positions) - 180, 0) if positions else 0
    snippet = normalized[start : start + MAX_CHUNK_CHARS]
    return snippet.strip()


def overview_snippet(item: dict[str, Any], text: str) -> str:
    summary = str(item.get("summary") or "").strip()
    title = str(item.get("title") or item.get("id") or "").strip()
    prefix = f"{title}. {summary}".strip()
    if summary:
        return normalize_space(prefix)[:MAX_CHUNK_CHARS]
    return normalize_space(text)[:MAX_CHUNK_CHARS]


def query_tokens(query: str) -> list[str]:
    ascii_tokens = re.findall(r"[a-z0-9][a-z0-9._-]{1,}", query.lower())
    cjk_tokens: list[str] = []
    for segment in re.findall(r"[\u4e00-\u9fff]{2,}", query):
        stripped = strip_cjk_stopwords(segment)
        if len(stripped) >= 2:
            cjk_tokens.append(stripped)
        cjk_tokens.extend(re.findall(r"[\u4e00-\u9fff]{2}", stripped))
    return dedupe_tokens([*ascii_tokens, *cjk_tokens])


def is_generic_context_question(query: str) -> bool:
    normalized = normalize_space(query).lower()
    if not normalized:
        return False
    generic_patterns = [
        r"\bsummary\b",
        r"\bsummarize\b",
        r"\boverview\b",
        r"\bwhat (is|does).{0,32}(note|document|article|file).{0,24}(about|cover)",
        r"\bwhat.{0,24}(this|the).{0,16}(note|document|article|file).{0,24}(about|cover)",
        r"总结",
        r"概括",
        r"摘要",
        r"这[篇个份]?(.{0,8})(文章|文档|笔记|文件)?.{0,8}(讲|说|介绍|关于)",
        r"(文章|文档|笔记|文件).{0,8}(讲|说|介绍|关于).{0,8}(什么|啥)",
        r"要約",
        r"概要",
        r"まとめ",
        r"この(.{0,8})(文章|文書|ノート|ファイル).{0,12}(何|内容)",
    ]
    return any(re.search(pattern, normalized) for pattern in generic_patterns)


def is_context_overview_question(query: str) -> bool:
    normalized = normalize_space(query).lower()
    if not normalized:
        return False
    overview_patterns = [
        r"\ball notes\b",
        r"\ball documents\b",
        r"\ball files\b",
        r"\bknowledge base\b",
        r"\bworkspace\b",
        r"\boverview\b",
        r"\bsummarize.{0,24}(all|workspace|knowledge base)",
        r"所有.{0,8}(笔记|文档|文件|内容)",
        r"(笔记|文档|文件|知识库).{0,12}(总览|概览|梳理|总结|主题)",
        r"(梳理|总结|概括).{0,12}(知识库|全部|所有)",
        r"有哪些.{0,6}(主题|内容)",
        r"すべて.{0,8}(ノート|文書|ファイル)",
        r"(ナレッジ|ワークスペース).{0,12}(概要|要約|整理)",
    ]
    return any(re.search(pattern, normalized) for pattern in overview_patterns)


def strip_cjk_stopwords(value: str) -> str:
    stripped = value
    for word in ("这个", "这篇", "这份", "文章", "文档", "笔记", "文件", "什么", "一下", "一下子", "请问", "可以", "帮我", "关于", "的是", "了吗"):
        stripped = stripped.replace(word, "")
    return stripped


def dedupe_tokens(tokens: list[str]) -> list[str]:
    seen: set[str] = set()
    result: list[str] = []
    for token in tokens:
        normalized = token.strip().lower()
        if len(normalized) < 2 or normalized in seen:
            continue
        result.append(normalized)
        seen.add(normalized)
    return result


def is_hidden(attrs: dict[str, str]) -> bool:
    if "hidden" in attrs:
        return True
    if attrs.get("aria-hidden", "").lower() == "true":
        return True
    style = attrs.get("style", "").replace(" ", "").lower()
    return "display:none" in style or "visibility:hidden" in style


def normalize_space(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()
