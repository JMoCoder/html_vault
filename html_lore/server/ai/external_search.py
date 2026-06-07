from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Any, Protocol
from urllib.parse import urlparse

from html_lore.server.config import ServerSettings


class ExternalSearchError(RuntimeError):
    pass


class ExternalSearchUnavailable(ExternalSearchError):
    pass


@dataclass(frozen=True)
class ExternalSearchResult:
    title: str
    url: str
    snippet: str
    accessed_at: str

    def as_dict(self) -> dict[str, Any]:
        return {
            "kind": "external",
            "title": self.title,
            "url": self.url,
            "snippet": self.snippet,
            "accessed_at": self.accessed_at,
        }


class ExternalSearchAdapter(Protocol):
    name: str

    @property
    def available(self) -> bool:
        pass

    def search(self, query: str, *, max_results: int = 5) -> list[ExternalSearchResult]:
        pass


class DisabledExternalSearchAdapter:
    name = "disabled"

    @property
    def available(self) -> bool:
        return False

    def search(self, query: str, *, max_results: int = 5) -> list[ExternalSearchResult]:
        raise ExternalSearchUnavailable("External content expansion is not configured.")


class FakeExternalSearchAdapter:
    name = "fake"

    @property
    def available(self) -> bool:
        return True

    def search(self, query: str, *, max_results: int = 5) -> list[ExternalSearchResult]:
        cleaned = " ".join(str(query or "").split()) or "HTMlore"
        return [
            ExternalSearchResult(
                title=f"External reference for {cleaned[:48]}",
                url=f"https://example.test/search?q={cleaned.replace(' ', '+')}",
                snippet=f"Fake external source related to: {cleaned[:160]}",
                accessed_at=utc_now(),
            ),
        ][:max_results]


def build_external_search_adapter(settings: ServerSettings) -> ExternalSearchAdapter:
    provider = settings.ai_external_search.strip().lower()
    if provider == "fake":
        return FakeExternalSearchAdapter()
    return DisabledExternalSearchAdapter()


def sanitize_external_results(results: list[ExternalSearchResult]) -> tuple[list[dict[str, Any]], int]:
    safe: list[dict[str, Any]] = []
    dropped = 0
    for result in results:
        data = result.as_dict()
        if is_safe_external_url(data.get("url")):
            safe.append(data)
        else:
            dropped += 1
    return safe, dropped


def is_safe_external_url(value: Any) -> bool:
    parsed = urlparse(str(value or "").strip())
    if parsed.scheme not in {"http", "https"}:
        return False
    host = (parsed.hostname or "").lower()
    if not host:
        return False
    if host in {"localhost", "127.0.0.1", "0.0.0.0"} or host.endswith(".localhost"):
        return False
    if host.startswith("10.") or host.startswith("192.168.") or host.startswith("169.254."):
        return False
    if parsed.path.startswith(("/api/", "/content/", "/share/", "/public/")):
        return False
    return True


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()
