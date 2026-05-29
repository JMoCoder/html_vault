from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Any

try:
    import yaml
except ModuleNotFoundError:  # pragma: no cover - exercised in minimal runtimes
    yaml = None


@dataclass(frozen=True)
class MetadataStore:
    items: dict[str, dict[str, Any]]

    @classmethod
    def load(cls, meta_dir: Path | None) -> "MetadataStore":
        if meta_dir is None or not meta_dir.exists():
            return cls(items={})

        items_root = meta_dir / "items"
        if not items_root.exists():
            return cls(items={})

        items: dict[str, dict[str, Any]] = {}
        for path in sorted(items_root.rglob("*.yml")):
            data = _read_yaml(path)
            item_id = str(data.get("id") or _metadata_path_to_item_id(path, items_root))
            normalized = _normalize_metadata(data)
            items[item_id] = normalized
        return cls(items=items)

    def for_item(self, item_id: str) -> dict[str, Any]:
        return dict(self.items.get(item_id, {}))


def _read_yaml(path: Path) -> dict[str, Any]:
    with path.open("r", encoding="utf-8") as file:
        text = file.read()
    data = yaml.safe_load(text) if yaml else _parse_simple_yaml(text)
    data = data or {}
    if not isinstance(data, dict):
        raise ValueError(f"Metadata file must contain a mapping: {path}")
    return data


def _parse_simple_yaml(text: str) -> dict[str, Any]:
    result: dict[str, Any] = {}
    current_key: str | None = None
    current_list: list[str] | None = None
    current_map: dict[str, Any] | None = None

    for raw_line in text.splitlines():
        if not raw_line.strip() or raw_line.lstrip().startswith("#"):
            continue

        indent = len(raw_line) - len(raw_line.lstrip(" "))
        line = raw_line.strip()

        if indent == 0:
            current_key = None
            current_list = None
            current_map = None
            if ":" not in line:
                continue
            key, value = line.split(":", 1)
            key = key.strip()
            value = value.strip()
            current_key = key
            if value == "":
                result[key] = []
                current_list = result[key]
            else:
                result[key] = _parse_scalar(value)
        elif current_key and line.startswith("- "):
            if not isinstance(result.get(current_key), list):
                result[current_key] = []
            current_list = result[current_key]
            current_list.append(_parse_scalar(line[2:].strip()))
        elif current_key and ":" in line:
            if not isinstance(result.get(current_key), dict):
                result[current_key] = {}
            current_map = result[current_key]
            key, value = line.split(":", 1)
            current_map[key.strip()] = _parse_scalar(value.strip())

    return result


def _parse_scalar(value: str) -> Any:
    if value == "":
        return None
    if value.lower() == "true":
        return True
    if value.lower() == "false":
        return False
    if value.lower() in {"null", "none", "~"}:
        return None
    if (value.startswith('"') and value.endswith('"')) or (value.startswith("'") and value.endswith("'")):
        return value[1:-1]
    return value


def _metadata_path_to_item_id(path: Path, items_root: Path) -> str:
    relative = path.relative_to(items_root).with_suffix(".html")
    return relative.as_posix()


def _normalize_metadata(data: dict[str, Any]) -> dict[str, Any]:
    normalized = dict(data)
    if "tags" in normalized:
        normalized["tags"] = _normalize_tags(normalized["tags"])
    return normalized


def _normalize_tags(value: Any) -> list[str]:
    if value is None:
        return []
    if isinstance(value, str):
        return [tag.strip() for tag in value.split(",") if tag.strip()]
    if isinstance(value, list):
        return [str(tag).strip() for tag in value if str(tag).strip()]
    return []
