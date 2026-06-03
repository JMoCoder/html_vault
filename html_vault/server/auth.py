from __future__ import annotations

import base64
import hashlib
import hmac
import json
import time
from typing import Any

try:
    from fastapi import HTTPException, Request, Response
except ModuleNotFoundError as exc:  # pragma: no cover - import guard for static-only installs
    raise RuntimeError(
        "The backend server requires the agent extra: pip install 'html-vault[agent]'",
    ) from exc

from .config import ServerSettings


def session_status(settings: ServerSettings, request: Request) -> dict[str, Any]:
    if not settings.auth_enabled:
        return {"enabled": False, "authenticated": True, "user": None}
    username = read_session(settings, request)
    return {"enabled": True, "authenticated": bool(username), "user": username or None}


def login(settings: ServerSettings, response: Response, username: str, password: str) -> dict[str, Any]:
    if not settings.auth_enabled:
        return {"enabled": False, "authenticated": True, "user": None}
    if not username_matches(username, settings.auth_username) or not constant_time_equal(password, settings.auth_password):
        raise HTTPException(status_code=401, detail="Invalid username or password.")
    token = make_session_token(settings, settings.auth_username)
    response.set_cookie(
        settings.session_cookie_name,
        token,
        max_age=settings.session_max_age_seconds,
        httponly=True,
        secure=settings.session_secure,
        samesite="lax",
        path="/",
    )
    return {"enabled": True, "authenticated": True, "user": settings.auth_username}


def logout(settings: ServerSettings, response: Response) -> dict[str, Any]:
    response.delete_cookie(settings.session_cookie_name, path="/", samesite="lax")
    return {"enabled": settings.auth_enabled, "authenticated": False, "user": None}


def read_session(settings: ServerSettings, request: Request) -> str:
    token = request.cookies.get(settings.session_cookie_name, "")
    if not token:
        return ""
    return verify_session_token(settings, token)


def require_session(settings: ServerSettings, request: Request) -> None:
    if not settings.auth_enabled:
        return
    if read_session(settings, request):
        return
    raise HTTPException(status_code=401, detail="Login required.")


def make_session_token(settings: ServerSettings, username: str) -> str:
    expires_at = int(time.time()) + settings.session_max_age_seconds
    payload = encode_json({"sub": username, "exp": expires_at})
    signature = sign(settings, payload)
    return f"{payload}.{signature}"


def verify_session_token(settings: ServerSettings, token: str) -> str:
    payload, separator, signature = token.partition(".")
    if not separator or not payload or not signature:
        return ""
    expected = sign(settings, payload)
    if not constant_time_equal(signature, expected):
        return ""
    try:
        data = json.loads(base64.urlsafe_b64decode(pad_base64(payload)).decode("utf-8"))
    except (ValueError, json.JSONDecodeError):
        return ""
    username = str(data.get("sub", ""))
    expires_at = int(data.get("exp", 0))
    if expires_at < int(time.time()):
        return ""
    if not username_matches(username, settings.auth_username):
        return ""
    return settings.auth_username


def sign(settings: ServerSettings, payload: str) -> str:
    digest = hmac.new(settings.session_secret.encode("utf-8"), payload.encode("utf-8"), hashlib.sha256).digest()
    return base64.urlsafe_b64encode(digest).decode("ascii").rstrip("=")


def encode_json(value: dict[str, Any]) -> str:
    raw = json.dumps(value, separators=(",", ":"), ensure_ascii=True).encode("utf-8")
    return base64.urlsafe_b64encode(raw).decode("ascii").rstrip("=")


def pad_base64(value: str) -> bytes:
    return (value + "=" * (-len(value) % 4)).encode("ascii")


def constant_time_equal(left: str, right: str) -> bool:
    return hmac.compare_digest(left.encode("utf-8"), right.encode("utf-8"))


def username_matches(input_username: str, configured_username: str) -> bool:
    return constant_time_equal(input_username.casefold(), configured_username.casefold())
