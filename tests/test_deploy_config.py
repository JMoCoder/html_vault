from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def test_caddy_routes_public_share_pages_to_api() -> None:
    config = (ROOT / "deploy" / "Caddyfile").read_text(encoding="utf-8")

    assert "handle /share/*" in config
    assert "reverse_proxy api:8787" in config
    assert config.index("handle /share/*") < config.index("try_files {path} /index.html")


def test_basic_auth_caddy_keeps_public_share_routes_open() -> None:
    config = (ROOT / "deploy" / "caddy-basic-auth.Caddyfile").read_text(encoding="utf-8")

    assert "handle /share/*" in config
    assert "handle /api/public/shares/*" in config
    assert config.index("handle /share/*") < config.index("handle /api/*")
    assert config.index("handle /api/public/shares/*") < config.index("handle /api/*")
    public_share_block = config[config.index("handle /share/*"):config.index("handle /api/public/shares/*")]
    public_api_block = config[config.index("handle /api/public/shares/*"):config.index("handle /api/*")]
    assert "basic_auth" not in public_share_block
    assert "basic_auth" not in public_api_block
