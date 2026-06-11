from __future__ import annotations

from datetime import datetime, timezone
from typing import Any

from html_lore.server.items import ItemService

from .model_client import ModelClient
from .retrieval import RetrievalResult, retrieve_evidence_with_status


class RetrievalSkill:
    id = "retrieval.hybrid_rank"
    version = "v1"

    def __init__(self, item_service: ItemService, *, model_client: ModelClient | None = None, mode: str = "keyword") -> None:
        self.item_service = item_service
        self.model_client = model_client
        self.mode = mode

    def run(self, context_snapshot: dict[str, Any], query: str) -> tuple[RetrievalResult, dict[str, Any]]:
        started_at = utc_now()
        try:
            result = retrieve_evidence_with_status(
                self.item_service,
                context_snapshot,
                query,
                mode=self.mode,
                model_client=self.model_client,
            )
            status = "completed"
            error: dict[str, str] = {}
        except Exception as exc:
            result = RetrievalResult(evidence=[], status={})
            status = "failed"
            error = {"type": exc.__class__.__name__}
            raise
        finally:
            completed_at = utc_now()
        trace = {
            "skill_id": self.id,
            "version": self.version,
            "started_at": started_at,
            "completed_at": completed_at,
            "status": status,
            "input_summary": {
                "query_chars": len(str(query or "")),
                "context_item_count": len(context_snapshot.get("item_ids") or []),
                "requested_mode": str(self.mode or "keyword"),
            },
            "output_summary": {
                "evidence_count": len(result.evidence),
                "effective_mode": str(result.status.get("effective_mode") or ""),
                "fallback": bool(result.status.get("fallback")),
            },
            "error": error,
        }
        return result, trace


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()
