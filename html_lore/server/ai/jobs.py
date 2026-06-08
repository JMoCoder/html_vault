from __future__ import annotations

import json
import threading
import uuid
from collections import deque
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Callable

from html_lore.server.config import ServerSettings


AIJobTask = Callable[[], dict[str, Any]]
AI_JOB_STATUSES = {"pending", "running", "completed", "failed", "cancelled"}


class AIJobError(ValueError):
    pass


@dataclass(frozen=True)
class EnqueuedAIJob:
    settings: ServerSettings
    job_id: str
    task: AIJobTask


class AIJobStore:
    def __init__(self, settings: ServerSettings) -> None:
        self.settings = settings
        self.path = ai_jobs_path(settings)

    def create(self, *, kind: str, label: str = "") -> dict[str, Any]:
        now = utc_now()
        job = sanitize_ai_job(
            {
                "job_id": f"ai_job_{uuid.uuid4().hex}",
                "kind": kind,
                "status": "pending",
                "label": label,
                "created_at": now,
                "updated_at": now,
                "started_at": "",
                "completed_at": "",
                "message": "",
                "run_id": "",
                "item_id": "",
                "error": {},
                "cancel_requested": False,
            },
        )
        data = self._read()
        data.setdefault("jobs", []).append(job)
        self._write(data)
        return job

    def list(self, limit: int = 20) -> list[dict[str, Any]]:
        safe_limit = max(1, min(int(limit or 20), 100))
        jobs = [sanitize_ai_job(job) for job in self._read().get("jobs", []) if isinstance(job, dict)]
        return sorted(jobs, key=lambda job: str(job.get("created_at") or ""), reverse=True)[:safe_limit]

    def get(self, job_id: str) -> dict[str, Any]:
        for job in self._read().get("jobs", []):
            if job.get("job_id") == job_id:
                return sanitize_ai_job(job)
        raise AIJobError("AI job not found.")

    def update(self, job_id: str, values: dict[str, Any]) -> dict[str, Any]:
        data = self._read()
        now = utc_now()
        for job in data.get("jobs", []):
            if job.get("job_id") != job_id:
                continue
            job.update(values)
            job["updated_at"] = now
            data["jobs"] = [sanitize_ai_job(item) for item in data.get("jobs", []) if isinstance(item, dict)]
            self._write(data)
            return self.get(job_id)
        raise AIJobError("AI job not found.")

    def cancel(self, job_id: str) -> dict[str, Any]:
        job = self.get(job_id)
        status = str(job.get("status") or "")
        if status == "pending":
            return self.update(job_id, {"status": "cancelled", "cancel_requested": True, "completed_at": utc_now(), "message": "AI job cancelled before it started."})
        if status == "running":
            return self.update(job_id, {"cancel_requested": True, "message": "Cancellation requested. The current provider call may finish first."})
        if status in {"completed", "failed", "cancelled"}:
            return job
        raise AIJobError("AI job cannot be cancelled.")

    def _read(self) -> dict[str, Any]:
        if not self.path.exists():
            return {"version": 1, "jobs": []}
        try:
            data = json.loads(self.path.read_text(encoding="utf-8"))
        except json.JSONDecodeError as exc:
            raise AIJobError("AI job store is not valid JSON.") from exc
        if not isinstance(data, dict):
            raise AIJobError("AI job store must be a JSON object.")
        jobs = data.get("jobs", [])
        if not isinstance(jobs, list):
            raise AIJobError("AI job store jobs must be a list.")
        return {"version": int(data.get("version") or 1), "jobs": jobs}

    def _write(self, data: dict[str, Any]) -> None:
        self.path.parent.mkdir(parents=True, exist_ok=True)
        self.path.write_text(json.dumps(data, ensure_ascii=False, indent=2, sort_keys=True) + "\n", encoding="utf-8")


class AIJobQueue:
    def __init__(self) -> None:
        self._pending: deque[EnqueuedAIJob] = deque()
        self._condition = threading.Condition()
        self._worker: threading.Thread | None = None

    def enqueue(self, *, settings: ServerSettings, job: dict[str, Any], task: AIJobTask) -> None:
        with self._condition:
            self._pending.append(EnqueuedAIJob(settings=settings, job_id=str(job["job_id"]), task=task))
            if self._worker is None or not self._worker.is_alive():
                self._worker = threading.Thread(target=self._run, name="html-lore-ai-job-worker", daemon=True)
                self._worker.start()
            self._condition.notify()

    def _run(self) -> None:
        while True:
            with self._condition:
                while not self._pending:
                    self._condition.wait(timeout=10)
                    if not self._pending:
                        return
                entry = self._pending.popleft()
            self._execute(entry)

    def _execute(self, entry: EnqueuedAIJob) -> None:
        store = AIJobStore(entry.settings)
        try:
            job = store.get(entry.job_id)
        except AIJobError:
            return
        if job.get("cancel_requested") or job.get("status") == "cancelled":
            store.update(entry.job_id, {"status": "cancelled", "completed_at": utc_now(), "message": "AI job cancelled before it started."})
            return
        store.update(entry.job_id, {"status": "running", "started_at": utc_now(), "message": "AI job is running."})
        try:
            result = entry.task()
        except Exception as exc:  # pragma: no cover - defensive worker boundary
            store.update(
                entry.job_id,
                {
                    "status": "failed",
                    "completed_at": utc_now(),
                    "message": str(exc),
                    "error": {"code": exc.__class__.__name__, "message": str(exc)},
                },
            )
            return
        run = result.get("run") if isinstance(result.get("run"), dict) else {}
        item = result.get("item") if isinstance(result.get("item"), dict) else {}
        store.update(
            entry.job_id,
            {
                "status": "completed",
                "completed_at": utc_now(),
                "message": "AI job completed.",
                "run_id": str(run.get("id") or ""),
                "item_id": str(item.get("id") or ""),
            },
        )


ai_job_queue = AIJobQueue()


def ai_jobs_path(settings: ServerSettings) -> Path:
    if settings.meta_dir is None:
        return settings.public_dir / ".html-lore-ai-jobs.json"
    return settings.meta_dir / "ai" / "jobs.json"


def sanitize_ai_job(job: dict[str, Any]) -> dict[str, Any]:
    status = str(job.get("status") or "pending")
    if status not in AI_JOB_STATUSES:
        status = "pending"
    return {
        "job_id": str(job.get("job_id") or ""),
        "kind": str(job.get("kind") or ""),
        "status": status,
        "label": str(job.get("label") or "")[:160],
        "created_at": str(job.get("created_at") or ""),
        "updated_at": str(job.get("updated_at") or ""),
        "started_at": str(job.get("started_at") or ""),
        "completed_at": str(job.get("completed_at") or ""),
        "message": str(job.get("message") or "")[:240],
        "run_id": str(job.get("run_id") or ""),
        "item_id": str(job.get("item_id") or ""),
        "error": sanitize_error(job.get("error")),
        "cancel_requested": bool(job.get("cancel_requested")),
        "cancellable": status in {"pending", "running"},
        "retryable": status == "failed",
    }


def sanitize_error(value: Any) -> dict[str, str]:
    if not isinstance(value, dict):
        return {}
    result: dict[str, str] = {}
    code = str(value.get("code") or "")[:80]
    message = str(value.get("message") or "")[:240]
    if code:
        result["code"] = code
    if message:
        result["message"] = message
    return result


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()
