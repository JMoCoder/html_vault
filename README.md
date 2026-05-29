# HTML Vault

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
- Reader pane with iframe mode, original-open action, and hash links.
- Pinned new knowledge item entry with optional Agent Server API handoff.
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
