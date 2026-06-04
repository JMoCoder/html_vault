from __future__ import annotations

import argparse
from pathlib import Path

from .builder import build_site
from .server.config import ServerSettings
from .server.users import UserStore, UserStoreError


def main() -> None:
    parser = argparse.ArgumentParser(prog="html-lore")
    subparsers = parser.add_subparsers(dest="command", required=True)

    build_parser = subparsers.add_parser("build", help="Build the static HTMlore site.")
    build_parser.add_argument("--content", default="content", help="Directory containing source HTML files.")
    build_parser.add_argument("--meta", default="meta", help="Directory containing sidecar metadata.")
    build_parser.add_argument("--out", default="public", help="Output directory for the static site.")
    build_parser.add_argument("--title", default="HTMlore", help="Site title.")

    api_parser = subparsers.add_parser("serve-api", help="Run the optional backend API server.")
    api_parser.add_argument("--host", default="127.0.0.1", help="Host to bind.")
    api_parser.add_argument("--port", type=int, default=8787, help="Port to bind.")

    user_parser = subparsers.add_parser("user-add", help="Add or update a self-hosted login user.")
    user_parser.add_argument("--users-file", default="data/users.json", help="Path to users.json.")
    user_parser.add_argument("--username", required=True, help="Login username. Matching is case-insensitive.")
    user_parser.add_argument("--password", required=True, help="Login password. Stored as a PBKDF2 hash.")
    user_parser.add_argument("--role", default="user", choices=["admin", "user"], help="User role.")
    user_parser.add_argument("--data-id", default="", help="Optional persistent data partition id.")
    user_parser.add_argument("--replace", action="store_true", help="Replace the user if it already exists.")

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
            raise SystemExit("serve-api requires the agent extra: pip install 'html-lore[agent]'") from exc
        uvicorn.run("html_lore.server.app:app", host=args.host, port=args.port, reload=False)
    elif args.command == "user-add":
        settings = ServerSettings(
            content_dir=Path("data/content"),
            meta_dir=Path("data/meta"),
            public_dir=Path("public"),
            site_title="HTMlore",
            max_upload_bytes=10 * 1024 * 1024,
            users_file=Path(args.users_file),
        )
        try:
            user = UserStore(settings).add_user(
                username=args.username,
                password=args.password,
                role=args.role,
                data_id=args.data_id,
                replace_existing=args.replace,
            )
        except UserStoreError as exc:
            raise SystemExit(str(exc)) from exc
        print(f"Saved user {user['username']} with data partition {user['data_id']} in {args.users_file}")


if __name__ == "__main__":
    main()
