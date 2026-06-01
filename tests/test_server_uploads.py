import json
import shutil
from pathlib import Path

import pytest

try:
    from fastapi.testclient import TestClient
except ModuleNotFoundError:  # pragma: no cover - optional agent extra
    TestClient = None

from html_vault.server.config import ServerSettings
from html_vault.server.uploads import UploadError, UploadService


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


@pytest.mark.skipif(TestClient is None, reason="fastapi is not installed")
def test_upload_html_api(tmp_path: Path) -> None:
    from html_vault.server.app import app, get_settings

    content_dir, meta_dir, public_dir = copy_fixture_tree(tmp_path)
    settings = ServerSettings(
        content_dir=content_dir,
        meta_dir=meta_dir,
        public_dir=public_dir,
        site_title="Upload Test",
        max_upload_bytes=1024 * 1024,
    )
    app.dependency_overrides[get_settings] = lambda: settings
    client = TestClient(app)
    try:
        response = client.post(
            "/api/uploads/html",
            files={"file": ("api-note.html", b"<html><title>API Note</title><body>Body</body></html>", "text/html")},
            data={"collection": "Inbox", "tags": "API,Upload"},
        )
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "indexed"
        assert data["item"]["source_type"] == "imported"
        assert data["item"]["tags"] == ["API", "Upload"]
    finally:
        app.dependency_overrides.clear()
