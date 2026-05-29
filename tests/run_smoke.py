from pathlib import Path
import sys
from tempfile import TemporaryDirectory

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from html_vault.builder import build_site
from html_vault.manifest import build_manifest


def main() -> None:
    root = Path(__file__).resolve().parents[1]
    manifest = build_manifest(root / "examples" / "content", root / "examples" / "meta", "Test Vault")
    assert manifest["version"] == 2
    assert manifest["site"]["title"] == "Test Vault"
    assert len(manifest["items"]) == 3

    first = manifest["items"][0]
    assert first["id"] == "generated/2026/05/mcp-security.html"
    assert first["pinned"] is True

    item = next(item for item in manifest["items"] if item["id"] == "reading/knowledge-workspace.html")
    assert item["collection"] == "Reading"
    assert item["source_type"] == "html"

    with TemporaryDirectory() as directory:
        output = Path(directory) / "public"
        build_site(root / "examples" / "content", root / "examples" / "meta", output)
        assert (output / "index.html").exists()
        assert (output / "manifest.json").exists()
        assert (output / "content" / "imported" / "docker-network.html").exists()

    print("smoke tests passed")


if __name__ == "__main__":
    main()
