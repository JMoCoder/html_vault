# Architecture

HTML Vault 0.1 is split into a static build layer and a static browser layer.

## Build Layer

`html_vault.builder.build_site` copies the static app, copies HTML content, and
writes `manifest.json`.

`html_vault.manifest.build_manifest` scans `content/**/*.html`, extracts basic
HTML metadata, applies sidecar YAML overrides from `meta/items/**/*.yml`, and
emits Manifest v2:

- `version`
- `generated_at`
- `site`
- `items`
- `collections`
- `tags`

The database is not a knowledge source. HTML files and YAML metadata remain the
durable assets.

## Browser Layer

`app_static/` is framework-free HTML, CSS, and JavaScript. It loads
`manifest.json`, renders a sidebar and card grid, filters locally, and opens
selected items inside an iframe reader.

The new-item card is already shaped for the optional Agent Server but does not
require it. Without `window.HTML_VAULT_AGENT_URL`, the app remains fully static.

## Next Agent Layer

The intended Agent Server is optional. It should create generation jobs, write
HTML notes to `content/generated/`, write sidecar metadata to `meta/items/`,
and trigger a static rebuild. SQLite may store job status, but never the only
copy of knowledge content.
