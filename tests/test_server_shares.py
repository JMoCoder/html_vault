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


def test_share_link_allows_public_sanitized_note_without_login(tmp_path: Path) -> None:
    content_dir, meta_dir, public_dir = copy_fixture_tree(tmp_path)
    server = run_api_server(
        content_dir=content_dir,
        meta_dir=meta_dir,
        public_dir=public_dir,
        site_title="Share Test",
        auth_username="admin",
        auth_password="correct-password",
        session_secret="test-session-secret",
    )
    try:
        try:
            urllib.request.urlopen(f"http://127.0.0.1:{server.port}/api/items/imported/docker-network.html/raw", timeout=5)
        except urllib.error.HTTPError as exc:
            assert exc.code == 401
        else:
            raise AssertionError("Expected raw item access to require login.")

        server.json("POST", "/api/auth/login", {"username": "admin", "password": "correct-password"})
        created = server.json("POST", "/api/shares", {"item_id": "imported/docker-network.html", "duration": "1d"})

        assert created["share"]["active"] is True
        assert created["url_path"].startswith("/share/")
        assert created["token"]

        public_json = urllib.request.urlopen(
            f"http://127.0.0.1:{server.port}/api/public/shares/{created['token']}",
            timeout=5,
        ).read().decode("utf-8")
        public_page = urllib.request.urlopen(
            f"http://127.0.0.1:{server.port}{created['url_path']}",
            timeout=5,
        ).read().decode("utf-8")

        assert "Docker Network Quick Notes" in public_json
        assert "Docker Network Quick Notes" in public_page
        assert "HTMlore shared note" in public_page
    finally:
        server.close()


def test_share_creation_blocks_scripted_html(tmp_path: Path) -> None:
    content_dir, meta_dir, public_dir = copy_fixture_tree(tmp_path)
    unsafe = content_dir / "imported" / "unsafe.html"
    unsafe.parent.mkdir(parents=True, exist_ok=True)
    unsafe.write_text(
        "<html><head><title>Unsafe</title></head><body><script>alert(1)</script><a href=\"https://example.com\">out</a></body></html>",
        encoding="utf-8",
    )
    server = run_api_server(content_dir=content_dir, meta_dir=meta_dir, public_dir=public_dir, site_title="Share Test")
    try:
        status, error = server.json_error("POST", "/api/shares", {"item_id": "imported/unsafe.html", "duration": "1d"})

        assert status == 400
        assert error["detail"]["safety"]["shareable"] is False
        assert "blocked-tag:script" in error["detail"]["safety"]["reasons"]
    finally:
        server.close()


def test_share_allows_safe_toggle_interaction_without_source_script(tmp_path: Path) -> None:
    content_dir, meta_dir, public_dir = copy_fixture_tree(tmp_path)
    collapsible = content_dir / "imported" / "collapsible.html"
    collapsible.parent.mkdir(parents=True, exist_ok=True)
    collapsible.write_text(
        """<html>
<head>
  <title>Collapsible</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC&display=swap" rel="stylesheet">
</head>
<body>
  <div class="qgroup-header" onclick="toggleGroup('g1')">Open group</div>
  <div class="qgroup open" id="g1">Group body</div>
  <script>
    function toggleGroup(id) {
      const el = document.getElementById(id);
      el.classList.toggle('open');
    }

    // Open first group by default (already set via class)
    // Add keyboard shortcut: press '?' to expand all
    document.addEventListener('keydown', e => {
      if (e.key === '?') {
        document.querySelectorAll('.qgroup').forEach(g => g.classList.add('open'));
      }
      if (e.key === '/') {
        document.querySelectorAll('.qgroup').forEach(g => g.classList.remove('open'));
        document.getElementById('g1').classList.add('open');
      }
    });
  </script>
</body>
</html>""",
        encoding="utf-8",
    )
    server = run_api_server(content_dir=content_dir, meta_dir=meta_dir, public_dir=public_dir, site_title="Share Test")
    try:
        created = server.json("POST", "/api/shares", {"item_id": "imported/collapsible.html", "duration": "1d"})
        public_page = urllib.request.urlopen(
            f"http://127.0.0.1:{server.port}{created['url_path']}",
            timeout=5,
        ).read().decode("utf-8")

        assert created["share"]["active"] is True
        assert 'data-share-toggle="g1"' in public_page
        assert "onclick=" not in public_page
        assert "fonts.googleapis.com" not in public_page
        assert "function toggleGroup" not in public_page
    finally:
        server.close()


def test_share_still_blocks_unsafe_inline_handlers(tmp_path: Path) -> None:
    content_dir, meta_dir, public_dir = copy_fixture_tree(tmp_path)
    unsafe = content_dir / "imported" / "unsafe-handler.html"
    unsafe.parent.mkdir(parents=True, exist_ok=True)
    unsafe.write_text("<html><body><div onclick=\"fetch('/api/items')\">bad</div></body></html>", encoding="utf-8")
    server = run_api_server(content_dir=content_dir, meta_dir=meta_dir, public_dir=public_dir, site_title="Share Test")
    try:
        status, error = server.json_error("POST", "/api/shares", {"item_id": "imported/unsafe-handler.html", "duration": "1d"})

        assert status == 400
        assert "inline-event-handler" in error["detail"]["safety"]["reasons"]
    finally:
        server.close()


