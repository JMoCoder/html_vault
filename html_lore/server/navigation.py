from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from .config import ServerSettings
from .items import ensure_within


DEFAULT_NAV_CONFIG: dict[str, dict[str, dict[str, bool]]] = {
    "library": {},
    "collections": {},
    "tags": {},
}


class NavigationConfigError(ValueError):
    pass


class NavigationConfigService:
    def __init__(self, settings: ServerSettings) -> None:
        self.settings = settings

    def get_config(self) -> dict[str, dict[str, dict[str, bool]]]:
        path = self.config_path()
        if not path.exists():
            return clone_default_config()
        with path.open("r", encoding="utf-8") as file:
            data = json.load(file)
        if not isinstance(data, dict):
            raise NavigationConfigError("Navigation config must be an object.")
        return normalize_nav_config(data)

    def update_config(self, values: dict[str, Any]) -> dict[str, dict[str, dict[str, bool]]]:
        config = normalize_nav_config(values)
        path = self.config_path()
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(json.dumps(config, ensure_ascii=False, indent=2, sort_keys=True) + "\n", encoding="utf-8")
        return config

    def config_path(self) -> Path:
        if self.settings.meta_dir is None:
            raise NavigationConfigError("Metadata directory is not configured.")
        path = self.settings.meta_dir / "config" / "navigation.json"
        ensure_within(path, self.settings.meta_dir)
        return path


def normalize_nav_config(values: dict[str, Any]) -> dict[str, dict[str, dict[str, bool]]]:
    config = clone_default_config()
    for section in ("library", "collections", "tags"):
        raw_section = values.get(section) or {}
        if not isinstance(raw_section, dict):
            raise NavigationConfigError(f"{section} must be an object.")
        for name, raw_item in raw_section.items():
            if not str(name).strip():
                continue
            if not isinstance(raw_item, dict):
                raise NavigationConfigError(f"{section}.{name} must be an object.")
            visible = raw_item.get("visible", True)
            if not isinstance(visible, bool):
                raise NavigationConfigError(f"{section}.{name}.visible must be a boolean.")
            config[section][str(name)] = {"visible": visible}
    return config


def clone_default_config() -> dict[str, dict[str, dict[str, bool]]]:
    return {section: dict(values) for section, values in DEFAULT_NAV_CONFIG.items()}
