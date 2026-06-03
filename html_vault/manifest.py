from __future__ import annotations

from collections import Counter
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from typing import Any

from .metadata import MetadataStore


def build_manifest(
    content_dir: Path,
    meta_dir: Path | None = None,
    site_title: str = "HTML Vault",
) -> dict[str, Any]:
    metadata = MetadataStore.load(meta_dir)
    items = [
        build_item(path, content_dir, metadata)
        for path in sorted(content_dir.rglob("*.html")) if content_dir.exists()
        if path.is_file()
    ]
    pinned = [item for item in items if item["pinned"]]
    unpinned = [item for item in items if not item["pinned"]]
    pinned.sort(key=lambda item: (item["updated"], item["title"]), reverse=True)
    unpinned.sort(key=lambda item: (item["updated"], item["title"]), reverse=True)
    items = pinned + unpinned

    return {
        "version": 2,
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "site": {
            "title": site_title,
            "layout": "cards",
        },
        "items": items,
        "collections": summarize_collections(items),
        "tags": summarize_tags(items),
    }


def build_item(path: Path, content_dir: Path, metadata: MetadataStore) -> dict[str, Any]:
    relative = path.relative_to(content_dir).as_posix()
    html = path.read_text(encoding="utf-8", errors="replace")
    extracted = extract_html_metadata(html, path)
    sidecar = metadata.for_item(relative)
    stat = path.stat()
    updated = datetime.fromtimestamp(stat.st_mtime, timezone.utc).isoformat()

    collection = sidecar.get("collection") or infer_collection(relative)
    source_type = sidecar.get("source_type") or infer_source_type(relative)

    item = {
        "id": sidecar.get("id") or relative,
        "title": sidecar.get("title") or extracted["title"],
        "summary": sidecar.get("summary") or extracted["summary"],
        "path": f"content/{relative}",
        "source_type": source_type,
        "source_url": sidecar.get("source_url"),
        "collection": collection,
        "tags": sidecar.get("tags") or [],
        "status": sidecar.get("status") or "ready",
        "review_status": sidecar.get("review_status") or "reviewed",
        "favorite": bool(sidecar.get("favorite", False)),
        "archived": bool(sidecar.get("archived", False)),
        "pinned": bool(sidecar.get("pinned", False)),
        "created": sidecar.get("created") or updated,
        "updated": sidecar.get("updated") or updated,
        "cover": sidecar.get("cover"),
        "open_mode": sidecar.get("open_mode") or "iframe",
        "agent": sidecar.get("agent") or {"generated": source_type == "topic"},
    }
    return item


def extract_html_metadata(html: str, path: Path) -> dict[str, str]:
    parser = MetadataHTMLParser()
    parser.feed(html)
    title = parser.title or parser.h1
    if not title:
        title = filename_to_title(path.stem)

    summary = parser.description or parser.first_paragraph
    if len(summary) > 220:
        summary = summary[:217].rstrip() + "..."

    return {"title": title, "summary": summary}


class MetadataHTMLParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.title = ""
        self.h1 = ""
        self.description = ""
        self.first_paragraph = ""
        self._capture: str | None = None
        self._buffer: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attrs_map = {key.lower(): value for key, value in attrs}
        if tag == "meta" and str(attrs_map.get("name") or "").lower() == "description":
            self.description = (attrs_map.get("content") or "").strip()
        if tag in {"title", "h1", "p"}:
            if tag == "title" and self.title:
                return
            if tag == "h1" and self.h1:
                return
            if tag == "p" and self.first_paragraph:
                return
            self._capture = tag
            self._buffer = []

    def handle_data(self, data: str) -> None:
        if self._capture:
            self._buffer.append(data)

    def handle_endtag(self, tag: str) -> None:
        if tag != self._capture:
            return
        text = " ".join("".join(self._buffer).split())
        if tag == "title" and not self.title:
            self.title = text
        elif tag == "h1" and not self.h1:
            self.h1 = text
        elif tag == "p" and not self.first_paragraph:
            self.first_paragraph = text
        self._capture = None
        self._buffer = []


def infer_collection(item_id: str) -> str:
    first_part = item_id.split("/", 1)[0]
    if first_part == item_id:
        return "Inbox"
    return filename_to_title(first_part)


def infer_source_type(item_id: str) -> str:
    if item_id.startswith("generated/"):
        return "topic"
    if item_id.startswith("imported/"):
        return "imported"
    return "html"


def filename_to_title(value: str) -> str:
    return " ".join(part.capitalize() for part in value.replace("_", "-").split("-") if part)


def summarize_collections(items: list[dict[str, Any]]) -> list[dict[str, Any]]:
    counts = Counter(item.get("collection") or "Inbox" for item in items)
    return [
        {"id": slugify(name), "name": name, "count": count}
        for name, count in sorted(counts.items(), key=lambda pair: pair[0].lower())
    ]


def summarize_tags(items: list[dict[str, Any]]) -> list[dict[str, Any]]:
    counts: Counter[str] = Counter()
    for item in items:
        counts.update(item.get("tags", []))
    return [
        {"name": name, "count": count}
        for name, count in sorted(counts.items(), key=lambda pair: (-pair[1], pair[0].lower()))
    ]


def slugify(value: str) -> str:
    slug = "".join(char.lower() if char.isalnum() else "-" for char in value).strip("-")
    while "--" in slug:
        slug = slug.replace("--", "-")
    return slug or "collection"
