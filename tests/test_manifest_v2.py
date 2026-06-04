from pathlib import Path

from html_lore.manifest import build_manifest


def test_manifest_v2_merges_sidecar_metadata() -> None:
    root = Path(__file__).resolve().parents[1]
    manifest = build_manifest(
        content_dir=root / "examples" / "content",
        meta_dir=root / "examples" / "meta",
        site_title="Test Vault",
    )

    assert manifest["version"] == 2
    assert manifest["site"]["title"] == "Test Vault"
    assert len(manifest["items"]) == 4

    item = next(item for item in manifest["items"] if item["id"] == "generated/2026/05/mcp-security.html")
    assert item["title"] == "MCP Server 安全模型"
    assert item["collection"] == "AI"
    assert item["source_type"] == "topic"
    assert item["tags"] == ["MCP", "Security", "AI Agent"]
    assert item["favorite"] is True
    assert item["archived"] is False
    assert item["pinned"] is True


def test_manifest_v2_infers_missing_metadata() -> None:
    root = Path(__file__).resolve().parents[1]
    manifest = build_manifest(
        content_dir=root / "examples" / "content",
        meta_dir=root / "examples" / "meta",
    )

    item = next(item for item in manifest["items"] if item["id"] == "reading/knowledge-workspace.html")
    assert item["title"] == "Knowledge Workspace Design Notes"
    assert item["collection"] == "Reading"
    assert item["source_type"] == "html"
    assert item["review_status"] == "reviewed"


def test_manifest_v2_defaults_generated_items_to_reviewed() -> None:
    root = Path(__file__).resolve().parents[1]
    manifest = build_manifest(
        content_dir=root / "examples" / "content",
        meta_dir=None,
    )

    item = next(item for item in manifest["items"] if item["id"] == "generated/2026/05/mcp-security.html")
    assert item["source_type"] == "topic"
    assert item["review_status"] == "reviewed"