def test_shared_page_disables_external_links(tmp_path: Path) -> None:
    content_dir, meta_dir, public_dir = copy_fixture_tree(tmp_path)
    linked = content_dir / "imported" / "linked.html"
    linked.parent.mkdir(parents=True, exist_ok=True)
    linked.write_text(
        "<html><head><title>Linked</title></head><body><h1>Linked</h1><a href=\"https://example.com\">external</a></body></html>",
        encoding="utf-8",
    )
    server = run_api_server(content_dir=content_dir, meta_dir=meta_dir, public_dir=public_dir, site_title="Share Test")
    try:
        created = server.json("POST", "/api/shares", {"item_id": "imported/linked.html", "duration": "1d"})
        public_page = urllib.request.urlopen(
            f"http://127.0.0.1:{server.port}{created['url_path']}",
            timeout=5,
        ).read().decode("utf-8")

        assert "Linked" in public_page
        assert "external" in public_page
        assert "https://example.com" not in public_page
    finally:
        server.close()


def test_shared_page_disables_internal_links(tmp_path: Path) -> None:
    content_dir, meta_dir, public_dir = copy_fixture_tree(tmp_path)
    linked = content_dir / "imported" / "internal-linked.html"
    linked.parent.mkdir(parents=True, exist_ok=True)
    linked.write_text(
        "<html><body><a href=\"../generated/example.html\">internal</a></body></html>",
        encoding="utf-8",
    )
    server = run_api_server(content_dir=content_dir, meta_dir=meta_dir, public_dir=public_dir, site_title="Share Test")
    try:
        created = server.json("POST", "/api/shares", {"item_id": "imported/internal-linked.html", "duration": "1d"})
        public_page = urllib.request.urlopen(
            f"http://127.0.0.1:{server.port}{created['url_path']}",
            timeout=5,
        ).read().decode("utf-8")

        assert "internal" in public_page
        assert "../generated/example.html" not in public_page
        assert "<a href=" not in public_page
    finally:
        server.close()


def test_replacing_share_revokes_previous_token(tmp_path: Path) -> None:
    content_dir, meta_dir, public_dir = copy_fixture_tree(tmp_path)
    server = run_api_server(content_dir=content_dir, meta_dir=meta_dir, public_dir=public_dir, site_title="Share Test")
    try:
        first = server.json("POST", "/api/shares", {"item_id": "imported/docker-network.html", "duration": "1h"})
        second = server.json("POST", "/api/shares", {"item_id": "imported/docker-network.html", "duration": "1d"})

        assert first["token"] != second["token"]
        try:
            urllib.request.urlopen(f"http://127.0.0.1:{server.port}/api/public/shares/{first['token']}", timeout=5)
        except urllib.error.HTTPError as exc:
            assert exc.code == 404
        else:
            raise AssertionError("Expected replaced share token to be revoked.")

        public_json = urllib.request.urlopen(
            f"http://127.0.0.1:{server.port}/api/public/shares/{second['token']}",
            timeout=5,
        ).read().decode("utf-8")
        assert "Docker Network Quick Notes" in public_json
    finally:
        server.close()


def test_share_rechecks_safety_when_public_link_is_used(tmp_path: Path) -> None:
    content_dir, meta_dir, public_dir = copy_fixture_tree(tmp_path)
    target = content_dir / "imported" / "docker-network.html"
    server = run_api_server(content_dir=content_dir, meta_dir=meta_dir, public_dir=public_dir, site_title="Share Test")
    try:
        created = server.json("POST", "/api/shares", {"item_id": "imported/docker-network.html", "duration": "1d"})
        target.write_text("<html><body><script>alert(1)</script></body></html>", encoding="utf-8")

        try:
            urllib.request.urlopen(f"http://127.0.0.1:{server.port}/api/public/shares/{created['token']}", timeout=5)
        except urllib.error.HTTPError as exc:
            assert exc.code == 404
        else:
            raise AssertionError("Expected mutated unsafe share to be unavailable.")

        shares = server.request("GET", "/api/shares")
        assert shares["shares"][0]["active"] is False
        assert "blocked-tag:script" in shares["shares"][0]["safety"]["reasons"]
    finally:
        server.close()


def test_revoked_share_stops_public_access(tmp_path: Path) -> None:
    content_dir, meta_dir, public_dir = copy_fixture_tree(tmp_path)
    server = run_api_server(content_dir=content_dir, meta_dir=meta_dir, public_dir=public_dir, site_title="Share Test")
    try:
        created = server.json("POST", "/api/shares", {"item_id": "imported/docker-network.html", "duration": "1h"})
        revoked = server.request("DELETE", f"/api/shares/{created['share']['id']}")

        assert revoked["active"] is False
        try:
            urllib.request.urlopen(f"http://127.0.0.1:{server.port}/api/public/shares/{created['token']}", timeout=5)
        except urllib.error.HTTPError as exc:
            assert exc.code == 404
        else:
            raise AssertionError("Expected revoked share to be unavailable.")
    finally:
        server.close()
