from __future__ import annotations

import argparse
from pathlib import Path

from .builder import build_site


def main() -> None:
    parser = argparse.ArgumentParser(prog="html-vault")
    subparsers = parser.add_subparsers(dest="command", required=True)

    build_parser = subparsers.add_parser("build", help="Build the static HTML Vault site.")
    build_parser.add_argument("--content", default="content", help="Directory containing source HTML files.")
    build_parser.add_argument("--meta", default="meta", help="Directory containing sidecar metadata.")
    build_parser.add_argument("--out", default="public", help="Output directory for the static site.")
    build_parser.add_argument("--title", default="HTML Vault", help="Site title.")

    args = parser.parse_args()
    if args.command == "build":
        manifest = build_site(
            content_dir=Path(args.content),
            meta_dir=Path(args.meta),
            output_dir=Path(args.out),
            site_title=args.title,
        )
        print(f"Built {len(manifest['items'])} items into {args.out}")


if __name__ == "__main__":
    main()
