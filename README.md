# HTML Vault

Languages: [English](README.md) | [中文](README.zh-CN.md) | [日本語](README.ja.md)

Deployment: [Self-hosted Docker and security baseline](DEPLOYMENT.md)

HTML Vault is a self-hosted knowledge workspace for saving, browsing, reading,
and eventually discussing HTML-based knowledge files with AI. It is designed
for people who want their notes to remain portable files instead of being
locked inside a database-first note app.

The long-term direction is a web-first personal knowledge vault: import or
generate HTML notes, organize them with collections and tags, read them in a
polished card workspace, install the app as a PWA, and later connect AI services
for classification, retrieval, summarization, and multi-turn conversations over
your own library.

## Why HTML Vault

Most knowledge tools either store content as opaque database rows or focus on
Markdown-first authoring. HTML Vault takes a different path:

- **HTML files are the durable content layer.** Notes can be inspected, copied,
  archived, backed up, and served by ordinary web infrastructure.
- **YAML sidecar metadata keeps organization explicit.** Titles, summaries,
  collections, tags, favorite state, archive state, and source metadata live
  beside the content.
- **The web app is the primary client.** The project targets browser + mobile
  PWA usage instead of a separate desktop application.
- **AI is treated as an optional service layer.** The current app already has
  the UI architecture for AI-assisted workflows, while credentials and model
  calls are kept out of the static frontend.

## 0.5.0 Stable Scope

Version `0.5.0` is the first stable self-hosted notebook release. It focuses on
real local or private-network use: Docker deployment, HTML import, persistent
metadata, filtering, reading, archiving, and a documented security boundary for
public deployment.

Implemented today:

- Single-container Docker deployment with `docker compose up -d --build`.
- Static-first frontend generated from `app_static/`.
- Backend API for real notebook operation.
- HTML upload/import into `data/content`.
- YAML metadata persistence in `data/meta`.
- Automatic rebuild of `public/` after imports and metadata/state changes.
- Card workspace with collection, library, tag, favorite, search, and sort
  workflows.
- Tag multi-select filters with OR/AND matching.
- Reader view with iframe reading, original-file access, copy/share actions,
  favorite/archive actions, and metadata editing.
- Archive behavior with edit lock and permanent delete for archived notes.
- Sidebar visibility management for library views, collections, and tags.
- Global AI sidebar UI scaffold with context labels.
- AI provider, data, user, account/security, project info, and update sections
  in settings.
- PWA manifest and service worker.
- Chinese, English, and Japanese system UI labels.
- Light/dark theme switching and resizable sidebars.
- `GET /api/version` and update hints from GitHub releases/tags.
- Optional Caddy Basic Auth example for public deployments.

Not implemented yet:

- Real AI model calls.
- AI-generated HTML notes.
- AI-powered reclassification/tagging jobs.
- Multi-user accounts.
- Cloud sync or hosted subscription service.
- Full backup/restore and WebDAV execution.
- Batch collection/tag rename, merge, or delete operations.

## Quick Docker Start

The default deployment is intended for local machines, NAS, LAN servers, or a
private VPS. It does not require a token or Caddy.

```bash
git clone https://github.com/JMoCoder/html_vault.git
cd html_vault
docker compose up -d --build
```

Open:

```text
http://localhost:8080
```

or from another device on the same network:

```text
http://your-host-ip:8080
```

Runtime data is stored outside Git:

```text
data/content   Imported HTML files
data/meta      YAML sidecar metadata and runtime config
public         Generated web app output
```

Do not expose the default compose stack directly to the public internet. For
public deployment, add HTTPS and authentication with your preferred reverse
proxy. A Caddy Basic Auth example is provided in `compose.prod.yml`,
`.env.secure.example`, and `deploy/caddy-basic-auth.Caddyfile`.

## Static Build

HTML Vault can also build a static site from existing content and metadata:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -e .
html-vault build --content examples/content --meta examples/meta --out public
python -m http.server 8080 --directory public
```

Open `http://localhost:8080`.

