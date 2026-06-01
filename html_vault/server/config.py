from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class ServerSettings:
    content_dir: Path
    meta_dir: Path | None
    public_dir: Path
    site_title: str


def load_settings() -> ServerSettings:
    content_dir = Path(os.getenv("HTML_VAULT_CONTENT", "content"))
    meta_value = os.getenv("HTML_VAULT_META", "meta")
    meta_dir = Path(meta_value) if meta_value else None
    public_dir = Path(os.getenv("HTML_VAULT_PUBLIC", "public"))
    site_title = os.getenv("HTML_VAULT_TITLE", "HTML Vault")
    return ServerSettings(
        content_dir=content_dir,
        meta_dir=meta_dir,
        public_dir=public_dir,
        site_title=site_title,
    )

