from __future__ import annotations

import uuid
import re
from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Any, Protocol

from html_lore.server.items import ItemService

from .conversations import ConversationStore
from .external_search import DisabledExternalSearchAdapter, ExternalSearchAdapter, ExternalSearchUnavailable, sanitize_external_results
from .guardrails import validate_answer, validate_message_budget, validate_prompt_budget, validate_user_message
from .model_client import ModelClient
from .registry import AgentSpec, PromptTemplate, load_agent, load_prompt
from .retrieval import retrieve_evidence_with_status


NO_EVIDENCE_ANSWER = "当前上下文没有足够资料回答这个问题。请调整上下文、选择相关笔记，或开启内容拓展后再试。"
EXTERNAL_UNAVAILABLE_ANSWER = "内容拓展尚未配置外部检索服务。当前上下文也没有足够资料回答这个问题。"
ANSWER_AGENT_ID = "knowledge_qa.answer_agent.v1"


class KnowledgeQANode(Protocol):
    name: str

    def run(self, state: "KnowledgeQAState") -> None:
        pass


@dataclass
class KnowledgeQAState:
    conversation_id: str
    conversation: dict[str, Any]
    content: str
    context_snapshot: dict[str, Any] = field(default_factory=dict)
    recent_messages: list[dict[str, str]] = field(default_factory=list)
    retrieval_query: str = ""
    evidence: list[dict[str, Any]] = field(default_factory=list)
    retrieval_status: dict[str, Any] = field(default_factory=dict)
    external_sources: list[dict[str, Any]] = field(default_factory=list)
    external_status: dict[str, Any] = field(default_factory=dict)
    expansion_policy: dict[str, Any] = field(default_factory=dict)
    evidence_budget: dict[str, Any] = field(default_factory=dict)
    prompt_messages: list[dict[str, str]] = field(default_factory=list)
    agent_trace: list[dict[str, Any]] = field(default_factory=list)
    prompt_trace: list[dict[str, str]] = field(default_factory=list)
    citation_report: dict[str, Any] = field(default_factory=dict)
    answer: str = ""
    sources: list[dict[str, Any]] = field(default_factory=list)
    usage: dict[str, Any] = field(default_factory=dict)
    budget: dict[str, Any] = field(default_factory=dict)
    skipped_model_call: bool = False
    stored_conversation: dict[str, Any] = field(default_factory=dict)
    node_trace: list[dict[str, str]] = field(default_factory=list)
    started_at: str = ""
    completed_at: str = ""
    duration_ms: int = 0

    def mark_completed(self, node_name: str) -> None:
        self.node_trace.append({"node": node_name, "status": "completed"})


class KnowledgeQAGraph:
    name = "KnowledgeQAAndNoteGraph.beta"

    def __init__(
        self,
        *,
        item_service: ItemService,
        model_client: ModelClient,
        conversation_store: ConversationStore,
        external_search: ExternalSearchAdapter | None = None,
        nodes: tuple[KnowledgeQANode, ...] | None = None,
        max_message_chars: int = 4000,
        max_prompt_chars: int = 12000,
        max_response_tokens: int = 1024,
        retrieval_mode: str = "keyword",
    ) -> None:
        external_search = external_search or DisabledExternalSearchAdapter()
        self.nodes = nodes or (
            InputGuardrailNode(max_message_chars=max_message_chars),
            RetrieverNode(item_service, model_client=model_client, retrieval_mode=retrieval_mode),
            ExpansionPolicyNode(),
            ExternalSearchNode(external_search),
            EvidenceGateNode(max_prompt_chars=max_prompt_chars),
            AnswerAgentNode(model_client, max_response_tokens=max_response_tokens),
            CitationVerifierNode(),
            OutputGuardrailNode(),
            ConversationPersistNode(conversation_store),
        )

    def run(self, state: KnowledgeQAState) -> KnowledgeQAState:
        started_at = datetime.now(timezone.utc)
        state.started_at = started_at.isoformat()
        try:
            for node in self.nodes:
                node.run(state)
                state.mark_completed(node.name)
        finally:
            completed_at = datetime.now(timezone.utc)
            state.completed_at = completed_at.isoformat()
            state.duration_ms = int((completed_at - started_at).total_seconds() * 1000)
        return state


