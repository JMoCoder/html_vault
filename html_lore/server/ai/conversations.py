from __future__ import annotations

import json
import uuid
from pathlib import Path
from typing import Any

from html_lore.server.config import ServerSettings
from html_lore.server.items import ItemService

from .context import ContextResolver, utc_now


class ConversationError(ValueError):
    pass


class ConversationStore:
    def __init__(self, settings: ServerSettings, item_service: ItemService) -> None:
        self.settings = settings
        self.item_service = item_service
        self.path = conversations_path(settings)

    def list(self) -> list[dict[str, Any]]:
        return sorted(self._read().get("conversations", []), key=lambda item: str(item.get("updated_at") or ""), reverse=True)

    def get(self, conversation_id: str) -> dict[str, Any]:
        for conversation in self._read().get("conversations", []):
            if conversation.get("id") == conversation_id:
                return conversation
        raise ConversationError("Conversation not found.")

    def create(self, values: dict[str, Any]) -> dict[str, Any]:
        if self.path is None:
            raise ConversationError("Metadata directory is not configured.")
        snapshot = ContextResolver(self.item_service, max_context_items=self.settings.ai_max_context_items).resolve(values)
        now = utc_now()
        conversation = {
            "id": uuid.uuid4().hex,
            "title": conversation_title(snapshot),
            "source_mode": snapshot["source_mode"],
            "context_snapshot": snapshot,
            "message_count": 0,
            "messages": [],
            "created_at": now,
            "updated_at": now,
        }
        data = self._read()
        data.setdefault("conversations", []).append(conversation)
        self._write(data)
        return conversation

    def delete(self, conversation_id: str) -> dict[str, Any]:
        if self.path is None:
            raise ConversationError("Metadata directory is not configured.")
        data = self._read()
        conversations = data.get("conversations", [])
        kept = [item for item in conversations if item.get("id") != conversation_id]
        if len(kept) == len(conversations):
            raise ConversationError("Conversation not found.")
        data["conversations"] = kept
        self._write(data)
        return {"id": conversation_id, "deleted": True}

    def list_messages(self, conversation_id: str) -> list[dict[str, Any]]:
        return list(self.get(conversation_id).get("messages") or [])

    def append_messages(self, conversation_id: str, messages: list[dict[str, Any]]) -> dict[str, Any]:
        if self.path is None:
            raise ConversationError("Metadata directory is not configured.")
        data = self._read()
        now = utc_now()
        for conversation in data.get("conversations", []):
            if conversation.get("id") != conversation_id:
                continue
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
            self._write(data)
            return conversation
        raise ConversationError("Conversation not found.")

    def _read(self) -> dict[str, Any]:
        if self.path is None or not self.path.exists():
            return {"version": 1, "conversations": []}
        try:
            data = json.loads(self.path.read_text(encoding="utf-8"))
        except json.JSONDecodeError as exc:
            raise ConversationError("Conversation store is not valid JSON.") from exc
        if not isinstance(data, dict):
            raise ConversationError("Conversation store must be a JSON object.")
        conversations = data.get("conversations", [])
        if not isinstance(conversations, list):
            raise ConversationError("Conversation store conversations must be a list.")
        return {"version": int(data.get("version") or 1), "conversations": conversations}

    def _write(self, data: dict[str, Any]) -> None:
        if self.path is None:
            return
        self.path.parent.mkdir(parents=True, exist_ok=True)
        self.path.write_text(json.dumps(data, ensure_ascii=False, indent=2, sort_keys=True) + "\n", encoding="utf-8")


def conversations_path(settings: ServerSettings) -> Path | None:
    if settings.meta_dir is None:
        return None
    return settings.meta_dir / "ai" / "conversations.json"


def conversation_title(snapshot: dict[str, Any]) -> str:
    items = snapshot.get("items") if isinstance(snapshot.get("items"), list) else []
    if snapshot.get("scope") == "manual":
        return f"Selected notes ({len(items)})"
    if snapshot.get("scope") == "reader" and items:
        return str(items[0].get("title") or "Current note")
    requested = snapshot.get("requested") if isinstance(snapshot.get("requested"), dict) else {}
    if requested.get("collection"):
        return f"Collection: {requested['collection']}"
    tags = requested.get("tags") if isinstance(requested.get("tags"), list) else []
    if tags:
        return "Tags: " + ", ".join(str(tag) for tag in tags)
    if requested.get("q"):
        return f"Search: {requested['q']}"
    return "All notes"
