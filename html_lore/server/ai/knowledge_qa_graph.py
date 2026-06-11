from __future__ import annotations

import uuid
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
    prompt_messages: list[dict[str, str]] = field(default_factory=list)
    agent_trace: list[dict[str, Any]] = field(default_factory=list)
    prompt_trace: list[dict[str, str]] = field(default_factory=list)
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
            ExternalSearchNode(external_search),
            EvidenceGateNode(max_prompt_chars=max_prompt_chars),
            AnswerAgentNode(model_client, max_response_tokens=max_response_tokens),
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


class EvidenceGateNode:
    name = "EvidenceGateNode"

    def __init__(self, *, max_prompt_chars: int = 12000) -> None:
        self.max_prompt_chars = max(1, int(max_prompt_chars or 12000))
        self.answer_agent = load_agent(ANSWER_AGENT_ID)
        self.answer_prompt = load_prompt(self.answer_agent.prompt_template)

    def run(self, state: KnowledgeQAState) -> None:
        if state.evidence:
            state.sources = state.evidence
            state.prompt_messages = build_answer_prompt(
                state.content,
                state.evidence,
                state.context_snapshot,
                state.recent_messages,
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
            state.answer = EXTERNAL_UNAVAILABLE_ANSWER
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
    agent: AgentSpec | None = None,
    prompt: PromptTemplate | None = None,
) -> list[dict[str, str]]:
    agent = agent or load_agent(ANSWER_AGENT_ID)
    prompt = prompt or load_prompt(agent.prompt_template)
    source_mode = str(snapshot.get("source_mode") or "local_only")
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
                f"CURRENT_CONTEXT:\n{context_text}\n\n"
                f"{recent_section}"
                f"USER_QUESTION:\n{content}\n\n"
                f"TRUSTED_EVIDENCE:\n{evidence_text}"
            ),
        },
    ]


def prompt_chars(messages: list[dict[str, str]]) -> int:
    return sum(len(str(message.get("content") or "")) for message in messages)


def format_evidence_for_prompt(index: int, item: dict[str, Any]) -> str:
    if item.get("kind") == "external":
        return f"[{index}] EXTERNAL: {item.get('title')} ({item.get('url')})\n{item.get('snippet')}"
    return f"[{index}] LOCAL: {item.get('title')} ({item.get('item_id')})\n{item.get('snippet')}"


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
