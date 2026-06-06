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

    def get(self, run_id: str) -> dict[str, Any]:
        for run in self._read().get("runs", []):
            if run.get("id") == run_id:
                return run
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
        "conversation_id": str(run.get("conversation_id") or ""),
        "spec": run.get("spec") if isinstance(run.get("spec"), dict) else {},
        "graph": str(run.get("graph") or ""),
        "generation_intent": run.get("generation_intent") if isinstance(run.get("generation_intent"), dict) else {},
        "qa_report": run.get("qa_report") if isinstance(run.get("qa_report"), dict) else {},
        "review_decision": run.get("review_decision") if isinstance(run.get("review_decision"), dict) else {},
        "node_trace": run.get("node_trace") if isinstance(run.get("node_trace"), list) else [],
        "item_id": str(run.get("item_id") or ""),
    }
