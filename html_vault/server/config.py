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
    max_upload_bytes: int
    api_token: str = ""
    cors_origins: tuple[str, ...] = ("http://127.0.0.1:8080", "http://localhost:8080")


def load_settings() -> ServerSettings:
    content_dir = Path(os.getenv("HTML_VAULT_CONTENT", "content"))
    meta_value = os.getenv("HTML_VAULT_META", "meta")
    meta_dir = Path(meta_value) if meta_value else None
    public_dir = Path(os.getenv("HTML_VAULT_PUBLIC", "public"))
    site_title = os.getenv("HTML_VAULT_TITLE", "HTML Vault")
    max_upload_bytes = int(os.getenv("HTML_VAULT_MAX_UPLOAD_BYTES", str(10 * 1024 * 1024)))
    api_token = os.getenv("HTML_VAULT_API_TOKEN", "").strip()
    cors_origins = parse_csv(os.getenv("HTML_VAULT_CORS_ORIGINS", "http://127.0.0.1:8080,http://localhost:8080"))
    return ServerSettings(
        content_dir=content_dir,
        meta_dir=meta_dir,
        public_dir=public_dir,
        site_title=site_title,
        max_upload_bytes=max_upload_bytes,
        api_token=api_token,
        cors_origins=cors_origins,
    )


def parse_csv(value: str) -> tuple[str, ...]:
    return tuple(part.strip() for part in value.split(",") if part.strip())
