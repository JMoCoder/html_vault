import json
import shutil
from pathlib import Path

import pytest

from html_lore.server.config import ServerSettings
from html_lore.server.navigation import NavigationConfigError, NavigationConfigService
from tests.api_server import run_api_server


ROOT = Path(__file__).resolve().parents[1]


def copy_fixture_tree(tmp_path: Path) -> tuple[Path, Path, Path]:
    content_dir = tmp_path / "content"
    meta_dir = tmp_path / "meta"
    public_dir = tmp_path / "public"
    shutil.copytree(ROOT / "examples" / "content", content_dir)
    shutil.copytree(ROOT / "examples" / "meta", meta_dir)
    return content_dir, meta_dir, public_dir


def test_navigation_config_service_persists_visibility(tmp_path: Path) -> None:
    content_dir, meta_dir, public_dir = copy_fixture_tree(tmp_path)
    service = NavigationConfigService(
        ServerSettings(
            content_dir=content_dir,
            meta_dir=meta_dir,
            public_dir=public_dir,
            site_title="Navigation Test",
            max_upload_bytes=1024,
        ),
    )

    config = service.update_config(
        {
            "library": {"archived": {"visible": False}},
            "collections": {"Dev": {"visible": False}},
            "tags": {"Docker": {"visible": False}},
        },
    )

    stored = json.loads((meta_dir / "config" / "navigation.json").read_text(encoding="utf-8"))
    assert config == stored
    assert service.get_config()["collections"]["Dev"]["visible"] is False


def test_navigation_config_service_rejects_invalid_values(tmp_path: Path) -> None:
    content_dir, meta_dir, public_dir = copy_fixture_tree(tmp_path)
    service = NavigationConfigService(
        ServerSettings(
            content_dir=content_dir,
            meta_dir=meta_dir,
            public_dir=public_dir,
            site_title="Navigation Test",
            max_upload_bytes=1024,
        ),
    )

    with pytest.raises(NavigationConfigError):
        service.update_config({"tags": {"Docker": {"visible": "no"}}})


def test_navigation_config_api(tmp_path: Path) -> None:
    content_dir, meta_dir, public_dir = copy_fixture_tree(tmp_path)
    server = run_api_server(content_dir=content_dir, meta_dir=meta_dir, public_dir=public_dir, site_title="Navigation API Test")
    try:
        initial = server.request("GET", "/api/navigation")
        updated = server.json(
            "PUT",
            "/api/navigation",
            {
                "library": {"favorites": {"visible": False}},
                "collections": {"AI": {"visible": False}},
                "tags": {"MCP": {"visible": False}},
            },
        )
        stored = json.loads((meta_dir / "config" / "navigation.json").read_text(encoding="utf-8"))

        assert initial == {"library": {}, "collections": {}, "tags": {}}
        assert updated["library"]["favorites"]["visible"] is False
        assert updated == stored
    finally:
        server.close()
