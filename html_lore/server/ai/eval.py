from __future__ import annotations

import json
import uuid
from dataclasses import dataclass
from pathlib import Path
from typing import Any

from html_lore.server.config import ServerSettings
from html_lore.server.items import ItemService

from .context import ContextResolver, utc_now
from .knowledge_qa_graph import KnowledgeQAGraph, KnowledgeQAState, public_qa_run
from .model_client import ModelClient
from .providers import AIProviderConfig


DEFAULT_EVAL_QUESTIONS = [
    "Summarize the current knowledge base.",
    "What does MCP security cover?",
    "What Docker topics are mentioned?",
]


@dataclass(frozen=True)
class KnowledgeQAEvalSpec:
    content_dir: Path
    meta_dir: Path | None
    public_dir: Path
    questions: list[str]
    provider: str = "fake"
    base_url: str = ""
    api_key: str = ""
    model: str = "fake-eval-model"
    source_mode: str = "local_only"
    retrieval_mode: str = "keyword"
    max_context_items: int = 50
    max_prompt_chars: int = 12000
    max_response_tokens: int = 1024


def run_knowledge_qa_eval(spec: KnowledgeQAEvalSpec) -> dict[str, Any]:
    settings = ServerSettings(
        content_dir=spec.content_dir,
        meta_dir=spec.meta_dir,
        public_dir=spec.public_dir,
        site_title="HTMlore QA Eval",
        max_upload_bytes=10 * 1024 * 1024,
        ai_max_context_items=spec.max_context_items,
        ai_max_prompt_chars=spec.max_prompt_chars,
        ai_max_response_tokens=spec.max_response_tokens,
        ai_retrieval_mode=spec.retrieval_mode,
    )
    item_service = ItemService(settings)
    conversation_store = InMemoryEvalConversationStore(item_service, max_context_items=spec.max_context_items)
    model_client = ModelClient(
        AIProviderConfig(
            provider=spec.provider,
            base_url=spec.base_url,
            api_key=spec.api_key,
            model=spec.model,
            enabled=True,
        ),
    )
    manifest_items = item_service.manifest().get("items", [])
    context = {
        "source_mode": spec.source_mode,
        "context": {
            "scope": "global",
            "library": "all",
            "include_archived": False,
            "limit": spec.max_context_items,
        },
    }
    results: list[dict[str, Any]] = []
    for question in spec.questions:
        conversation = conversation_store.create(context)
        state = KnowledgeQAState(conversation_id=conversation["id"], conversation=conversation, content=question)
        status = "completed"
        error: dict[str, str] = {}
        try:
            state = KnowledgeQAGraph(
                item_service=item_service,
                model_client=model_client,
                conversation_store=conversation_store,
                max_prompt_chars=spec.max_prompt_chars,
                max_response_tokens=spec.max_response_tokens,
                retrieval_mode=spec.retrieval_mode,
            ).run(state)
        except Exception as exc:  # pragma: no cover - exact exception types are covered by graph tests
            status = "failed"
            error = {"code": exc.__class__.__name__, "message": str(exc)}
        run = public_qa_run(state, status=status, error=error)
        results.append(
            {
                "question": question,
                "status": status,
                "answer_preview": state.answer[:240],
                "source_count": run["qa_report"]["source_count"],
                "sources": [
                    {
                        "source_index": source.get("source_index"),
                        "title": source.get("title"),
                        "item_id": source.get("item_id"),
                        "url": source.get("url"),
                        "kind": source.get("kind", "local"),
                    }
                    for source in state.sources[:5]
                ],
                "retrieval": run["qa_report"]["retrieval"],
                "citation": run["qa_report"]["citation"],
                "budget": run["budget"],
                "error": error,
            },
        )
    return {
        "kind": "knowledge_qa_eval",
        "provider": spec.provider,
        "model": spec.model,
        "source_mode": spec.source_mode,
        "retrieval_mode": spec.retrieval_mode,
        "persistent": False,
        "item_count": len(manifest_items),
        "question_count": len(spec.questions),
        "results": results,
    }


def load_eval_questions(path: Path | None) -> list[str]:
    if path is None:
        return list(DEFAULT_EVAL_QUESTIONS)
    data = json.loads(path.read_text(encoding="utf-8"))
    if isinstance(data, list):
        return [str(item).strip() for item in data if str(item).strip()]
    if isinstance(data, dict) and isinstance(data.get("questions"), list):
        return [str(item).strip() for item in data["questions"] if str(item).strip()]
    raise ValueError("Question file must be a JSON list or an object with a questions list.")


class InMemoryEvalConversationStore:
    def __init__(self, item_service: ItemService, *, max_context_items: int) -> None:
        self.item_service = item_service
        self.max_context_items = max_context_items
        self.conversations: dict[str, dict[str, Any]] = {}

    def create(self, values: dict[str, Any]) -> dict[str, Any]:
        snapshot = ContextResolver(self.item_service, max_context_items=self.max_context_items).resolve(values)
        now = utc_now()
        conversation = {
            "id": uuid.uuid4().hex,
            "title": "QA eval",
            "source_mode": snapshot["source_mode"],
            "context_key": snapshot["context_key"],
            "context_snapshot": snapshot,
            "message_count": 0,
            "messages": [],
            "created_at": now,
            "updated_at": now,
        }
        self.conversations[conversation["id"]] = conversation
        return conversation

    def append_messages(self, conversation_id: str, messages: list[dict[str, Any]]) -> dict[str, Any]:
        conversation = self.conversations[conversation_id]
        now = utc_now()
        stored_messages = conversation.setdefault("messages", [])
        for message in messages:
            stored_messages.append(
                {
                    "id": uuid.uuid4().hex,
                    "role": str(message.get("role") or ""),
                    "content": str(message.get("content") or ""),
                    "sources": list(message.get("sources") or []),
                    "created_at": now,
                },
            )
        conversation["message_count"] = len(stored_messages)
        conversation["updated_at"] = now
        return conversation