class InputGuardrailNode:
    name = "InputGuardrailNode"

    def __init__(self, *, max_message_chars: int = 4000) -> None:
        self.max_message_chars = max(1, int(max_message_chars or 4000))

    def run(self, state: KnowledgeQAState) -> None:
        state.content = state.content.strip()
        validate_user_message(state.content)
        validate_message_budget(state.content, max_chars=self.max_message_chars)
        state.budget["message_chars"] = len(state.content)
        state.budget["max_message_chars"] = self.max_message_chars
        state.context_snapshot = state.conversation.get("context_snapshot") if isinstance(state.conversation.get("context_snapshot"), dict) else {}
        state.recent_messages = recent_conversation_messages(state.conversation.get("messages"))
        state.retrieval_query = build_retrieval_query(state.content, state.recent_messages)


class RetrieverNode:
    name = "RetrieverNode"

    def __init__(self, item_service: ItemService, *, model_client: ModelClient | None = None, retrieval_mode: str = "keyword") -> None:
        self.item_service = item_service
        self.model_client = model_client
        self.retrieval_mode = retrieval_mode

    def run(self, state: KnowledgeQAState) -> None:
        result = retrieve_evidence_with_status(
            self.item_service,
            state.context_snapshot,
            state.retrieval_query or state.content,
            mode=self.retrieval_mode,
            model_client=self.model_client,
        )
        state.evidence = result.evidence
        state.retrieval_status = result.status
        state.retrieval_status["query_expanded"] = bool(state.retrieval_query and state.retrieval_query != state.content)
        state.retrieval_status.update(retrieval_coverage_status(state.context_snapshot, state.evidence))


class ExternalSearchNode:
    name = "ExternalSearchNode"

    def __init__(self, external_search: ExternalSearchAdapter) -> None:
        self.external_search = external_search

    def run(self, state: KnowledgeQAState) -> None:
        source_mode = str(state.context_snapshot.get("source_mode") or "local_only")
        state.external_status = {"provider": self.external_search.name, "available": self.external_search.available}
        if source_mode != "local_plus_external":
            return
        if state.expansion_policy.get("mode") != "web_research":
            return
        if not self.external_search.available:
            state.external_status["message"] = "External content expansion is not configured."
            return
        try:
            results = self.external_search.search(state.content)
        except ExternalSearchUnavailable as exc:
            state.external_status.update({"available": False, "message": str(exc)})
            return
        state.external_sources, dropped = sanitize_external_results(results)
        state.evidence.extend(state.external_sources)
        state.external_status.update({"available": True, "count": len(state.external_sources), "dropped": dropped})


class ExpansionPolicyNode:
    name = "ExpansionPolicyNode"

    def run(self, state: KnowledgeQAState) -> None:
        source_mode = str(state.context_snapshot.get("source_mode") or "local_only")
        has_local_evidence = any(source.get("kind") != "external" for source in state.evidence)
        explicit_search = asks_for_external_search(state.content)
        time_sensitive = is_time_sensitive_question(state.content)
        if source_mode != "local_plus_external":
            state.expansion_policy = {
                "mode": "local_only",
                "reason": "content_expansion_disabled",
                "confidence": 1.0,
                "requires_citation": bool(state.evidence),
            }
            return
        if explicit_search or time_sensitive:
            state.expansion_policy = {
                "mode": "web_research",
                "reason": "explicit_search_request" if explicit_search else "time_sensitive_question",
                "confidence": 0.9,
                "requires_citation": True,
            }
            return
        if has_local_evidence:
            state.expansion_policy = {
                "mode": "local_evidence",
                "reason": "local_evidence_available",
                "confidence": 0.85,
                "requires_citation": True,
            }
            return
        state.expansion_policy = {
            "mode": "model_knowledge",
            "reason": "general_knowledge_fallback",
            "confidence": 0.72,
            "requires_citation": False,
        }


