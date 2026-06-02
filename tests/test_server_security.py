import shutil
import urllib.error
import urllib.request
from pathlib import Path

from tests.api_server import run_api_server


ROOT = Path(__file__).resolve().parents[1]


def copy_fixture_tree(tmp_path: Path) -> tuple[Path, Path, Path]:
    content_dir = tmp_path / "content"
    meta_dir = tmp_path / "meta"
    public_dir = tmp_path / "public"
    shutil.copytree(ROOT / "examples" / "content", content_dir)
    shutil.copytree(ROOT / "examples" / "meta", meta_dir)
    return content_dir, meta_dir, public_dir


def test_api_token_protects_manifest(tmp_path: Path) -> None:
    content_dir, meta_dir, public_dir = copy_fixture_tree(tmp_path)
    server = run_api_server(
        content_dir=content_dir,
        meta_dir=meta_dir,
        public_dir=public_dir,
        site_title="Security Test",
        api_token="secret-token",
    )
    try:
        url = f"http://127.0.0.1:{server.port}/api/manifest"
        try:
            urllib.request.urlopen(url, timeout=5)
        except urllib.error.HTTPError as exc:
            assert exc.code == 401
        else:
            raise AssertionError("Expected unauthenticated manifest request to fail.")

        manifest = server.request("GET", "/api/manifest")
        assert manifest["version"] == 2
    finally:
        server.close()


def test_api_token_query_allows_iframe_content(tmp_path: Path) -> None:
    content_dir, meta_dir, public_dir = copy_fixture_tree(tmp_path)
    server = run_api_server(
        content_dir=content_dir,
        meta_dir=meta_dir,
        public_dir=public_dir,
        site_title="Security Test",
        api_token="secret-token",
    )
    try:
        content = server.request_text(
            "GET",
            "/api/items/imported/docker-network.html/content",
            query={"access_token": "secret-token"},
            headers={"Authorization": ""},
        )
        assert "Docker Network Quick Notes" in content
    finally:
        server.close()
