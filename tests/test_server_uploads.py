import json
import shutil
from pathlib import Path

import pytest

from html_lore.server.config import ServerSettings
from html_lore.server.uploads import UploadError, UploadService
from tests.api_server import run_api_server


ROOT = Path(__file__).resolve().parents[1]


def copy_fixture_tree(tmp_path: Path) -> tuple[Path, Path, Path]:
    content_dir = tmp_path / "content"
    meta_dir = tmp_path / "meta"
    public_dir = tmp_path / "public"
    shutil.copytree(ROOT / "examples" / "content", content_dir)
    shutil.copytree(ROOT / "examples" / "meta", meta_dir)
    return content_dir, meta_dir, public_dir


def test_upload_service_imports_html_and_rebuilds(tmp_path: Path) -> None:
    content_dir, meta_dir, public_dir = copy_fixture_tree(tmp_path)
    settings = ServerSettings(
        content_dir=content_dir,
        meta_dir=meta_dir,
        public_dir=public_dir,
        site_title="Upload Test",
        max_upload_bytes=1024 * 1024,
    )

    result = UploadService(settings).import_html(
        filename="My Imported Note.html",
        content=b"<html><head><title>Uploaded Note</title></head><body><p>Uploaded body.</p></body></html>",
        title="Manual Upload Title",
        summary="Manual summary",
        collection="Inbox",
        tags="Upload,HTML",
    )

    assert result.status == "indexed"
    assert result.item_id.startswith("imported/")
    assert result.item["title"] == "Manual Upload Title"
    assert result.item["summary"] == "Manual summary"
    assert result.item["source_type"] == "imported"
    assert result.item["tags"] == ["Upload", "HTML"]
    assert (content_dir / result.item_id).exists()
    assert (meta_dir / "items" / Path(result.item_id).with_suffix(".yml")).exists()

    manifest = json.loads((public_dir / "manifest.json").read_text(encoding="utf-8"))
    assert any(item["id"] == result.item_id for item in manifest["items"])


def test_upload_service_rejects_non_html(tmp_path: Path) -> None:
    content_dir, meta_dir, public_dir = copy_fixture_tree(tmp_path)
    settings = ServerSettings(
        content_dir=content_dir,
        meta_dir=meta_dir,
        public_dir=public_dir,
        site_title="Upload Test",
        max_upload_bytes=1024,
    )

    with pytest.raises(UploadError):
        UploadService(settings).import_html("note.txt", b"plain text")


def test_upload_html_api(tmp_path: Path) -> None:
    content_dir, meta_dir, public_dir = copy_fixture_tree(tmp_path)
    server = run_api_server(content_dir=content_dir, meta_dir=meta_dir, public_dir=public_dir, site_title="Upload Test")
    try:
        data = server.multipart(
            "/api/uploads/html",
            fields={"collection": "Inbox", "tags": "API,Upload"},
            file_field="file",
            filename="api-note.html",
            content=b"<html><title>API Note</title><body>Body</body></html>",
            content_type="text/html",
        )
        assert data["status"] == "indexed"
        assert data["job_id"].startswith("upl_job_")
        assert data["item"]["source_type"] == "imported"
        assert data["item"]["tags"] == ["API", "Upload"]
        upload = server.request("GET", f"/api/uploads/{data['upload_id']}")
        assert upload["kind"] == "upload"
        assert upload["status"] == "completed"
        assert upload["item_id"] == data["item_id"]
    finally:
        server.close()