class EvidenceGateNode:
    name = "EvidenceGateNode"

    def __init__(self, *, max_prompt_chars: int = 12000) -> None:
        self.max_prompt_chars = max(1, int(max_prompt_chars or 12000))
        self.answer_agent = load_agent(ANSWER_AGENT_ID)
        self.answer_prompt = load_prompt(self.answer_agent.prompt_template)

    def run(self, state: KnowledgeQAState) -> None:
        allow_model_knowledge = state.expansion_policy.get("mode") == "model_knowledge"
        requires_web_research = state.expansion_policy.get("mode") == "web_research"
        has_external_evidence = any(source.get("kind") == "external" for source in state.evidence)
        if requires_web_research and not has_external_evidence:
            state.answer = EXTERNAL_UNAVAILABLE_ANSWER
            state.sources = []
            state.skipped_model_call = True
            return
        if state.evidence or allow_model_knowledge:
            budgeted_evidence, budgeted_history, budget_report = budget_prompt_inputs(
                content=state.content,
                evidence=state.evidence,
                snapshot=state.context_snapshot,
                recent_messages=state.recent_messages,
                expansion_policy=state.expansion_policy,
                max_prompt_chars=self.max_prompt_chars,
                agent=self.answer_agent,
                prompt=self.answer_prompt,
            )
            state.evidence = budgeted_evidence
            state.recent_messages = budgeted_history
            state.evidence_budget = budget_report
            state.retrieval_status["budget"] = budget_report
            state.sources = state.evidence
            state.prompt_messages = build_answer_prompt(
                state.content,
                budgeted_evidence,
                state.context_snapshot,
                budgeted_history,
                expansion_policy=state.expansion_policy,
                agent=self.answer_agent,
                prompt=self.answer_prompt,
            )
            state.agent_trace.append(self.answer_agent.public_dict())
            state.prompt_trace.append(self.answer_prompt.public_dict())
            state.budget["prompt_chars"] = prompt_chars(state.prompt_messages)
            state.budget["max_prompt_chars"] = self.max_prompt_chars
            validate_prompt_budget(state.prompt_messages, max_chars=self.max_prompt_chars)
            return
        if str(state.context_snapshot.get("source_mode") or "local_only") == "local_plus_external":
            if state.expansion_policy.get("mode") == "web_research":
                state.answer = EXTERNAL_UNAVAILABLE_ANSWER
            else:
                state.answer = NO_EVIDENCE_ANSWER
        else:
            state.answer = NO_EVIDENCE_ANSWER
        state.sources = []
        state.skipped_model_call = True


class AnswerAgentNode:
    name = "AnswerAgentNode"

    def __init__(self, model_client: ModelClient, *, max_response_tokens: int = 1024) -> None:
        self.model_client = model_client
        self.max_response_tokens = max(1, int(max_response_tokens or 1024))

    def run(self, state: KnowledgeQAState) -> None:
        if state.skipped_model_call:
            return
        state.budget["max_response_tokens"] = self.max_response_tokens
        response = self.model_client.chat(messages=state.prompt_messages, max_tokens=self.max_response_tokens)
        state.answer = str(response.get("content") or "").strip()
        state.usage = response.get("usage") if isinstance(response.get("usage"), dict) else {}


class CitationVerifierNode:
    name = "CitationVerifierNode"

    def run(self, state: KnowledgeQAState) -> None:
        state.citation_report = verify_answer_citations(
            state.answer,
            state.sources,
            requires_citation=bool(state.expansion_policy.get("requires_citation")),
        )


class OutputGuardrailNode:
    name = "OutputGuardrailNode"

    def run(self, state: KnowledgeQAState) -> None:
        if state.skipped_model_call:
            return
        validate_answer(state.answer)


class ConversationPersistNode:
    name = "ConversationPersistNode"

    def __init__(self, conversation_store: ConversationStore) -> None:
        self.conversation_store = conversation_store

    def run(self, state: KnowledgeQAState) -> None:
        state.stored_conversation = self.conversation_store.append_messages(
            state.conversation_id,
            [
                {"role": "user", "content": state.content},
                {"role": "assistant", "content": state.answer, "sources": state.sources},
            ],
        )


def build_answer_prompt(
    content: str,
    evidence: list[dict[str, Any]],
    snapshot: dict[str, Any],
    recent_messages: list[dict[str, str]] | None = None,
    *,
    expansion_policy: dict[str, Any] | None = None,
    agent: AgentSpec | None = None,
    prompt: PromptTemplate | None = None,
) -> list[dict[str, str]]:
    agent = agent or load_agent(ANSWER_AGENT_ID)
    prompt = prompt or load_prompt(agent.prompt_template)
    source_mode = str(snapshot.get("source_mode") or "local_only")
    policy = expansion_policy if isinstance(expansion_policy, dict) else {}
    context_text = format_context_for_prompt(snapshot)
    recent_text = format_recent_conversation_for_prompt(recent_messages or [])
    evidence_text = "\n\n".join(
        format_evidence_for_prompt(index, item)
        for index, item in enumerate(evidence, start=1)
    )
    recent_section = f"RECENT_CONVERSATION:\n{recent_text}\n\n" if recent_text else ""
    return [
        {
            "role": "system",
            "content": prompt.render({}),
        },
        {
            "role": "user",
            "content": (
                f"SOURCE_MODE: {source_mode}\n"
                f"EXPANSION_POLICY: {format_expansion_policy_for_prompt(policy)}\n"
                f"CURRENT_CONTEXT:\n{context_text}\n\n"
                f"{recent_section}"
                f"USER_QUESTION:\n{content}\n\n"
                f"TRUSTED_EVIDENCE:\n{evidence_text}"
            ),
        },
    ]


