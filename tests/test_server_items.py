from pathlib import Path

import pytest

try:
    from fastapi.testclient import TestClient
except ModuleNotFoundError:  # pragma: no cover - optional agent extra
    TestClient = None

from html_vault.server.config import ServerSettings
from html_vault.server.items import ItemService, normalize_query


ROOT = Path(__file__).resolve().parents[1]
SETTINGS = ServerSettings(
    content_dir=ROOT / "examples" / "content",
    meta_dir=ROOT / "examples" / "meta",
    public_dir=ROOT / "public",
    site_title="Test Vault",
    max_upload_bytes=10 * 1024 * 1024,
)


def test_item_service_lists_manifest_items() -> None:
    service = ItemService(SETTINGS)

    manifest = service.manifest()
    items = service.list_items(normalize_query())

    assert manifest["version"] == 2
    assert len(items) == 3
    assert {item["id"] for item in items} == {item["id"] for item in manifest["items"] if not item["archived"]}


def test_item_service_filters_tags_with_all_match() -> None:
    service = ItemService(SETTINGS)

    items = service.list_items(normalize_query(tags="MCP,Docker", tag_match="all"))

    assert [item["id"] for item in items] == ["generated/2026/05/mcp-docker-agent.html"]


def test_item_service_filters_archived_view() -> None:
    service = ItemService(SETTINGS)

    items = service.list_items(normalize_query(library="archived"))

    assert items == []


def test_item_service_searches_metadata() -> None:
    service = ItemService(SETTINGS)

    items = service.list_items(normalize_query(q="security"))

    assert [item["id"] for item in items] == ["generated/2026/05/mcp-security.html"]


@pytest.mark.skipif(TestClient is None, reason="fastapi is not installed")
def test_server_items_api() -> None:
    from html_vault.server.app import app, get_settings

    app.dependency_overrides[get_settings] = lambda: SETTINGS
    client = TestClient(app)
    try:
        response = client.get("/api/items", params={"tags": "MCP,Docker", "tag_match": "all"})
        assert response.status_code == 200
        data = response.json()
        assert data["count"] == 1
        assert data["items"][0]["id"] == "generated/2026/05/mcp-docker-agent.html"

        detail = client.get("/api/items/generated/2026/05/mcp-docker-agent.html")
        assert detail.status_code == 200
        assert detail.json()["collection"] == "AI"
    finally:
        app.dependency_overrides.clear()
