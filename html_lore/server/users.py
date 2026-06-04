from __future__ import annotations

import base64
import hashlib
import hmac
import json
import os
import re
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from .config import ServerSettings


PBKDF2_ITERATIONS = 200_000


class UserStoreError(ValueError):
    pass


@dataclass(frozen=True)
class AuthenticatedUser:
    username: str
    data_id: str
    role: str = "user"


class UserStore:
    def __init__(self, settings: ServerSettings) -> None:
        self.settings = settings
        self.path = settings.users_file

    def authenticate(self, username: str, password: str) -> AuthenticatedUser | None:
        record = self.find_user(username)
        if not record or not bool(record.get("enabled", True)):
            return None
        password_hash = str(record.get("password_hash") or "")
        if not verify_password(password, password_hash):
            return None
        self._update_last_login(str(record["username"]))
        return user_from_record(record)

    def find_user(self, username: str) -> dict[str, Any] | None:
        username_key = username.casefold()
        for record in self._read().get("users", []):
            if not isinstance(record, dict):
                continue
            if str(record.get("username") or "").casefold() == username_key:
                return record
        return None

    def canonical_username(self, username: str) -> str:
        record = self.find_user(username)
        return str(record.get("username") or "") if record else ""

    def add_user(
        self,
        *,
        username: str,
        password: str,
        role: str = "user",
        data_id: str = "",
        enabled: bool = True,
        replace_existing: bool = False,
    ) -> dict[str, Any]:
        cleaned_username = username.strip()
        if not cleaned_username:
            raise UserStoreError("Username is required.")
        if not password:
            raise UserStoreError("Password is required.")
        data = self._read()
        users = data.setdefault("users", [])
        now = utc_now()
        existing_index = next(
            (
                index
                for index, record in enumerate(users)
                if isinstance(record, dict) and str(record.get("username") or "").casefold() == cleaned_username.casefold()
            ),
            None,
        )
        if existing_index is not None and not replace_existing:
            raise UserStoreError("User already exists.")
        existing = users[existing_index] if existing_index is not None and isinstance(users[existing_index], dict) else {}
        record = {
            **existing,
            "username": cleaned_username,
            "password_hash": hash_password(password),
            "role": role.strip() or "user",
            "enabled": enabled,
            "data_id": safe_data_id(data_id or str(existing.get("data_id") or data_id_for_username(cleaned_username))),
            "updated_at": now,
        }
        record.setdefault("created_at", now)
        if existing_index is None:
            users.append(record)
        else:
            users[existing_index] = record
        self._write(data)
        return public_user_record(record)

    def ensure_bootstrap_admin(self) -> None:
        if self.path is None:
            return
        data = self._read()
        if data.get("users"):
            return
        if not self.settings.auth_username or not self.settings.auth_password:
            return
        now = utc_now()
        user = {
            "username": self.settings.auth_username,
            "password_hash": hash_password(self.settings.auth_password),
            "role": "admin",
            "enabled": True,
            "data_id": "default",
            "created_at": now,
            "updated_at": now,
        }
        self._write({"version": 1, "users": [user]})

    def _update_last_login(self, username: str) -> None:
        if self.path is None:
            return
        data = self._read()
        changed = False
        now = utc_now()
        for record in data.get("users", []):
            if not isinstance(record, dict):
                continue
            if str(record.get("username") or "").casefold() == username.casefold():
                record["last_login_at"] = now
                changed = True
                break
        if changed:
            self._write(data)

    def _read(self) -> dict[str, Any]:
        if self.path is None:
            return {"version": 1, "users": []}
        if not self.path.exists():
            return {"version": 1, "users": []}
        try:
            data = json.loads(self.path.read_text(encoding="utf-8"))
        except json.JSONDecodeError as exc:
            raise UserStoreError("User store is not valid JSON.") from exc
        if not isinstance(data, dict):
            raise UserStoreError("User store must be a JSON object.")
        users = data.get("users", [])
        if not isinstance(users, list):
            raise UserStoreError("User store users must be a list.")
        return {"version": int(data.get("version") or 1), "users": users}

    def _write(self, data: dict[str, Any]) -> None:
        if self.path is None:
            return
        self.path.parent.mkdir(parents=True, exist_ok=True)
        self.path.write_text(json.dumps(data, ensure_ascii=False, indent=2, sort_keys=True) + "\n", encoding="utf-8")


def user_from_record(record: dict[str, Any]) -> AuthenticatedUser:
    username = str(record.get("username") or "").strip()
    return AuthenticatedUser(
        username=username,
        data_id=safe_data_id(str(record.get("data_id") or data_id_for_username(username))),
        role=str(record.get("role") or "user"),
    )


def public_user_record(record: dict[str, Any]) -> dict[str, Any]:
    return {
        "username": str(record.get("username") or ""),
        "role": str(record.get("role") or "user"),
        "enabled": bool(record.get("enabled", True)),
        "data_id": safe_data_id(str(record.get("data_id") or "")),
    }


def hash_password(password: str) -> str:
    salt = os.urandom(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, PBKDF2_ITERATIONS)
    return "pbkdf2_sha256${iterations}${salt}${digest}".format(
        iterations=PBKDF2_ITERATIONS,
        salt=base64.urlsafe_b64encode(salt).decode("ascii").rstrip("="),
        digest=base64.urlsafe_b64encode(digest).decode("ascii").rstrip("="),
    )


def verify_password(password: str, stored: str) -> bool:
    if not stored.startswith("pbkdf2_sha256$"):
        return False
    try:
        _, iterations_value, salt_value, digest_value = stored.split("$", 3)
        iterations = int(iterations_value)
        salt = base64.urlsafe_b64decode(pad_base64(salt_value))
        expected = base64.urlsafe_b64decode(pad_base64(digest_value))
    except (ValueError, TypeError):
        return False
    actual = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, iterations)
    return hmac.compare_digest(actual, expected)


def pad_base64(value: str) -> bytes:
    return (value + "=" * (-len(value) % 4)).encode("ascii")


def data_id_for_username(username: str) -> str:
    return safe_data_id(username.casefold())


def safe_data_id(value: str) -> str:
    normalized = re.sub(r"[^a-z0-9._-]+", "-", value.casefold()).strip("-._")
    return normalized or "user"


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()