def budget_prompt_inputs(
    *,
    content: str,
    evidence: list[dict[str, Any]],
    snapshot: dict[str, Any],
    recent_messages: list[dict[str, str]],
    expansion_policy: dict[str, Any],
    max_prompt_chars: int,
    agent: AgentSpec,
    prompt: PromptTemplate,
) -> tuple[list[dict[str, Any]], list[dict[str, str]], dict[str, Any]]:
    original_evidence_count = len(evidence)
    original_history_count = len(recent_messages)
    working_evidence = [dict(item) for item in evidence]
    working_history = list(recent_messages)
    max_chars = max(1, int(max_prompt_chars or 1))
    trimmed_evidence_chars = False
    dropped_evidence = 0
    dropped_history = 0

    if working_evidence:
        per_snippet_limit = evidence_snippet_limit(max_chars, len(working_evidence))
        trimmed: list[dict[str, Any]] = []
        for item in working_evidence:
            snippet = str(item.get("snippet") or "")
            if len(snippet) > per_snippet_limit:
                item["snippet"] = snippet[:per_snippet_limit].rstrip() + "..."
                trimmed_evidence_chars = True
            trimmed.append(item)
        working_evidence = trimmed

    messages = build_answer_prompt(
        content,
        working_evidence,
        snapshot,
        working_history,
        expansion_policy=expansion_policy,
        agent=agent,
        prompt=prompt,
    )
    while prompt_chars(messages) > max_chars and working_history:
        working_history = working_history[1:]
        dropped_history += 1
        messages = build_answer_prompt(
            content,
            working_evidence,
            snapshot,
            working_history,
            expansion_policy=expansion_policy,
            agent=agent,
            prompt=prompt,
        )
    while prompt_chars(messages) > max_chars and len(working_evidence) > 1:
        working_evidence = drop_lowest_priority_evidence(working_evidence)
        dropped_evidence += 1
        messages = build_answer_prompt(
            content,
            working_evidence,
            snapshot,
            working_history,
            expansion_policy=expansion_policy,
            agent=agent,
            prompt=prompt,
        )

    report = {
        "max_prompt_chars": max_chars,
        "original_evidence_count": original_evidence_count,
        "selected_evidence_count": len(working_evidence),
        "dropped_evidence_count": dropped_evidence,
        "original_history_count": original_history_count,
        "selected_history_count": len(working_history),
        "dropped_history_count": dropped_history,
        "trimmed_evidence_chars": trimmed_evidence_chars,
        "prompt_chars_after_budget": prompt_chars(messages),
    }
    return working_evidence, working_history, report


