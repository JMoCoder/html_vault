from __future__ import annotations

import json
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Literal

from html_lore.builder import build_site

from .config import ServerSettings


JobKind = Literal["rebuild", "upload"]
JobStatus = Literal["completed", "failed"]


@dataclass(frozen=True)
class JobRecord:
    job_id: str
    kind: JobKind
    status: JobStatus
    created: str
    updated: str
    message: str = ""
    item_id: str = ""
    upload_id: str = ""

    def to_dict(self) -> dict[str, Any]:
        data = {
            "job_id": self.job_id,
            "kind": self.kind,
            "status": self.status,
            "created": self.created,
            "updated": self.updated,
        }
        if self.message:
            data["message"] = self.message
        if self.item_id:
            data["item_id"] = self.item_id
        if self.upload_id:
            data["upload_id"] = self.upload_id
        return data


class JobError(ValueError):
    pass


class JobStore:
    def __init__(self, settings: ServerSettings) -> None:
        self.settings = settings
        self.path = settings.meta_dir / "config" / "jobs.json" if settings.meta_dir else settings.public_dir / ".html-lore-jobs.json"
        legacy_path = settings.public_dir / ".html-vault-jobs.json"
        if settings.meta_dir is None and not self.path.exists() and legacy_path.exists():
            self.path = legacy_path

    def save(self, record: JobRecord) -> dict[str, Any]:
        jobs = self._read()
        jobs[record.job_id] = record.to_dict()
        self._write(jobs)
        return jobs[record.job_id]

    def get(self, job_id: str) -> dict[str, Any]:
        jobs = self._read()
        found = jobs.get(job_id)
        if not found:
            raise JobError("Job not found.")
        return found

    def find_upload(self, upload_id: str) -> dict[str, Any]:
        for record in self._read().values():
            if record.get("kind") == "upload" and record.get("upload_id") == upload_id:
                return record
        raise JobError("Upload not found.")

    def _read(self) -> dict[str, dict[str, Any]]:
        if not self.path.exists():
            return {}
        try:
            data = json.loads(self.path.read_text(encoding="utf-8"))
        except json.JSONDecodeError as exc:
            raise JobError("Job store is not valid JSON.") from exc
        if not isinstance(data, dict):
            raise JobError("Job store must be a JSON object.")
        return {str(key): value for key, value in data.items() if isinstance(value, dict)}

    def _write(self, jobs: dict[str, dict[str, Any]]) -> None:
        self.path.parent.mkdir(parents=True, exist_ok=True)
        self.path.write_text(json.dumps(jobs, ensure_ascii=False, indent=2, sort_keys=True), encoding="utf-8")


class JobService:
    def __init__(self, settings: ServerSettings) -> None:
        self.settings = settings
        self.store = JobStore(settings)

    def rebuild(self) -> dict[str, Any]:
        now = datetime.now(timezone.utc)
        job_id = f"reb_{now.strftime('%Y%m%d%H%M%S%f')}"
        try:
            build_site(
                content_dir=self.settings.content_dir,
                meta_dir=self.settings.meta_dir,
                output_dir=self.settings.public_dir,
                site_title=self.settings.site_title,
            )
        except Exception as exc:  # pragma: no cover - defensive status persistence
            record = make_job_record(job_id=job_id, kind="rebuild", status="failed", message=str(exc), now=now)
            self.store.save(record)
            raise JobError(str(exc)) from exc
        return self.store.save(make_job_record(job_id=job_id, kind="rebuild", status="completed", now=now))

    def record_upload(self, upload_id: str, item_id: str, status: str) -> dict[str, Any]:
        now = datetime.now(timezone.utc)
        job_id = f"upl_job_{now.strftime('%Y%m%d%H%M%S%f')}"
        message = "Upload indexed." if status == "indexed" else f"Upload status: {status}."
        record = make_job_record(
            job_id=job_id,
            kind="upload",
            status="completed",
            message=message,
            item_id=item_id,
            upload_id=upload_id,
            now=now,
        )
        return self.store.save(record)

    def get_job(self, job_id: str) -> dict[str, Any]:
        return self.store.get(job_id)

    def get_upload(self, upload_id: str) -> dict[str, Any]:
        return self.store.find_upload(upload_id)


def make_job_record(
    *,
    job_id: str,
    kind: JobKind,
    status: JobStatus,
    now: datetime,
    message: str = "",
    item_id: str = "",
    upload_id: str = "",
) -> JobRecord:
    timestamp = now.isoformat()
    return JobRecord(
        job_id=job_id,
        kind=kind,
        status=status,
        created=timestamp,
        updated=timestamp,
        message=message,
        item_id=item_id,
        upload_id=upload_id,
    )
