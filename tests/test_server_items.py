from pathlib import Path
import json
import shutil

import pytest

from html_vault import __version__
from html_vault.server.config import ServerSettings
from html_vault.server.items import ItemContentError, ItemMetadataError, ItemService, normalize_query
from tests.api_server import run_api_server


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
    expected_items = [item for item in manifest["items"] if not item["archived"]]

    assert manifest["version"] == 2
    assert len(items) == len(expected_items)
    assert {item["id"] for item in items} == {item["id"] for item in expected_items}


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


def test_item_service_search_results_include_matches_and_snippets() -> None:
    service = ItemService(SETTINGS)

    result = service.search_items(normalize_query(q="docker", tags="MCP,Docker", tag_match="all"))

    assert result["query"] == "docker"
    assert result["count"] == 1
    assert result["items"][0]["item"]["id"] == "generated/2026/05/mcp-docker-agent.html"
    assert "title" in result["items"][0]["matches"] or "tags" in result["items"][0]["matches"]
    assert result["items"][0]["score"] > 0


def test_item_service_search_filters_favorites_and_tag_match_modes() -> None:
    service = ItemService(SETTINGS)

    any_result = service.search_items(normalize_query(tags="Docker,Security", tag_match="any"))
    all_result = service.search_items(normalize_query(tags="MCP,Docker", tag_match="all"))
    favorite_result = service.search_items(normalize_query(tags="MCP", favorite=True))

    assert {entry["item"]["id"] for entry in any_result["items"]} == {
        "generated/2026/05/mcp-docker-agent.html",
        "imported/docker-network.html",
        "generated/2026/05/mcp-security.html",
    }
    assert [entry["item"]["id"] for entry in all_result["items"]] == ["generated/2026/05/mcp-docker-agent.html"]
    assert [entry["item"]["id"] for entry in favorite_result["items"]] == ["generated/2026/05/mcp-security.html"]


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


def test_item_service_reads_item_content_safely() -> None:
    service = ItemService(SETTINGS)

    content = service.read_item_content("imported/docker-network.html")

    assert "Docker Network Quick Notes" in content
    with pytest.raises(ItemContentError):
        service.read_item_content("../README.md")


def test_item_service_updates_metadata_and_rebuilds(tmp_path: Path) -> None:
    content_dir = tmp_path / "content"
    meta_dir = tmp_path / "meta"
    public_dir = tmp_path / "public"
    shutil.copytree(ROOT / "examples" / "content", content_dir)
    shutil.copytree(ROOT / "examples" / "meta", meta_dir)
    settings = ServerSettings(
        content_dir=content_dir,
        meta_dir=meta_dir,
        public_dir=public_dir,
        site_title="Metadata Test",
        max_upload_bytes=10 * 1024 * 1024,
    )

    updated = ItemService(settings).update_item_metadata(
        "imported/docker-network.html",
        {
            "title": "Updated Docker Note",
            "summary": "Updated summary.",
            "collection": "Ops",
            "tags": ["Docker", "Networking", "MCP"],
        },
    )

    metadata_text = (meta_dir / "items" / "imported" / "docker-network.yml").read_text(encoding="utf-8")
    manifest = json.loads((public_dir / "manifest.json").read_text(encoding="utf-8"))
    manifest_item = next(item for item in manifest["items"] if item["id"] == "imported/docker-network.html")
    assert updated["title"] == "Updated Docker Note"
    assert updated["collection"] == "Ops"
    assert updated["tags"] == ["Docker", "Networking", "MCP"]
    assert "title: Updated Docker Note" in metadata_text
    assert manifest_item["summary"] == "Updated summary."


def test_item_service_rejects_metadata_update_for_archived_item(tmp_path: Path) -> None:
    content_dir = tmp_path / "content"
    meta_dir = tmp_path / "meta"
    public_dir = tmp_path / "public"
    shutil.copytree(ROOT / "examples" / "content", content_dir)
    shutil.copytree(ROOT / "examples" / "meta", meta_dir)
    settings = ServerSettings(
        content_dir=content_dir,
        meta_dir=meta_dir,
        public_dir=public_dir,
        site_title="Archived Metadata Test",
        max_upload_bytes=10 * 1024 * 1024,
    )
    service = ItemService(settings)
    service.update_item_state("imported/docker-network.html", {"archived": True})

    with pytest.raises(ItemMetadataError):
        service.update_item_metadata("imported/docker-network.html", {"title": "Should Not Save"})


def test_item_service_updates_favorite_and_archive_state(tmp_path: Path) -> None:
    content_dir = tmp_path / "content"
    meta_dir = tmp_path / "meta"
    public_dir = tmp_path / "public"
    shutil.copytree(ROOT / "examples" / "content", content_dir)
    shutil.copytree(ROOT / "examples" / "meta", meta_dir)
    settings = ServerSettings(
        content_dir=content_dir,
        meta_dir=meta_dir,
        public_dir=public_dir,
        site_title="State Test",
        max_upload_bytes=10 * 1024 * 1024,
    )
    service = ItemService(settings)

    favorited = service.update_item_state("imported/docker-network.html", {"favorite": True})
    archived = service.update_item_state("imported/docker-network.html", {"archived": True})

    assert favorited["favorite"] is True
    assert archived["favorite"] is True
    assert archived["archived"] is True
    assert "imported/docker-network.html" not in [item["id"] for item in service.list_items(normalize_query(library="all"))]
    assert [item["id"] for item in service.list_items(normalize_query(library="archived"))] == ["imported/docker-network.html"]

    restored = service.update_item_state("imported/docker-network.html", {"archived": False})
    metadata_text = (meta_dir / "items" / "imported" / "docker-network.yml").read_text(encoding="utf-8")
    assert restored["archived"] is False
    assert restored["favorite"] is True
    assert restored["collection"] == "Dev"
    assert "favorite: true" in metadata_text
    assert "archived: false" in metadata_text


def test_server_items_api() -> None:
    server = run_api_server(
        content_dir=SETTINGS.content_dir,
        meta_dir=SETTINGS.meta_dir or ROOT / "examples" / "meta",
        public_dir=SETTINGS.public_dir,
        site_title=SETTINGS.site_title,
    )
    try:
        data = server.request("GET", "/api/items", query={"tags": "MCP,Docker", "tag_match": "all"})
        assert data["count"] == 1
        assert data["items"][0]["id"] == "generated/2026/05/mcp-docker-agent.html"

        detail = server.request("GET", "/api/items/generated/2026/05/mcp-docker-agent.html")
        assert detail["collection"] == "AI"

        content = server.request_text("GET", "/api/items/imported/docker-network.html/content")
        raw = server.request_text("GET", "/api/items/imported/docker-network.html/raw")
        assert "Docker Network Quick Notes" in content
        assert raw == content

        search = server.request("GET", "/api/search", query={"q": "安全", "tags": "MCP"})
        assert search["count"] == 1
        assert search["items"][0]["item"]["id"] == "generated/2026/05/mcp-security.html"
        assert search["items"][0]["score"] > 0
    finally:
        server.close()


def test_server_version_api() -> None:
    server = run_api_server(
        content_dir=SETTINGS.content_dir,
        meta_dir=SETTINGS.meta_dir or ROOT / "examples" / "meta",
        public_dir=SETTINGS.public_dir,
        site_title=SETTINGS.site_title,
    )
    try:
        data = server.request("GET", "/api/version")
        assert data["version"] == __version__
        assert data["repository"] == "JMoCoder/html_vault"
        assert data["release_url"] == "https://github.com/JMoCoder/html_vault/releases"
    finally:
        server.close()
