from __future__ import annotations

import hashlib
import html
import json
import re
import secrets
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from html.parser import HTMLParser
from pathlib import Path
from typing import Any
from urllib.parse import urlsplit

from .config import ServerSettings
from .items import ItemContentError, ItemService, ensure_within


SHARE_DURATIONS = {
    "1h": timedelta(hours=1),
    "1d": timedelta(days=1),
    "7d": timedelta(days=7),
    "30d": timedelta(days=30),
    "forever": None,
}

DANGEROUS_TAGS = {"iframe", "object", "embed", "form", "input", "button", "textarea", "select", "base"}
SANITIZER_BLOCK_TAGS = DANGEROUS_TAGS | {"script", "style", "meta", "link"}
SANITIZER_SKIP_CONTENT_TAGS = {"script", "style", "iframe", "object", "embed", "form", "textarea", "select", "button"}
DANGEROUS_EXTENSIONS = {".exe", ".dmg", ".apk", ".msi", ".bat", ".cmd", ".sh", ".ps1", ".scr", ".jar"}
SAFE_TOGGLE_HANDLER = re.compile(r"^toggleGroup\(\s*['\"]([A-Za-z][A-Za-z0-9_-]{0,63})['\"]\s*\)\s*;?\s*$")
SECRET_PATTERNS = [
    re.compile(r"-----BEGIN [A-Z ]*PRIVATE KEY-----"),
    re.compile(r"\b[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\b"),
    re.compile(r"\b(?:api[_-]?key|secret|token|password|passwd|pwd)\b\s*[:=]\s*['\"]?[^'\"\s<]{8,}", re.I),
    re.compile(r"\b(?:sk|pk|rk|ghp|github_pat|xox[baprs])-[-A-Za-z0-9_]{16,}\b", re.I),
    re.compile(r"\b(?:AKIA|ASIA)[A-Z0-9]{16}\b"),
    re.compile(r"\b(?:mongodb|postgres|postgresql|mysql|redis)://[^\s<]+", re.I),
]
LOCAL_PATTERNS = [
    re.compile(r"\b(?:10|127|172\.(?:1[6-9]|2\d|3[0-1])|192\.168)\.\d{1,3}\.\d{1,3}\b"),
    re.compile(r"\bfile://[^\s<]+", re.I),
    re.compile(r"(?:^|[\s\"'>])(?:/[A-Za-z0-9_.-]+){2,}"),
    re.compile(r"[A-Za-z]:\\(?:[^\\/:*?\"<>|\r\n]+\\?)+"),
]


@dataclass(frozen=True)
class ShareCreateResult:
    share: dict[str, Any]
    token: str
    url_path: str


