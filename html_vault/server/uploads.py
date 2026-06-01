from __future__ import annotations

import re
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from html_vault.builder import build_site
from html_vault.manifest import build_item
from html_vault.metadata import MetadataStore, dump_simple_yaml

from .config import ServerSettings
from .items import normalize_tags


class UploadError(ValueError):
    pass


@dataclass(frozen=True)
class UploadResult:
    upload_id: str
    item_id: str
    status: str
    item: dict[str, Any]


class UploadService:
    def __init__(self, settings: ServerSettings) -> None:
        self.settings = settings

    def import_html(
        self,
        filename: str,
        content: bytes,
        title: str = "",
        summary: str = "",
        collection: str = "",
        tags: str | list[str] = "",
    ) -> UploadResult:
        validate_html_upload(filename, content, self.settings.max_upload_bytes)
        now = datetime.now(timezone.utc)
        relative_path = self._next_import_path(filename, now)
        content_path = self.settings.content_dir / relative_path
        ensure_within(content_path, self.settings.content_dir)
        content_path.parent.mkdir(parents=True, exist_ok=True)
        content_path.write_bytes(content)

        metadata = build_upload_metadata(
            item_id=relative_path.as_posix(),
            title=title,
            summary=summary,
            collection=collection,
            tags=tags,
            now=now,
        )
        self._write_metadata(relative_path, metadata)

        item = build_item(content_path, self.settings.content_dir, MetadataStore.load(self.settings.meta_dir))
        build_site(
            content_dir=self.settings.content_dir,
            meta_dir=self.settings.meta_dir,
            output_dir=self.settings.public_dir,
            site_title=self.settings.site_title,
        )
        return UploadResult(
            upload_id=f"upl_{now.strftime('%Y%m%d%H%M%S')}_{content_path.stem}",
            item_id=item["id"],
            status="indexed",
            item=item,
        )

    def _next_import_path(self, filename: str, now: datetime) -> Path:
        stem = slugify_filename(Path(filename).stem)
        relative_dir = Path("imported") / now.strftime("%Y") / now.strftime("%m")
        candidate = relative_dir / f"{stem}.html"
        index = 2
        while (self.settings.content_dir / candidate).exists():
            candidate = relative_dir / f"{stem}-{index}.html"
            index += 1
        return candidate

    def _write_metadata(self, relative_path: Path, metadata: dict[str, Any]) -> None:
        if self.settings.meta_dir is None:
            return
        target = self.settings.meta_dir / "items" / relative_path.with_suffix(".yml")
        ensure_within(target, self.settings.meta_dir)
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(dump_simple_yaml(metadata), encoding="utf-8")


def validate_html_upload(filename: str, content: bytes, max_upload_bytes: int) -> None:
    if not filename.lower().endswith((".html", ".htm")):
        raise UploadError("Only .html and .htm files can be imported.")
    if not content:
        raise UploadError("Uploaded HTML file is empty.")
    if len(content) > max_upload_bytes:
        raise UploadError("Uploaded HTML file exceeds the configured size limit.")
    if b"\x00" in content[:1024]:
        raise UploadError("Uploaded file does not look like HTML text.")


def build_upload_metadata(
    item_id: str,
    title: str,
    summary: str,
    collection: str,
    tags: str | list[str],
    now: datetime,
) -> dict[str, Any]:
    metadata: dict[str, Any] = {
        "id": item_id,
        "source_type": "imported",
        "collection": collection.strip() or "Inbox",
        "tags": normalize_tags(tags),
        "status": "ready",
        "favorite": False,
        "archived": False,
        "pinned": False,
        "open_mode": "iframe",
        "created": now.isoformat(),
        "updated": now.isoformat(),
    }
    if title.strip():
        metadata["title"] = title.strip()
    if summary.strip():
        metadata["summary"] = summary.strip()
    return metadata


def slugify_filename(value: str) -> str:
    normalized = re.sub(r"[^A-Za-z0-9._-]+", "-", value.strip()).strip("-._").lower()
    return normalized or "imported-note"


def ensure_within(path: Path, root: Path) -> None:
    path.resolve().relative_to(root.resolve())
