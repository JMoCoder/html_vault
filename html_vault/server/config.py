from __future__ import annotations

import os
from dataclasses import dataclass, replace
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
    users_file: Path | None = None
    user_data_dir: Path | None = None
    session_secret: str = ""
    session_cookie_name: str = "html_lore_session"
    session_max_age_seconds: int = 7 * 24 * 60 * 60
    session_secure: bool = False
    cors_origins: tuple[str, ...] = ("http://127.0.0.1:8080", "http://localhost:8080")

    @property
    def auth_enabled(self) -> bool:
        if not self.session_secret:
            return False
        if self.auth_username and self.auth_password:
            return True
        return bool(self.users_file and self.users_file.exists())

    def for_user(self, data_id: str) -> "ServerSettings":
        if data_id == "default" or self.user_data_dir is None:
            return self
        user_root = self.user_data_dir / data_id
        user_settings = replace(
            self,
            content_dir=user_root / "content",
            meta_dir=user_root / "meta" if self.meta_dir is not None else None,
            public_dir=user_root / "public",
        )
        ensure_user_dirs(user_settings)
        return user_settings


def load_settings() -> ServerSettings:
    content_dir = Path(get_env("CONTENT", "content"))
    meta_value = get_env("META", "meta")
    meta_dir = Path(meta_value) if meta_value else None
    public_dir = Path(get_env("PUBLIC", "public"))
    site_title = get_env("TITLE", "HTMlore")
    max_upload_bytes = int(get_env("MAX_UPLOAD_BYTES", str(10 * 1024 * 1024)))
    api_token = get_env("API_TOKEN", "").strip()
    auth_username = get_env("AUTH_USERNAME", "").strip()
    auth_password = get_env("AUTH_PASSWORD", "")
    users_file = parse_optional_path(get_env("USERS_FILE"), content_dir.parent / "users.json")
    user_data_dir = parse_optional_path(get_env("USER_DATA_DIR"), content_dir.parent / "users")
    session_secret = get_env("SESSION_SECRET", "").strip()
    session_cookie_name = get_env("SESSION_COOKIE_NAME", "html_lore_session").strip() or "html_lore_session"
    session_max_age_seconds = int(get_env("SESSION_MAX_AGE_SECONDS", str(7 * 24 * 60 * 60)))
    session_secure = parse_bool(get_env("SESSION_SECURE", "false"))
    cors_origins = parse_csv(get_env("CORS_ORIGINS", "http://127.0.0.1:8080,http://localhost:8080"))
    return ServerSettings(
        content_dir=content_dir,
        meta_dir=meta_dir,
        public_dir=public_dir,
        site_title=site_title,
        max_upload_bytes=max_upload_bytes,
        api_token=api_token,
        auth_username=auth_username,
        auth_password=auth_password,
        users_file=users_file,
        user_data_dir=user_data_dir,
        session_secret=session_secret,
        session_cookie_name=session_cookie_name,
        session_max_age_seconds=session_max_age_seconds,
        session_secure=session_secure,
        cors_origins=cors_origins,
    )


def get_env(name: str, default: str | None = None) -> str | None:
    """Read the new HTMlore env name, then fall back to the legacy name."""
    new_value = os.getenv(f"HTML_LORE_{name}")
    if new_value is not None:
        return new_value
    old_value = os.getenv(f"HTML_VAULT_{name}")
    if old_value is not None:
        return old_value
    return default


def parse_csv(value: str) -> tuple[str, ...]:
    return tuple(part.strip() for part in value.split(",") if part.strip())


def parse_bool(value: str) -> bool:
    return value.strip().lower() in {"1", "true", "yes", "on"}


def parse_optional_path(value: str | None, default: Path) -> Path | None:
    if value is None:
        return default
    cleaned = value.strip()
    return Path(cleaned) if cleaned else None


def ensure_user_dirs(settings: ServerSettings) -> None:
    settings.content_dir.mkdir(parents=True, exist_ok=True)
    if settings.meta_dir is not None:
        (settings.meta_dir / "items").mkdir(parents=True, exist_ok=True)
        (settings.meta_dir / "config").mkdir(parents=True, exist_ok=True)
    settings.public_dir.mkdir(parents=True, exist_ok=True)
    if not (settings.public_dir / "manifest.json").exists():
        from html_vault.builder import build_site

        build_site(
            content_dir=settings.content_dir,
            meta_dir=settings.meta_dir,
            output_dir=settings.public_dir,
            site_title=settings.site_title,
        )
