# HTML Vault

Languages: [English](README.md) | [中文](README.zh-CN.md) | [日本語](README.ja.md)

HTML Vault is a static-first workspace for HTML knowledge assets. Put HTML files
in a content directory, build a manifest, and publish a card-based knowledge
library that can be hosted by any static web server.

The 0.1 MVP follows the 2.0 product direction: the main UI is a
Karakeep-style card workspace, not a folder-tree-first reader. HTML files remain
the source of truth, while metadata lives in optional YAML sidecar files.

## Features

- Manifest v2 item model for HTML knowledge cards.
- Sidecar metadata from `meta/items/**/*.yml`.
- Card grid with filters for library status, collections, and tags.
- Toolbar tag filters with OR/AND matching.
- Toolbar sort menu for newest, oldest, title A-Z, and title Z-A ordering.
- Card metadata uses generated/imported source labels and collection/source
  grouping.
- Card-only workspace layout with compact action controls.
- Reader pane with iframe mode, original-open action, and hash links.
- Favorite and archive actions on item cards and in the reader.
- Per-note metadata editing from cards and the reader, saved as local browser
  overrides for title, summary, collection, and tags.
- PWA install support through a web app manifest and service worker; the web
  app is the primary cross-device client instead of a separate desktop app.
- Topbar import entry for existing HTML files, plus a separate AI creation
  entry for generated HTML notes.
- Chinese, English, and Japanese UI language switching for system labels.
- Dark and light mode switching with a compact sidebar icon.
- Resizable left sidebar and resizable global AI sidebar, both persisted
  locally.
- Global AI sidebar entry beside search, with a resizable right panel and
  context labels for all notes, collections, tags, search results, or the
  current reader topic, including active favorite/archive and multi-select
  filters.
- Settings page for data, AI provider configuration, user profile,
  account/security, user agreement, project info, and update notes.
- Library, collection, and tag sidebar visibility management.
- Local backup/restore, WebDAV settings, and data export sections are
  scaffolded under a separate data settings group.
- AI knowledge assistant is scaffolded for future database classification and
  tagging jobs; multi-turn knowledge conversations move to the global AI
  sidebar.
- A magic-wand "I'm feeling lucky" button opens a random matching knowledge
  item from the current workspace view.
- Static build output that works on GitHub Pages, Cloudflare Pages, Caddy,
  Nginx, NAS, or any static file server.
- Docker image for quick static hosting.

## Repository Layout

```text
app_static/        Static workspace UI copied into build output
html_vault/        Python builder and manifest code
examples/          Example content and metadata
tests/             Pytest coverage for manifest and build output
docs/              Local planning documents, ignored by Git
```

## Quick Start

```bash
python -m venv .venv
source .venv/bin/activate
pip install -e .
html-vault build --content examples/content --meta examples/meta --out public
python -m http.server 8080 --directory public
```

Open `http://localhost:8080`.

## Content Model

HTML files are stored under `content/` or any directory passed to
`html-vault build --content`.

```text
content/
  generated/2026/05/mcp-security.html
  imported/docker-network.html
  reading/knowledge-workspace.html
```

Optional metadata mirrors the content path under `meta/items/`.

```yaml
id: generated/2026/05/mcp-security.html
title: MCP Server 安全模型
summary: 介绍 MCP Server 的信任边界、权限、工具调用风险与部署建议。
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

## Build Command

```bash
html-vault build \
  --content examples/content \
  --meta examples/meta \
  --out public \
  --title "HTML Vault"
```

The output directory contains:

- `index.html`, `app.js`, `style.css`
- `manifest.json`
- copied `content/` HTML files

## Agent Entry

The new-item card is static-safe by default. If no Agent Server is configured,
submitting the form shows a setup hint.

To connect a future Agent Server, define this before loading `app.js`:

```html
<script>
  window.HTML_VAULT_AGENT_URL = "http://localhost:8787";
</script>
```

The UI posts to:

```http
POST /api/jobs
```

with an `input_type`, `input`, and `options` payload.

## Backend API

The first backend slice is available through the optional `agent` extra:

```bash
pip install -e ".[agent]"
HTML_VAULT_CONTENT=examples/content \
HTML_VAULT_META=examples/meta \
html-vault serve-api --port 8787
```

Implemented endpoints:

- `GET /api/health`
- `GET /api/manifest`
- `GET /api/items`
- `GET /api/items/{id}`
- `GET /api/items/{id}/content`
- `GET /api/items/{id}/raw`
- `POST /api/uploads/html`
- `DELETE /api/items/{id}`

`GET /api/items` supports the current frontend list logic: library filters,
collection, comma-separated tags with `tag_match=any|all`, favorite/archive
filters, search query, sorting, and limit.

`POST /api/uploads/html` accepts a multipart HTML file plus optional `title`,
`summary`, `collection`, and comma-separated `tags`. Successful imports write
to `content/imported/YYYY/MM/`, create sidecar metadata, rebuild `public/`, and
return the indexed item.

`GET /api/items/{id}/content` returns the source HTML for iframe reading.
`GET /api/items/{id}/raw` returns the same source HTML for original-file access.
Both endpoints validate that the requested item exists in the manifest and stays
inside the configured content directory.

`DELETE /api/items/{id}` only accepts archived items. It permanently removes
the HTML file and sidecar metadata, then rebuilds `public/`.

## AI Provider Settings

The sidebar settings button opens a full settings page. API keys are not stored
in `localStorage`. In static mode, HTML Vault only saves non-sensitive model
preferences such as provider, model name, base URL, temperature, and max tokens.

In full mode, the API key should be sent only to a protected Agent Server
endpoint over HTTPS or a private network. The server should store it as an
environment secret or encrypted server-side credential and never return it to
the browser.

## Sidebar Management

Library, collection, and tag management live in the settings page. Static mode
can hide sidebar navigation entries without modifying original metadata.
Library views are fixed system filters, so only visibility can be changed. Add,
rename, merge, and delete for collections or tags are structural metadata
operations and require the future Agent Server to update `meta/items/**/*.yml`.
The current per-note metadata editor stores local browser overrides without
rewriting source files.

## Local Data Settings

The data settings group covers browser-side backup and restore, WebDAV
connection placeholders, and JSON export. Static mode can export local UI
preferences, favorite/archive and metadata overrides, visibility settings, and
the current manifest. It does not back up source HTML/YAML files from disk.

WebDAV settings currently save only non-sensitive connection fields. Passwords
or app tokens should be handled by a future protected Agent Server.

## PWA Support

Build output includes `manifest.webmanifest` and `sw.js`, so supported browsers
can install HTML Vault as a PWA. The service worker caches the app shell and
visited content for faster reloads and basic offline access.

## Planned AI Modules

The AI knowledge assistant section is a UI scaffold for future bulk operations
over the knowledge database, such as reclassification, retagging, and review
status updates. Submitting it currently shows a second confirmation and then a
development-in-progress message without changing data.

The global AI sidebar is the future home for context-aware chat and HTML note
generation. It is UI-only for now: no model request is sent, and note creation
still requires a future Agent Server.

## Docker

```bash
docker compose up --build
```

Then open `http://localhost:8080`.

## Development

```bash
pip install -e ".[dev]"
pytest
python tests/run_smoke.py
html-vault build --content examples/content --meta examples/meta --out public
```

## Security Notes

The current release is a static reader and does not execute uploaded files or
store API keys. Future Agent Server deployments must protect `/api/*`, block
SSRF-prone fetches, limit uploads, and keep LLM keys on the server.

## License

MIT
