import shutil
import urllib.error
import urllib.request
import json
from pathlib import Path

from html_vault.builder import build_site

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


def test_api_server_serves_static_frontend(tmp_path: Path) -> None:
    content_dir, meta_dir, public_dir = copy_fixture_tree(tmp_path)
    build_site(content_dir, meta_dir, public_dir, "Static Test")
    server = run_api_server(
        content_dir=content_dir,
        meta_dir=meta_dir,
        public_dir=public_dir,
        site_title="Static Test",
    )
    try:
        index = server.request_text("GET", "/")
        assert "<title>HTML Vault</title>" in index
        health = server.request("GET", "/api/health")
        assert health["status"] == "ok"
    finally:
        server.close()


def test_login_session_protects_api_and_content(tmp_path: Path) -> None:
    content_dir, meta_dir, public_dir = copy_fixture_tree(tmp_path)
    build_site(content_dir, meta_dir, public_dir, "Auth Test")
    server = run_api_server(
        content_dir=content_dir,
        meta_dir=meta_dir,
        public_dir=public_dir,
        site_title="Auth Test",
        auth_username="admin",
        auth_password="correct-password",
        session_secret="test-session-secret",
    )
    try:
        status = server.request("GET", "/api/auth/status")
        assert status == {"enabled": True, "authenticated": False, "user": None}

        for path in ["/api/manifest", "/manifest.json", "/content/imported/docker-network.html"]:
            try:
                server.request_text("GET", path)
            except urllib.error.HTTPError as exc:
                assert exc.code == 401
            else:
                raise AssertionError(f"Expected unauthenticated request to fail: {path}")

        body = json.dumps({"username": "admin", "password": "wrong-password"}).encode("utf-8")
        try:
            server.request_text(
                "POST",
                "/api/auth/login",
                body=body,
                headers={"Content-Type": "application/json", "Content-Length": str(len(body))},
            )
        except urllib.error.HTTPError as exc:
            assert exc.code == 401
        else:
            raise AssertionError("Expected invalid login to fail.")

        body = json.dumps({"username": "ADMIN", "password": "correct-password"}).encode("utf-8")
        login = server.request(
            "POST",
            "/api/auth/login",
            body=body,
            headers={"Content-Type": "application/json", "Content-Length": str(len(body))},
        )
        assert login == {"enabled": True, "authenticated": True, "user": "admin"}

        manifest = server.request("GET", "/api/manifest")
        assert manifest["version"] == 2
        static_manifest = server.request("GET", "/manifest.json")
        assert static_manifest["version"] == 2
        content = server.request_text("GET", "/content/imported/docker-network.html")
        assert "Docker Network Quick Notes" in content
    finally:
        server.close()