class ShareService:
    def __init__(self, settings: ServerSettings, root_settings: ServerSettings | None = None) -> None:
        self.settings = settings
        self.root_settings = root_settings or settings
        self.item_service = ItemService(settings)

    def list_shares(self) -> list[dict[str, Any]]:
        return [public_share(record) for record in self._read_store().get("shares", []) if not record.get("deleted")]

    def create_share(self, item_id: str, duration: str) -> ShareCreateResult:
        if duration not in SHARE_DURATIONS:
            raise ShareError("Invalid share duration.")
        item = self.item_service.get_item(item_id)
        if not item:
            raise ShareError("Item not found.")
        if bool(item.get("archived")):
            raise ShareError("Archived items cannot be shared.")
        try:
            content = self.item_service.read_item_content(item_id)
        except ItemContentError as exc:
            raise ShareError(str(exc)) from exc

        scan = scan_share_content(content)
        if not scan["shareable"]:
            raise ShareSafetyError(scan)

        token = secrets.token_urlsafe(32)
        token_hash = hash_token(token)
        now = utc_now()
        data = self._read_store()
        existing = active_share_for_item(data, item_id)
        if existing:
            existing["revoked"] = True
            existing["updated_at"] = now

        record = {
            "id": f"share_{secrets.token_urlsafe(10)}",
            "token_hash": token_hash,
            "item_id": item_id,
            "duration": duration,
            "created_at": now,
            "updated_at": now,
            "expires_at": expires_at_for(duration, now),
            "revoked": False,
            "access_count": 0,
            "last_accessed_at": "",
            "safety": scan,
        }
        data.setdefault("shares", []).append(record)
        self._write_store(data)
        self._index_token(token_hash)
        return ShareCreateResult(share=public_share(record), token=token, url_path=f"/share/{token}")

    def update_share(self, share_id: str, values: dict[str, Any]) -> dict[str, Any]:
        data = self._read_store()
        record = find_share(data, share_id)
        if not record:
            raise ShareError("Share not found.")
        if "duration" in values:
            duration = str(values.get("duration") or "")
            if duration not in SHARE_DURATIONS:
                raise ShareError("Invalid share duration.")
            record["duration"] = duration
            record["expires_at"] = expires_at_for(duration, utc_now())
        if "revoked" in values:
            if not isinstance(values["revoked"], bool):
                raise ShareError("revoked must be a boolean.")
            record["revoked"] = values["revoked"]
        record["updated_at"] = utc_now()
        self._write_store(data)
        return public_share(record)

    def revoke_share(self, share_id: str) -> dict[str, Any]:
        return self.update_share(share_id, {"revoked": True})

    def active_share_for_item(self, item_id: str) -> dict[str, Any] | None:
        return active_share_for_item(self._read_store(), item_id)

    def public_read_by_token(self, token: str) -> dict[str, Any]:
        token_hash = hash_token(token)
        record = self._find_by_token_hash(token_hash)
        if not record or not is_share_active(record):
            raise ShareError("Share not found.")
        item = self.item_service.get_item(str(record.get("item_id") or ""))
        if not item:
            raise ShareError("Share not found.")
        if bool(item.get("archived")):
            raise ShareError("Share not found.")
        content = self.item_service.read_item_content(str(record["item_id"]))
        scan = scan_share_content(content)
        if not scan["shareable"]:
            record["revoked"] = True
            record["updated_at"] = utc_now()
            record["safety"] = scan
            self._update_record(record)
            raise ShareError("Share not found.")
        rendered = sanitize_shared_html(content)
        record["access_count"] = int(record.get("access_count") or 0) + 1
        record["last_accessed_at"] = utc_now()
        self._update_record(record)
        return {
            "share": public_share(record),
            "item": {
                "id": item.get("id"),
                "title": item.get("title") or "Untitled",
                "summary": item.get("summary") or "",
                "collection": item.get("collection") or "",
                "tags": item.get("tags") or [],
                "updated": item.get("updated") or "",
            },
            "html": rendered,
        }

    def _find_by_token_hash(self, token_hash: str) -> dict[str, Any] | None:
        for record in self._read_store().get("shares", []):
            if secrets.compare_digest(str(record.get("token_hash") or ""), token_hash):
                return record
        return None

    def _update_record(self, record: dict[str, Any]) -> None:
        data = self._read_store()
        existing = find_share(data, str(record.get("id") or ""))
        if existing:
            existing.update(record)
            self._write_store(data)

    def _read_store(self) -> dict[str, Any]:
        path = share_store_path(self.settings)
        if not path.exists():
            return {"version": 1, "shares": []}
        try:
            data = json.loads(path.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            return {"version": 1, "shares": []}
        if not isinstance(data, dict):
            return {"version": 1, "shares": []}
        data.setdefault("version", 1)
        data.setdefault("shares", [])
        return data

    def _write_store(self, data: dict[str, Any]) -> None:
        path = share_store_path(self.settings)
        ensure_within(path, self.settings.meta_dir or self.settings.public_dir)
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")

    def _index_token(self, token_hash: str) -> None:
        root = share_index_path(self.root_settings)
        root.parent.mkdir(parents=True, exist_ok=True)
        try:
            data = json.loads(root.read_text(encoding="utf-8")) if root.exists() else {"version": 1, "tokens": {}}
        except json.JSONDecodeError:
            data = {"version": 1, "tokens": {}}
        data.setdefault("tokens", {})[token_hash] = data_id_for_settings(self.root_settings, self.settings)
        root.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")


class ShareError(ValueError):
    pass


class ShareSafetyError(ShareError):
    def __init__(self, scan: dict[str, Any]) -> None:
        super().__init__("Item failed share safety checks.")
        self.scan = scan


def public_share(record: dict[str, Any]) -> dict[str, Any]:
    return {
        "id": record.get("id"),
        "item_id": record.get("item_id"),
        "duration": record.get("duration"),
        "created_at": record.get("created_at"),
        "updated_at": record.get("updated_at"),
        "expires_at": record.get("expires_at"),
        "revoked": bool(record.get("revoked")),
        "active": is_share_active(record),
        "access_count": int(record.get("access_count") or 0),
        "last_accessed_at": record.get("last_accessed_at") or "",
        "safety": record.get("safety") or {"shareable": True, "reasons": []},
    }


def find_share(data: dict[str, Any], share_id: str) -> dict[str, Any] | None:
    for record in data.get("shares", []):
        if record.get("id") == share_id:
            return record
    return None


def active_share_for_item(data: dict[str, Any], item_id: str) -> dict[str, Any] | None:
    for record in data.get("shares", []):
        if record.get("item_id") == item_id and is_share_active(record):
            return record
    return None


def share_store_path(settings: ServerSettings) -> Path:
    base = settings.meta_dir or settings.public_dir
    return base / "config" / "shares.json"


def share_index_path(settings: ServerSettings) -> Path:
    base = settings.meta_dir or settings.public_dir
    return base / "config" / "share-index.json"


def data_id_for_settings(root: ServerSettings, settings: ServerSettings) -> str:
    if root.user_data_dir:
        try:
            relative = settings.content_dir.relative_to(root.user_data_dir)
            return relative.parts[0] if relative.parts else "default"
        except ValueError:
            return "default"
    return "default"


def settings_for_share_token(root: ServerSettings, token: str) -> ServerSettings:
    token_hash = hash_token(token)
    index_path = share_index_path(root)
    if index_path.exists():
        try:
            data = json.loads(index_path.read_text(encoding="utf-8"))
            data_id = data.get("tokens", {}).get(token_hash)
            if data_id:
                return root.for_user(str(data_id))
        except json.JSONDecodeError:
            pass
    return root


def hash_token(token: str) -> str:
    return hashlib.sha256(token.encode("utf-8")).hexdigest()


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()


def parse_datetime(value: str) -> datetime | None:
    if not value:
        return None
    try:
        return datetime.fromisoformat(value)
    except ValueError:
        return None


def expires_at_for(duration: str, now_value: str) -> str:
    delta = SHARE_DURATIONS[duration]
    if delta is None:
        return ""
    now = parse_datetime(now_value) or datetime.now(timezone.utc)
    return (now + delta).isoformat()


def is_share_active(record: dict[str, Any]) -> bool:
    if bool(record.get("revoked")):
        return False
    expires_at = parse_datetime(str(record.get("expires_at") or ""))
    if not expires_at:
        return True
    return expires_at >= datetime.now(timezone.utc)


def scan_share_content(content: str) -> dict[str, Any]:
    scanner = SafetyScanner()
    scanner.feed(content)
    reasons = list(scanner.reasons)
    if scanner.saw_script and not scanner.only_safe_toggle_script():
        reasons.append("blocked-tag:script")
    text = html.unescape(strip_tags(content))
    for pattern in SECRET_PATTERNS:
        if pattern.search(text):
            reasons.append("sensitive-secret")
            break
    for pattern in LOCAL_PATTERNS:
        if pattern.search(text):
            reasons.append("private-local-reference")
            break
    return {"shareable": not reasons, "reasons": sorted(set(reasons))}


class SafetyScanner(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.reasons: list[str] = []
        self.saw_script = False
        self.script_stack = 0
        self.script_parts: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        name = tag.lower()
        if name == "script":
            self.saw_script = True
            self.script_stack += 1
            return
        if name in DANGEROUS_TAGS:
            self.reasons.append(f"blocked-tag:{name}")
        if name == "meta" and is_meta_refresh(attrs):
            self.reasons.append("meta-refresh")
        for attr_name, attr_value in attrs:
            attr = attr_name.lower()
            value = (attr_value or "").strip()
            if attr.startswith("on") and not (attr == "onclick" and safe_toggle_target(value)):
                self.reasons.append("inline-event-handler")
            if attr in {"href", "src", "action", "formaction"}:
                reason = unsafe_url_reason(value)
                if reason and reason != "external-link":
                    self.reasons.append(reason)

    def handle_endtag(self, tag: str) -> None:
        if tag.lower() == "script" and self.script_stack > 0:
            self.script_stack -= 1

    def handle_data(self, data: str) -> None:
        if self.script_stack > 0:
            self.script_parts.append(data)

    def only_safe_toggle_script(self) -> bool:
        return is_safe_toggle_script("\n".join(self.script_parts))


def unsafe_url_reason(value: str) -> str:
    if not value:
        return ""
    lowered = value.strip().lower()
    if lowered.startswith(("javascript:", "vbscript:", "data:text/html")):
        return "dangerous-url"
    parsed = urlsplit(value)
    if parsed.scheme in {"http", "https"} and parsed.netloc:
        return "external-link"
    suffix = Path(parsed.path).suffix.lower()
    if suffix in DANGEROUS_EXTENSIONS:
        return "dangerous-download"
    return ""


def is_meta_refresh(attrs: list[tuple[str, str | None]]) -> bool:
    values = {name.lower(): (value or "").strip().lower() for name, value in attrs}
    return values.get("http-equiv") == "refresh"


def safe_toggle_target(value: str) -> str:
    match = SAFE_TOGGLE_HANDLER.fullmatch(value.strip())
    return match.group(1) if match else ""


def is_safe_toggle_script(value: str) -> bool:
    compact = re.sub(r"\s+", "", value)
    return bool(
        re.fullmatch(
            r"functiontoggleGroup\(id\)\{constel=document\.getElementById\(id\);el\.classList\.toggle\('open'\);\}"
            r"(//Openfirstgroupbydefault\(alreadysetviaclass\))?"
            r"(//Addkeyboardshortcut:press'\?'toexpandall)?"
            r"document\.addEventListener\('keydown',e=>\{"
            r"if\(e\.key==='\?'\)\{document\.querySelectorAll\('\.qgroup'\)\.forEach\(g=>g\.classList\.add\('open'\)\);\}"
            r"if\(e\.key==='/'\)\{document\.querySelectorAll\('\.qgroup'\)\.forEach\(g=>g\.classList\.remove\('open'\)\);document\.getElementById\('g1'\)\.classList\.add\('open'\);\}"
            r"\}\);",
            compact,
        ),
    )


def sanitize_shared_html(content: str) -> str:
    sanitizer = ShareSanitizer()
    sanitizer.feed(content)
    return sanitizer.output()


class ShareSanitizer(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.parts: list[str] = []
        self.skip_stack: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        name = tag.lower()
        if name in SANITIZER_BLOCK_TAGS or (name == "meta" and is_meta_refresh(attrs)):
            if name in SANITIZER_SKIP_CONTENT_TAGS:
                self.skip_stack.append(name)
            return
        if self.skip_stack:
            return
        clean_attrs: list[str] = []
        for attr_name, attr_value in attrs:
            attr = attr_name.lower()
            value = attr_value or ""
            if attr == "onclick":
                target = safe_toggle_target(value)
                if target:
                    clean_attrs.append(f'data-share-toggle="{html.escape(target, quote=True)}"')
                continue
            if attr.startswith("on"):
                continue
            if name == "a" and attr == "href":
                continue
            if attr in {"href", "src", "action", "formaction"}:
                if unsafe_url_reason(value):
                    continue
            clean_attrs.append(f'{html.escape(attr, quote=True)}="{html.escape(value, quote=True)}"')
        attr_text = f" {' '.join(clean_attrs)}" if clean_attrs else ""
        self.parts.append(f"<{html.escape(name)}{attr_text}>")

    def handle_endtag(self, tag: str) -> None:
        name = tag.lower()
        if self.skip_stack:
            if self.skip_stack[-1] == name:
                self.skip_stack.pop()
            return
        if name not in DANGEROUS_TAGS:
            self.parts.append(f"</{html.escape(name)}>")

    def handle_data(self, data: str) -> None:
        if not self.skip_stack:
            self.parts.append(html.escape(data))

    def handle_entityref(self, name: str) -> None:
        if not self.skip_stack:
            self.parts.append(f"&{name};")

    def handle_charref(self, name: str) -> None:
        if not self.skip_stack:
            self.parts.append(f"&#{name};")

    def output(self) -> str:
        return "".join(self.parts)


def strip_tags(content: str) -> str:
    stripper = TextStripper()
    stripper.feed(content)
    return " ".join(stripper.parts)


class TextStripper(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.parts: list[str] = []

    def handle_data(self, data: str) -> None:
        self.parts.append(data)
