from __future__ import annotations

from typing import Any

from html_lore.server.config import ServerSettings
from html_lore.server.items import ItemService

from .context import AIContextError, ContextResolver
from .conversations import ConversationError, ConversationStore
from .external_search import build_external_search_adapter
from .guardrails import GuardrailError
from .html_generation import GenerationSpec, HtmlGenerationError, generate_note_from_conversation
from .knowledge_qa_graph import KnowledgeQAGraph, KnowledgeQAState
from .material_generation import MaterialGenerationError, generate_note_from_material
from .model_client import ModelClient, test_provider
from .providers import AIProviderConfigError, AIProviderConfigStore, ProviderCallError
from .runs import AIRunError, AIRunStore


class AIService:
    def __init__(self, store: AIProviderConfigStore) -> None:
        self.store = store

    def provider(self) -> dict[str, Any]:
        return {"provider": self.store.get().public_dict()}

    def update_provider(self, values: dict[str, Any]) -> dict[str, Any]:
        config = self.store.update(values)
        return {"provider": config.public_dict()}

    def status(self) -> dict[str, Any]:
        config = self.store.get()
        client_status = ModelClient(config).status()
        return {
            "configured": config.configured,
            "available": bool(client_status["available"]),
            "message": client_status["message"],
            "provider": config.public_dict(),
        }

    def test_provider(self) -> dict[str, Any]:
        config = self.store.get()
        return test_provider(config)


class AIConversationService:
    def __init__(
        self,
        settings: ServerSettings,
        store: ConversationStore,
        item_service: ItemService,
        provider_store: AIProviderConfigStore,
        run_store: AIRunStore,
    ) -> None:
        self.settings = settings
        self.store = store
        self.item_service = item_service
        self.provider_store = provider_store
        self.run_store = run_store

    def resolve_context(self, values: dict[str, Any]) -> dict[str, Any]:
        return {"context": ContextResolver(self.item_service).resolve(values)}

    def create(self, values: dict[str, Any]) -> dict[str, Any]:
        return {"conversation": self.store.create(values)}

    def list(self) -> dict[str, Any]:
        conversations = self.store.list()
        return {"conversations": conversations, "count": len(conversations)}

    def get(self, conversation_id: str) -> dict[str, Any]:
        return {"conversation": self.store.get(conversation_id)}

    def delete(self, conversation_id: str) -> dict[str, Any]:
        return self.store.delete(conversation_id)

    def messages(self, conversation_id: str) -> dict[str, Any]:
        messages = self.store.list_messages(conversation_id)
        return {"messages": messages, "count": len(messages)}

    def add_message(self, conversation_id: str, values: dict[str, Any]) -> dict[str, Any]:
        content = str(values.get("content") or values.get("message") or "").strip()
        conversation = self.store.get(conversation_id)
        try:
            state = KnowledgeQAGraph(
                item_service=self.item_service,
                model_client=ModelClient(self.provider_store.get()),
                conversation_store=self.store,
                external_search=build_external_search_adapter(self.settings),
            ).run(
                KnowledgeQAState(
                    conversation_id=conversation_id,
                    conversation=conversation,
                    content=content,
                ),
            )
        except (AIProviderConfigError, ProviderCallError) as exc:
            raise ConversationError(str(exc)) from exc
        return {
            "conversation": state.stored_conversation,
            "message": state.stored_conversation["messages"][-1],
            "sources": state.sources,
            "usage": state.usage,
            "graph": KnowledgeQAGraph.name,
            "node_trace": state.node_trace,
            "external_status": state.external_status,
        }

    def generate_note(self, conversation_id: str, values: dict[str, Any]) -> dict[str, Any]:
        conversation = self.store.get(conversation_id)
        spec = GenerationSpec.from_values(values)
        result = generate_note_from_conversation(settings=self.settings, conversation=conversation, spec=spec)
        run = self.run_store.add(result["run"])
        return {"run": run, "item": result["item"]}

    def generate_note_from_material(self, *, filename: str, content: bytes, instruction: str, values: dict[str, Any]) -> dict[str, Any]:
        spec = GenerationSpec.from_values(values)
        result = generate_note_from_material(
            settings=self.settings,
            filename=filename,
            content=content,
            instruction=instruction,
            spec=spec,
        )
        run = self.run_store.add(result["run"])
        return {"run": run, "item": result["item"]}

    def run(self, run_id: str) -> dict[str, Any]:
        return {"run": self.run_store.get(run_id)}


__all__ = [
    "AIContextError",
    "AIConversationService",
    "AIProviderConfigError",
    "AIProviderConfigStore",
    "AIService",
    "ConversationError",
    "ConversationStore",
    "GuardrailError",
    "HtmlGenerationError",
    "MaterialGenerationError",
    "AIRunError",
    "AIRunStore",
]
