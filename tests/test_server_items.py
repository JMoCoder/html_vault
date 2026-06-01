from pathlib import Path
import json
import shutil

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


def test_item_service_deletes_archived_item_and_rebuilds(tmp_path: Path) -> None:
    content_dir = tmp_path / "content"
    meta_dir = tmp_path / "meta"
    public_dir = tmp_path / "public"
    shutil.copytree(ROOT / "examples" / "content", content_dir)
    shutil.copytree(ROOT / "examples" / "meta", meta_dir)
    archived_meta = meta_dir / "items" / "imported" / "docker-network.yml"
    archived_meta.write_text(archived_meta.read_text(encoding="utf-8") + "archived: true\n", encoding="utf-8")
    settings = ServerSettings(
        content_dir=content_dir,
        meta_dir=meta_dir,
        public_dir=public_dir,
        site_title="Delete Test",
        max_upload_bytes=10 * 1024 * 1024,
    )

    result = ItemService(settings).delete_item("imported/docker-network.html")

    assert result == {"id": "imported/docker-network.html", "deleted": True}
    assert not (content_dir / "imported" / "docker-network.html").exists()
    assert not archived_meta.exists()
    manifest = json.loads((public_dir / "manifest.json").read_text(encoding="utf-8"))
    assert all(item["id"] != "imported/docker-network.html" for item in manifest["items"])


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
