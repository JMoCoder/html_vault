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
    auth_username: str = ""
    auth_password: str = ""
    session_secret: str = ""
    session_cookie_name: str = "html_vault_session"
    session_max_age_seconds: int = 7 * 24 * 60 * 60
    session_secure: bool = False
    cors_origins: tuple[str, ...] = ("http://127.0.0.1:8080", "http://localhost:8080")

    @property
    def auth_enabled(self) -> bool:
        return bool(self.auth_username and self.auth_password and self.session_secret)


def load_settings() -> ServerSettings:
    content_dir = Path(os.getenv("HTML_VAULT_CONTENT", "content"))
    meta_value = os.getenv("HTML_VAULT_META", "meta")
    meta_dir = Path(meta_value) if meta_value else None
    public_dir = Path(os.getenv("HTML_VAULT_PUBLIC", "public"))
    site_title = os.getenv("HTML_VAULT_TITLE", "HTML Vault")
    max_upload_bytes = int(os.getenv("HTML_VAULT_MAX_UPLOAD_BYTES", str(10 * 1024 * 1024)))
    api_token = os.getenv("HTML_VAULT_API_TOKEN", "").strip()
    auth_username = os.getenv("HTML_VAULT_AUTH_USERNAME", "").strip()
    auth_password = os.getenv("HTML_VAULT_AUTH_PASSWORD", "")
    session_secret = os.getenv("HTML_VAULT_SESSION_SECRET", "").strip()
    session_cookie_name = os.getenv("HTML_VAULT_SESSION_COOKIE_NAME", "html_vault_session").strip() or "html_vault_session"
    session_max_age_seconds = int(os.getenv("HTML_VAULT_SESSION_MAX_AGE_SECONDS", str(7 * 24 * 60 * 60)))
    session_secure = parse_bool(os.getenv("HTML_VAULT_SESSION_SECURE", "false"))
    cors_origins = parse_csv(os.getenv("HTML_VAULT_CORS_ORIGINS", "http://127.0.0.1:8080,http://localhost:8080"))
    return ServerSettings(
        content_dir=content_dir,
        meta_dir=meta_dir,
        public_dir=public_dir,
        site_title=site_title,
        max_upload_bytes=max_upload_bytes,
        api_token=api_token,
        auth_username=auth_username,
        auth_password=auth_password,
        session_secret=session_secret,
        session_cookie_name=session_cookie_name,
        session_max_age_seconds=session_max_age_seconds,
        session_secure=session_secure,
        cors_origins=cors_origins,
    )


def parse_csv(value: str) -> tuple[str, ...]:
    return tuple(part.strip() for part in value.split(",") if part.strip())


def parse_bool(value: str) -> bool:
    return value.strip().lower() in {"1", "true", "yes", "on"}