def test_full_core_api_smoke(tmp_path: Path) -> None:
    content_dir, meta_dir, public_dir = copy_fixture_tree(tmp_path)
    server = run_api_server(content_dir=content_dir, meta_dir=meta_dir, public_dir=public_dir, site_title="Core Smoke Test")
    try:
        uploaded = server.multipart(
            "/api/uploads/html",
            fields={
                "title": "Smoke Note",
                "summary": "Initial smoke summary.",
                "collection": "Smoke",
                "tags": "Smoke,API",
            },
            file_field="file",
            filename="smoke-note.html",
            content=b"<html><head><title>Smoke</title></head><body>Smoke body for API tests.</body></html>",
            content_type="text/html",
        )
        item_id = uploaded["item_id"]

        upload_status = server.request("GET", f"/api/uploads/{uploaded['upload_id']}")
        listed = server.request("GET", "/api/items", query={"collection": "Smoke"})
        updated = server.json(
            "PATCH",
            f"/api/items/{item_id}/metadata",
            {
                "title": "Smoke Note Updated",
                "summary": "Updated smoke summary.",
                "collection": "Smoke Ops",
                "tags": ["Smoke", "Verified"],
            },
        )
        search = server.request("GET", "/api/search", query={"q": "updated", "tags": "Smoke,Verified", "tag_match": "all"})
        content = server.request_text("GET", f"/api/items/{item_id}/content")
        favorited = server.json("PATCH", f"/api/items/{item_id}/state", {"favorite": True})
        archived = server.json("PATCH", f"/api/items/{item_id}/state", {"archived": True})
        archived_items = server.request("GET", "/api/items", query={"library": "archived"})
        restored = server.json("PATCH", f"/api/items/{item_id}/state", {"archived": False})
        archived_again = server.json("PATCH", f"/api/items/{item_id}/state", {"archived": True})
        deleted = server.request("DELETE", f"/api/items/{item_id}")

        assert uploaded["status"] == "indexed"
        assert upload_status["status"] == "completed"
        assert listed["count"] == 1
        assert listed["items"][0]["id"] == item_id
        assert updated["title"] == "Smoke Note Updated"
        assert search["count"] == 1
        assert search["items"][0]["item"]["id"] == item_id
        assert "Smoke body for API tests." in content
        assert favorited["favorite"] is True
        assert archived["archived"] is True
        assert item_id in [item["id"] for item in archived_items["items"]]
        assert restored["archived"] is False
        assert restored["favorite"] is True
        assert archived_again["archived"] is True
        assert deleted == {"id": item_id, "deleted": True}
        assert not (content_dir / item_id).exists()
    finally:
        server.close()


def test_metadata_update_api(tmp_path: Path) -> None:
    content_dir, meta_dir, public_dir = copy_fixture_tree(tmp_path)
    server = run_api_server(content_dir=content_dir, meta_dir=meta_dir, public_dir=public_dir, site_title="Metadata API Test")
    try:
        updated = server.json(
            "PATCH",
            "/api/items/imported/docker-network.html/metadata",
            {
                "title": "API Updated Docker Note",
                "summary": "API updated summary.",
                "collection": "Ops",
                "tags": ["Docker", "API"],
            },
        )
        detail = server.request("GET", "/api/items/imported/docker-network.html")
        metadata_text = (meta_dir / "items" / "imported" / "docker-network.yml").read_text(encoding="utf-8")
        assert updated["title"] == "API Updated Docker Note"
        assert detail["collection"] == "Ops"
        assert detail["tags"] == ["Docker", "API"]
        assert "title: API Updated Docker Note" in metadata_text
    finally:
        server.close()


def test_metadata_update_api_rejects_archived_item(tmp_path: Path) -> None:
    content_dir, meta_dir, public_dir = copy_fixture_tree(tmp_path)
    server = run_api_server(content_dir=content_dir, meta_dir=meta_dir, public_dir=public_dir, site_title="Archived Metadata API Test")
    try:
        archived = server.json("PATCH", "/api/items/imported/docker-network.html/state", {"archived": True})
        status, error = server.json_error(
            "PATCH",
            "/api/items/imported/docker-network.html/metadata",
            {"title": "Should Not Save"},
        )
        restored = server.json("PATCH", "/api/items/imported/docker-network.html/state", {"archived": False})

        assert archived["archived"] is True
        assert status == 400
        assert error["detail"] == "Archived items cannot be edited."
        assert restored["archived"] is False
    finally:
        server.close()


def test_item_state_update_api(tmp_path: Path) -> None:
    content_dir, meta_dir, public_dir = copy_fixture_tree(tmp_path)
    server = run_api_server(content_dir=content_dir, meta_dir=meta_dir, public_dir=public_dir, site_title="State API Test")
    try:
        favorited = server.json("PATCH", "/api/items/imported/docker-network.html/state", {"favorite": True})
        archived = server.json("PATCH", "/api/items/imported/docker-network.html/state", {"archived": True})
        all_items = server.request("GET", "/api/items")
        archived_items = server.request("GET", "/api/items", query={"library": "archived"})
        restored = server.json("PATCH", "/api/items/imported/docker-network.html/state", {"archived": False})
        metadata_text = (meta_dir / "items" / "imported" / "docker-network.yml").read_text(encoding="utf-8")

        assert favorited["favorite"] is True
        assert archived["favorite"] is True
        assert archived["archived"] is True
        assert "imported/docker-network.html" not in [item["id"] for item in all_items["items"]]
        assert [item["id"] for item in archived_items["items"]] == ["imported/docker-network.html"]
        assert restored["favorite"] is True
        assert restored["archived"] is False
        assert "favorite: true" in metadata_text
        assert "archived: false" in metadata_text
    finally:
        server.close()
