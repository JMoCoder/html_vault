from __future__ import annotations

from dataclasses import dataclass
from functools import cmp_to_key
from typing import Any, Iterable

from html_vault.manifest import build_manifest

from .config import ServerSettings


VALID_LIBRARY_FILTERS = {"all", "inbox", "recent", "favorites", "generated", "imported", "archived"}
VALID_SORT_MODES = {"newest", "oldest", "title-az", "title-za"}
VALID_TAG_MATCH_MODES = {"any", "all"}


@dataclass(frozen=True)
class ItemQuery:
    q: str = ""
    library: str = "all"
    collection: str = ""
    tags: tuple[str, ...] = ()
    tag_match: str = "any"
    favorite: bool | None = None
    archived: bool | None = None
    sort: str = "newest"
    limit: int | None = None


class ItemService:
    def __init__(self, settings: ServerSettings) -> None:
        self.settings = settings

    def manifest(self) -> dict[str, Any]:
        return build_manifest(
            content_dir=self.settings.content_dir,
            meta_dir=self.settings.meta_dir,
            site_title=self.settings.site_title,
        )

    def list_items(self, query: ItemQuery) -> list[dict[str, Any]]:
        items = list(self.manifest().get("items", []))
        items = apply_library_filter(items, query.library)
        items = apply_collection_filter(items, query.collection)
        items = apply_tag_filter(items, query.tags, query.tag_match)
        items = apply_boolean_filter(items, "favorite", query.favorite)
        items = apply_archive_filter(items, query.library, query.archived)
        items = apply_search_filter(items, query.q)
        items = sort_items(items, query.sort)
        if query.limit is not None:
            items = items[: query.limit]
        return items

    def get_item(self, item_id: str) -> dict[str, Any] | None:
        for item in self.manifest().get("items", []):
            if item.get("id") == item_id:
                return item
        return None


def normalize_query(
    q: str = "",
    library: str = "all",
    collection: str = "",
    tags: str | Iterable[str] = "",
    tag_match: str = "any",
    favorite: bool | None = None,
    archived: bool | None = None,
    sort: str = "newest",
    limit: int | None = None,
) -> ItemQuery:
    library_value = library if library in VALID_LIBRARY_FILTERS else "all"
    tag_match_value = tag_match if tag_match in VALID_TAG_MATCH_MODES else "any"
    sort_value = sort if sort in VALID_SORT_MODES else "newest"
    tag_values = normalize_tags(tags)
    limit_value = limit if limit is None or limit > 0 else None
    return ItemQuery(
        q=q.strip(),
        library=library_value,
        collection=collection.strip(),
        tags=tuple(tag_values),
        tag_match=tag_match_value,
        favorite=favorite,
        archived=archived,
        sort=sort_value,
        limit=limit_value,
    )


def normalize_tags(tags: str | Iterable[str]) -> list[str]:
    if isinstance(tags, str):
        values = tags.split(",")
    else:
        values = tags
    return [value.strip().lstrip("#") for value in values if value and value.strip().lstrip("#")]


def apply_library_filter(items: list[dict[str, Any]], library: str) -> list[dict[str, Any]]:
    if library == "all" or library == "recent":
        return items
    if library == "inbox":
        return [item for item in items if (item.get("collection") or "Inbox") == "Inbox"]
    if library == "favorites":
        return [item for item in items if bool(item.get("favorite"))]
    if library == "generated":
        return [
            item for item in items
            if bool((item.get("agent") or {}).get("generated")) or item.get("source_type") == "topic"
        ]
    if library == "imported":
        return [item for item in items if item.get("source_type") in {"imported", "html"}]
    if library == "archived":
        return [item for item in items if bool(item.get("archived"))]
    return items


def apply_collection_filter(items: list[dict[str, Any]], collection: str) -> list[dict[str, Any]]:
    if not collection:
        return items
    return [item for item in items if item.get("collection") == collection]


def apply_tag_filter(items: list[dict[str, Any]], tags: tuple[str, ...], tag_match: str) -> list[dict[str, Any]]:
    if not tags:
        return items
    selected = set(tags)
    if tag_match == "all":
        return [item for item in items if selected.issubset(set(item.get("tags") or []))]
    return [item for item in items if selected.intersection(set(item.get("tags") or []))]


def apply_boolean_filter(
    items: list[dict[str, Any]],
    field: str,
    value: bool | None,
) -> list[dict[str, Any]]:
    if value is None:
        return items
    return [item for item in items if bool(item.get(field)) is value]


def apply_archive_filter(
    items: list[dict[str, Any]],
    library: str,
    archived: bool | None,
) -> list[dict[str, Any]]:
    if archived is not None:
        return [item for item in items if bool(item.get("archived")) is archived]
    if library == "archived":
        return items
    return [item for item in items if not bool(item.get("archived"))]


def apply_search_filter(items: list[dict[str, Any]], query: str) -> list[dict[str, Any]]:
    if not query:
        return items
    needle = query.lower()
    return [item for item in items if needle in searchable_text(item)]


def searchable_text(item: dict[str, Any]) -> str:
    return " ".join(
        str(value)
        for value in [
            item.get("title"),
            item.get("summary"),
            item.get("path"),
            item.get("collection"),
            item.get("source_type"),
            *(item.get("tags") or []),
        ]
        if value
    ).lower()


def sort_items(items: list[dict[str, Any]], sort: str) -> list[dict[str, Any]]:
    def compare(a: dict[str, Any], b: dict[str, Any]) -> int:
        title_order = compare_text(a.get("title"), b.get("title"))
        newest_order = compare_text(b.get("updated"), a.get("updated"))
        oldest_order = compare_text(a.get("updated"), b.get("updated"))
        title_desc_order = compare_text(b.get("title"), a.get("title"))

        if sort == "oldest":
            return oldest_order or title_order
        if sort == "title-az":
            return title_order or newest_order
        if sort == "title-za":
            return title_desc_order or newest_order
        return newest_order or title_order

    return sorted(items, key=cmp_to_key(compare))


def compare_text(left: Any, right: Any) -> int:
    left_value = str(left or "").lower()
    right_value = str(right or "").lower()
    if left_value < right_value:
        return -1
    if left_value > right_value:
        return 1
    return 0
