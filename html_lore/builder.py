from __future__ import annotations

import json
import shutil
from pathlib import Path

from .manifest import build_manifest


PROJECT_ROOT = Path(__file__).resolve().parents[1]
APP_STATIC_DIR = PROJECT_ROOT / "app_static"


def build_site(
    content_dir: Path,
    meta_dir: Path | None,
    output_dir: Path,
    site_title: str = "HTMlore",
) -> dict:
    content_dir.mkdir(parents=True, exist_ok=True)
    output_dir.mkdir(parents=True, exist_ok=True)
    copy_static_app(output_dir)
    copy_content(content_dir, output_dir / "content")

    manifest = build_manifest(content_dir=content_dir, meta_dir=meta_dir, site_title=site_title)
    manifest_path = output_dir / "manifest.json"
    manifest_path.write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    return manifest


def copy_static_app(output_dir: Path) -> None:
    for source in APP_STATIC_DIR.iterdir():
        target = output_dir / source.name
        if source.is_dir():
            if target.exists():
                shutil.rmtree(target)
            shutil.copytree(source, target)
        else:
            shutil.copy2(source, target)
    share_dir = output_dir / "share"
    share_dir.mkdir(parents=True, exist_ok=True)
    shutil.copy2(output_dir / "index.html", share_dir / "index.html")


def copy_content(content_dir: Path, target_dir: Path) -> None:
    if target_dir.exists():
        shutil.rmtree(target_dir)
    if content_dir.exists():
        shutil.copytree(content_dir, target_dir)
    else:
        target_dir.mkdir(parents=True, exist_ok=True)
