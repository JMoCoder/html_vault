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

    api_parser = subparsers.add_parser("serve-api", help="Run the optional backend API server.")
    api_parser.add_argument("--host", default="127.0.0.1", help="Host to bind.")
    api_parser.add_argument("--port", type=int, default=8787, help="Port to bind.")

    args = parser.parse_args()
    if args.command == "build":
        manifest = build_site(
            content_dir=Path(args.content),
            meta_dir=Path(args.meta),
            output_dir=Path(args.out),
            site_title=args.title,
        )
        print(f"Built {len(manifest['items'])} items into {args.out}")
    elif args.command == "serve-api":
        try:
            import uvicorn
        except ModuleNotFoundError as exc:  # pragma: no cover - optional dependency guard
            raise SystemExit("serve-api requires the agent extra: pip install 'html-vault[agent]'") from exc
        uvicorn.run("html_vault.server.app:app", host=args.host, port=args.port, reload=False)


if __name__ == "__main__":
    main()
