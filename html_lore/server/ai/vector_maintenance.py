from __future__ import annotations

from dataclasses import dataclass
from typing import Any

from html_lore.server.items import ItemService

from .model_client import ModelClient
from .providers import AIProviderConfig
from .retrieval import build_vector_chunks
from .vector_store import LocalVectorStore, VectorStoreUnavailable


class VectorMaintenanceError(ValueError):
    pass


@dataclass(frozen=True)
class VectorMaintenanceService:
    item_service: ItemService
    model_client: ModelClient | None = None

    def stats(self) -> dict[str, Any]:
        store = self._store()
        stats = store.stats()
        valid_item_ids = self._active_item_ids()
        stale_item_ids = store.indexed_item_ids() - valid_item_ids
        return {
            **stats,
            "active_item_count": len(valid_item_ids),
            "stale_item_count": len(stale_item_ids),
        }

    def prune(self) -> dict[str, Any]:
        store = self._store()
        return {"vector_index": store.prune_to_items(self._active_item_ids())}

    def clear(self) -> dict[str, Any]:
        store = self._store()
        return {"vector_index": store.clear()}

    def clear_items(self, item_ids: set[str]) -> dict[str, Any]:
        store = self._store()
        return {"vector_index": store.remove_items(item_ids)}

    def rebuild(self) -> dict[str, Any]:
        store = self._store()
        client = self._client()
        embedding_model = str(client.config.embedding_model or "").strip()
        if not embedding_model:
            raise VectorMaintenanceError("AI embedding model is not configured.")
        active_item_ids = self._active_item_ids()
        cleared = store.clear()
        chunks = build_vector_chunks(
            self.item_service,
            {"scope": "global", "item_ids": sorted(active_item_ids)},
            embedding_model,
            client,
            store,
        )
        upserted = store.upsert_chunks(chunks)
        return {
            "cleared": cleared,
            "rebuilt": upserted,
            "active_item_count": len(active_item_ids),
            "embedding_model": embedding_model,
        }

    def smoke_test_embedding(self) -> dict[str, Any]:
        client = self._client()
        embedding_model = str(client.config.embedding_model or "").strip()
        if not embedding_model:
            raise VectorMaintenanceError("AI embedding model is not configured.")
        vector = client.embed(text="HTMlore embedding smoke test.")
        return {
            "ok": bool(vector),
            "embedding_model": embedding_model,
            "dimensions": len(vector),
        }

    def _active_item_ids(self) -> set[str]:
        return {
            str(item.get("id") or "")
            for item in self.item_service.manifest().get("items", [])
            if item.get("id") and not bool(item.get("archived"))
        }

    def _store(self) -> LocalVectorStore:
        try:
            return LocalVectorStore(self.item_service.settings)
        except VectorStoreUnavailable as exc:
            raise VectorMaintenanceError(str(exc)) from exc

    def _client(self) -> ModelClient:
        if self.model_client is None:
            raise VectorMaintenanceError("AI model client is not configured.")
        return self.model_client


def clear_vector_index_for_items(item_service: ItemService, item_ids: set[str]) -> None:
    try:
        VectorMaintenanceService(item_service=item_service).clear_items(item_ids)
    except VectorMaintenanceError:
        return


def vector_maintenance_for_config(item_service: ItemService, config: AIProviderConfig) -> VectorMaintenanceService:
    return VectorMaintenanceService(item_service=item_service, model_client=ModelClient(config))
