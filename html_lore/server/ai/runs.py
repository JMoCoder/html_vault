from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from html_lore.server.config import ServerSettings


class AIRunError(ValueError):
    pass


class AIRunStore:
    def __init__(self, settings: ServerSettings) -> None:
        self.settings = settings
        self.path = runs_path(settings)

    def add(self, run: dict[str, Any]) -> dict[str, Any]:
        if self.path is None:
            raise AIRunError("Metadata directory is not configured.")
        data = self._read()
        public = sanitize_run(run)
        data.setdefault("runs", []).append(public)
        self._write(data)
        return public

    def list(self, limit: int = 20) -> list[dict[str, Any]]:
        safe_limit = max(1, min(int(limit or 20), 100))
        runs = [sanitize_run(run) for run in self._read().get("runs", []) if isinstance(run, dict)]
        return list(reversed(runs))[:safe_limit]

    def get(self, run_id: str) -> dict[str, Any]:
        for run in self._read().get("runs", []):
            if run.get("id") == run_id:
                return sanitize_run(run) if isinstance(run, dict) else {}
        raise AIRunError("AI run not found.")

    def _read(self) -> dict[str, Any]:
        if self.path is None or not self.path.exists():
            return {"version": 1, "runs": []}
        try:
            data = json.loads(self.path.read_text(encoding="utf-8"))
        except json.JSONDecodeError as exc:
            raise AIRunError("AI run store is not valid JSON.") from exc
        if not isinstance(data, dict):
            raise AIRunError("AI run store must be a JSON object.")
        runs = data.get("runs", [])
        if not isinstance(runs, list):
            raise AIRunError("AI run store runs must be a list.")
        return {"version": int(data.get("version") or 1), "runs": runs}

    def _write(self, data: dict[str, Any]) -> None:
        if self.path is None:
            return
        self.path.parent.mkdir(parents=True, exist_ok=True)
        self.path.write_text(json.dumps(data, ensure_ascii=False, indent=2, sort_keys=True) + "\n", encoding="utf-8")


def runs_path(settings: ServerSettings) -> Path | None:
    if settings.meta_dir is None:
        return None
    return settings.meta_dir / "ai" / "runs.json"


def sanitize_run(run: dict[str, Any]) -> dict[str, Any]:
    return {
        "id": str(run.get("id") or ""),
        "kind": str(run.get("kind") or ""),
        "status": str(run.get("status") or ""),
        "started_at": str(run.get("started_at") or ""),
        "completed_at": str(run.get("completed_at") or ""),
        "duration_ms": sanitize_duration(run.get("duration_ms")),
        "conversation_id": str(run.get("conversation_id") or ""),
        "spec": run.get("spec") if isinstance(run.get("spec"), dict) else {},
        "graph": str(run.get("graph") or ""),
        "generation_intent": run.get("generation_intent") if isinstance(run.get("generation_intent"), dict) else {},
        "qa_report": run.get("qa_report") if isinstance(run.get("qa_report"), dict) else {},
        "review_decision": run.get("review_decision") if isinstance(run.get("review_decision"), dict) else {},
        "node_trace": run.get("node_trace") if isinstance(run.get("node_trace"), list) else [],
        "usage": sanitize_usage(run.get("usage")),
        "error": sanitize_error(run.get("error")),
        "material": run.get("material") if isinstance(run.get("material"), dict) else {},
        "item_id": str(run.get("item_id") or ""),
    }


def sanitize_duration(value: Any) -> int:
    try:
        return max(0, int(value or 0))
    except (TypeError, ValueError):
        return 0


def sanitize_usage(value: Any) -> dict[str, int]:
    if not isinstance(value, dict):
        return {}
    result: dict[str, int] = {}
    for key in ("input_tokens", "output_tokens", "total_tokens"):
        try:
            number = int(value.get(key) or 0)
        except (TypeError, ValueError):
            number = 0
        if number > 0:
            result[key] = number
    return result


def sanitize_error(value: Any) -> dict[str, str]:
    if not isinstance(value, dict):
        return {}
    code = str(value.get("code") or "").strip()[:80]
    message = str(value.get("message") or "").strip()[:240]
    result: dict[str, str] = {}
    if code:
        result["code"] = code
    if message:
        result["message"] = message
    return result