def evidence_snippet_limit(max_prompt_chars: int, evidence_count: int) -> int:
    if evidence_count <= 0:
        return 0
    evidence_budget = max(240, int(max_prompt_chars * 0.42))
    return max(160, min(900, evidence_budget // max(1, evidence_count)))


def drop_lowest_priority_evidence(evidence: list[dict[str, Any]]) -> list[dict[str, Any]]:
    if len(evidence) <= 1:
        return evidence
    indexed = list(enumerate(evidence))
    drop_index, _ = min(indexed, key=lambda pair: (evidence_priority(pair[1]), -pair[0]))
    return [item for index, item in indexed if index != drop_index]


def evidence_priority(item: dict[str, Any]) -> int:
    if item.get("kind") == "external":
        return safe_int(item.get("score"), 100)
    return safe_int(item.get("score"), 0)


def safe_int(value: Any, fallback: int) -> int:
    try:
        return int(value)
    except (TypeError, ValueError):
        return fallback


def prompt_chars(messages: list[dict[str, str]]) -> int:
    return sum(len(str(message.get("content") or "")) for message in messages)


def verify_answer_citations(answer: str, sources: list[dict[str, Any]], *, requires_citation: bool = False) -> dict[str, Any]:
    source_count = len(sources)
    cited_refs = citation_numbers(answer)
    invalid_refs = sorted({number for number in cited_refs if number < 1 or number > source_count})
    missing_required = bool(requires_citation and source_count and not cited_refs)
    if invalid_refs:
        status = "invalid_reference"
    elif missing_required:
        status = "missing_citation"
    elif cited_refs:
        status = "valid"
    else:
        status = "not_required"
    return {
        "status": status,
        "valid": not invalid_refs and not missing_required,
        "requires_citation": bool(requires_citation),
        "source_count": source_count,
        "has_citations": bool(cited_refs),
        "cited_refs": cited_refs,
        "invalid_refs": invalid_refs,
        "missing_required": missing_required,
    }


def citation_numbers(answer: str) -> list[int]:
    refs: list[int] = []
    for match in re.finditer(r"\[((?:\d+\s*(?:[,，]\s*)?)+)\]", str(answer or "")):
        for part in re.split(r"[,，]\s*", match.group(1)):
            part = part.strip()
            if not part:
                continue
            try:
                refs.append(int(part))
            except ValueError:
                continue
    return sorted(set(refs))


def format_evidence_for_prompt(index: int, item: dict[str, Any]) -> str:
    if item.get("kind") == "external":
        return f"[{index}] EXTERNAL: {item.get('title')} ({item.get('url')})\n{item.get('snippet')}"
    return f"[{index}] LOCAL: {item.get('title')} ({item.get('item_id')})\n{item.get('snippet')}"


def format_expansion_policy_for_prompt(policy: dict[str, Any]) -> str:
    if not policy:
        return "mode=local_only, reason=default, general_knowledge_allowed=false, web_research_required=false"
    mode = str(policy.get("mode") or "local_only")
    general_allowed = mode == "model_knowledge"
    web_required = mode == "web_research"
    reason = str(policy.get("reason") or "")
    return (
        f"mode={mode}, reason={reason}, "
        f"general_knowledge_allowed={str(general_allowed).lower()}, "
        f"web_research_required={str(web_required).lower()}"
    )


def format_context_for_prompt(snapshot: dict[str, Any]) -> str:
    scope = str(snapshot.get("scope") or "global")
    requested = snapshot.get("requested") if isinstance(snapshot.get("requested"), dict) else {}
    items = snapshot.get("items") if isinstance(snapshot.get("items"), list) else []
    lines = [
        f"scope: {scope}",
        f"item_count: {snapshot.get('item_count', len(items))}",
    ]
    if requested:
        requested_parts = []
        for key in ("library", "collection", "tags", "tag_match", "favorite", "include_archived", "q"):
            value = requested.get(key)
            if value not in (None, "", []):
                requested_parts.append(f"{key}={value}")
        if requested_parts:
            lines.append(f"requested: {', '.join(str(part) for part in requested_parts)}")
    if items:
        lines.append("items:")
        for index, item in enumerate(items[:30], start=1):
            title = str(item.get("title") or item.get("id") or "").strip()
            item_id = str(item.get("id") or "").strip()
            collection = str(item.get("collection") or "").strip()
            tags = ", ".join(str(tag) for tag in item.get("tags") or [] if str(tag).strip())
            summary = str(item.get("summary") or "").strip()
            meta = " / ".join(part for part in (collection, tags) if part)
            suffix = f" ({meta})" if meta else ""
            summary_part = f" - {summary[:180]}" if summary else ""
            lines.append(f"{index}. {title or item_id}{suffix}{summary_part}")
        if len(items) > 30:
            lines.append(f"... {len(items) - 30} more items omitted from context summary")
    return "\n".join(lines)


def recent_conversation_messages(messages: Any, *, limit: int = 6) -> list[dict[str, str]]:
    if not isinstance(messages, list):
        return []
    normalized: list[dict[str, str]] = []
    for message in messages:
        if not isinstance(message, dict):
            continue
        role = str(message.get("role") or "").strip().lower()
        content = str(message.get("content") or "").strip()
        if role not in {"user", "assistant"} or not content:
            continue
        normalized.append({"role": role, "content": content[:900]})
    return normalized[-max(1, int(limit or 6)) :]


def build_retrieval_query(content: str, recent_messages: list[dict[str, str]]) -> str:
    question = str(content or "").strip()
    if not recent_messages or not is_followup_question(question):
        return question
    history = " ".join(message["content"] for message in recent_messages[-4:])
    return f"{history[:1600]} {question}".strip()


def is_followup_question(content: str) -> bool:
    normalized = str(content or "").strip().lower()
    if not normalized:
        return False
    if len(normalized) > 120:
        return False
    followup_markers = [
        "continue",
        "tell me more",
        "what about",
        "how about",
        "that",
        "this",
        "it",
        "they",
        "them",
        "those",
        "继续",
        "展开",
        "详细",
        "再说",
        "这个",
        "这些",
        "它",
        "他们",
        "上述",
        "前面",
        "刚才",
        "还有",
        "呢",
        "続け",
        "詳しく",
        "それ",
        "これ",
    ]
    return any(marker in normalized for marker in followup_markers)


def asks_for_external_search(content: str) -> bool:
    normalized = str(content or "").strip().lower()
    markers = [
        "search",
        "web",
        "online",
        "source",
        "official",
        "link",
        "citation",
        "查一下",
        "联网",
        "网上",
        "官网",
        "链接",
        "来源",
        "引用",
        "調べ",
        "検索",
        "公式",
        "リンク",
    ]
    return any(marker in normalized for marker in markers)


def is_time_sensitive_question(content: str) -> bool:
    normalized = str(content or "").strip().lower()
    markers = [
        "latest",
        "current",
        "today",
        "yesterday",
        "recent",
        "now",
        "price",
        "pricing",
        "version",
        "release",
        "news",
        "law",
        "policy",
        "ceo",
        "最新",
        "当前",
        "现在",
        "今天",
        "昨天",
        "最近",
        "价格",
        "报价",
        "版本",
        "发布",
        "新闻",
        "政策",
        "法规",
        "法律",
        "最新",
        "現在",
        "今日",
        "昨日",
        "最近",
        "価格",
        "料金",
        "バージョン",
        "リリース",
        "ニュース",
        "法律",
    ]
    if any(marker in normalized for marker in markers):
        return True
    year = datetime.now(timezone.utc).year
    return str(year) in normalized or str(year - 1) in normalized or str(year + 1) in normalized


def format_recent_conversation_for_prompt(messages: list[dict[str, str]]) -> str:
    if not messages:
        return ""
    lines = []
    for index, message in enumerate(messages, start=1):
        role = "USER" if message.get("role") == "user" else "ASSISTANT"
        content = str(message.get("content") or "").replace("\n", " ").strip()
        lines.append(f"{index}. {role}: {content[:600]}")
    return "\n".join(lines)


def retrieval_coverage_status(snapshot: dict[str, Any], evidence: list[dict[str, Any]]) -> dict[str, Any]:
    context_ids = [str(item_id) for item_id in snapshot.get("item_ids") or [] if str(item_id)]
    evidence_ids = {
        str(item.get("item_id") or "")
        for item in evidence
        if item.get("kind") != "external" and str(item.get("item_id") or "")
    }
    context_count = len(context_ids)
    covered_count = len(evidence_ids)
    return {
        "context_item_count": context_count,
        "covered_item_count": covered_count,
        "coverage_ratio": round(covered_count / context_count, 4) if context_count else 0,
    }


def public_qa_run(state: KnowledgeQAState, *, status: str = "completed", error: dict[str, str] | None = None) -> dict[str, Any]:
    local_sources = [source for source in state.sources if source.get("kind") != "external"]
    external_sources = [source for source in state.sources if source.get("kind") == "external"]
    return {
        "id": f"qa_{uuid.uuid4().hex}",
        "kind": "knowledge_qa",
        "status": status,
        "started_at": state.started_at,
        "completed_at": state.completed_at,
        "duration_ms": state.duration_ms,
        "conversation_id": state.conversation_id,
        "spec": {"source_mode": str(state.context_snapshot.get("source_mode") or "local_only")},
        "graph": KnowledgeQAGraph.name,
        "generation_intent": {},
        "qa_report": {
            "source_count": len(state.sources),
            "local_source_count": len(local_sources),
            "external_source_count": len(external_sources),
            "skipped_model_call": bool(state.skipped_model_call),
            "retrieval": state.retrieval_status,
            "external_status": state.external_status,
            "expansion_policy": state.expansion_policy,
            "evidence_budget": state.evidence_budget,
            "citation": state.citation_report,
        },
        "review_decision": {},
        "node_trace": state.node_trace,
        "agent_trace": state.agent_trace,
        "prompt_trace": state.prompt_trace,
        "usage": state.usage,
        "budget": state.budget,
        "error": error or {},
        "material": {},
        "item_id": "",
    }
