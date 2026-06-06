from __future__ import annotations

import re
from dataclasses import dataclass
from html.parser import HTMLParser
from typing import Any

from html_lore.server.items import ItemContentError, ItemService


MAX_CHUNK_CHARS = 1800
MAX_EVIDENCE_CHARS = 5000


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
    item_ids = [str(item_id) for item_id in context_snapshot.get("item_ids", []) if item_id]
    if not item_ids:
        return []
    manifest_items = {str(item.get("id") or ""): item for item in item_service.manifest().get("items", [])}
    evidences: list[Evidence] = []
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
        if score <= 0:
            continue
        evidences.append(
            Evidence(
                item_id=item_id,
                title=str(item.get("title") or item_id),
                snippet=snippet_for_query(text, query),
                score=score,
            ),
        )
    return [evidence.as_dict() for evidence in sorted(evidences, key=lambda item: (-item.score, item.title))[:max_results]]


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


def query_tokens(query: str) -> list[str]:
    ascii_tokens = re.findall(r"[a-z0-9][a-z0-9._-]{1,}", query.lower())
    cjk_tokens = re.findall(r"[\u4e00-\u9fff]{2,}", query)
    return [*ascii_tokens, *cjk_tokens]


def is_hidden(attrs: dict[str, str]) -> bool:
    if "hidden" in attrs:
        return True
    if attrs.get("aria-hidden", "").lower() == "true":
        return True
    style = attrs.get("style", "").replace(" ", "").lower()
    return "display:none" in style or "visibility:hidden" in style


def normalize_space(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()
