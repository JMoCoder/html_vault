import json
from pathlib import Path

from html_lore.builder import build_site


def test_build_site_writes_manifest_and_static_files(tmp_path: Path) -> None:
    root = Path(__file__).resolve().parents[1]
    output = tmp_path / "public"

    manifest = build_site(
        content_dir=root / "examples" / "content",
        meta_dir=root / "examples" / "meta",
        output_dir=output,
    )

    assert manifest["version"] == 2
    assert (output / "index.html").exists()
    assert (output / "app.js").exists()
    assert (output / "content" / "imported" / "docker-network.html").exists()

    saved = json.loads((output / "manifest.json").read_text(encoding="utf-8"))
    assert saved["version"] == 2
    assert len(saved["items"]) == 4