Static mode is useful for read-only publishing, GitHub Pages-like hosting, or
checking the generated app. Real upload and metadata persistence require the
backend API or the default Docker deployment.

## Data Model

HTML files are stored under a content directory:

```text
content/
  generated/2026/05/mcp-security.html
  imported/docker-network.html
  reading/knowledge-workspace.html
```

Optional metadata mirrors the content path under `meta/items/`:

```yaml
id: generated/2026/05/mcp-security.html
title: MCP Server Security Model
summary: Trust boundaries, permissions, tool-call risks, and deployment notes.
source_type: topic
collection: AI
tags:
  - MCP
  - Security
favorite: true
pinned: true
open_mode: iframe
agent:
  generated: true
  job_id: job_demo
```

Metadata overrides values extracted from the HTML document. Without metadata,
HTML Vault infers title, summary, collection, source type, timestamps, and
review status.

## Backend API

The backend API is included in the Docker deployment and can also be started
manually with the optional `agent` extra:

```bash
pip install -e ".[agent]"
HTML_VAULT_CONTENT=data/content \
HTML_VAULT_META=data/meta \
HTML_VAULT_PUBLIC=public \
html-vault serve-api --host 127.0.0.1 --port 8787
```

Implemented endpoints:

- `GET /api/health`
- `GET /api/version`
- `GET /api/manifest`
- `GET /api/navigation`
- `PUT /api/navigation`
- `GET /api/items`
- `GET /api/search`
- `GET /api/items/{id}`
- `GET /api/items/{id}/content`
- `GET /api/items/{id}/raw`
- `POST /api/rebuild`
- `GET /api/rebuild/{job_id}`
- `PATCH /api/items/{id}/metadata`
- `PATCH /api/items/{id}/state`
- `POST /api/uploads/html`
- `GET /api/uploads/{upload_id}`
- `DELETE /api/items/{id}`

The API supports current frontend workflows: upload, list, search, filter,
read, edit metadata, favorite, archive, unarchive, permanent delete for
archived notes, navigation visibility persistence, rebuild jobs, and version
checks.

## Security Model

Default Docker mode is optimized for local, LAN, and private self-hosted use.
It does not require `HTML_VAULT_API_TOKEN`, so the frontend can call the same
origin API directly.

When you expose HTML Vault publicly:

- Put it behind HTTPS.
- Require login/session/authentication before serving the app.
- Set `HTML_VAULT_API_TOKEN` for backend API protection.
- Let the reverse proxy inject the backend token server-side.
- Do not embed long-lived API tokens in frontend JavaScript.
- Back up `data/` before upgrades and before any schema-changing release.

See [DEPLOYMENT.md](DEPLOYMENT.md) for the reusable security baseline and the
Caddy Basic Auth example.

## Roadmap

Near-term backend and notebook work:

- Batch collection and tag operations.
- Backup and restore workflows.
- WebDAV settings execution.
- Richer import validation and duplicate handling.
- Search backend upgrade path, such as SQLite FTS or Pagefind.

AI work:

- Provider-side credential storage on the server.
- AI-generated HTML notes.
- Knowledge-base Q&A through the global AI sidebar.
- AI-assisted classification, tagging, summarization, and cleanup jobs.
- User confirmation and audit trails for destructive AI batch operations.

Future product direction:

- Hosted sync and cross-device usage.
- User accounts and account security.
- Commercial AI/cloud service integration.
- Better mobile PWA flows.
- Optional collaboration features while keeping local-first data ownership.

## Repository Layout

```text
app_static/        Static workspace UI copied into build output
html_vault/        Python builder, manifest logic, and backend API
examples/          Example content and metadata
tests/             Pytest coverage for builder and backend APIs
deploy/            Optional deployment examples
docs/              Local planning documents, ignored by Git
```

## Development

```bash
pip install -e ".[dev,agent]"
pytest
python tests/run_smoke.py
html-vault build --content examples/content --meta examples/meta --out public
```

## License

MIT
