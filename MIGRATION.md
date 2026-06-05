# HTMlore Migration Guide

This guide covers migration from the former `HTML Vault` / `html_vault`
project naming to `HTMlore` / `html_lore`.

Current releases no longer keep the old runtime compatibility shims. Complete
the CLI, Python import, and environment-variable rename before deploying the
current code.

## Who Needs This

Use this guide if your deployment or local clone was created before `0.6.7`,
when the project was still named `HTML Vault`.

If you start from a fresh clone of `JMoCoder/html_lore`, use the README instead.

## What Changed

- Public brand: `HTML Vault` -> `HTMlore`
- GitHub repository: `JMoCoder/html_vault` -> `JMoCoder/html_lore`
- Preferred CLI: `html-vault` -> `html-lore`
- Preferred Python package: `html_vault` -> `html_lore`
- Preferred env prefix: `HTML_VAULT_*` -> `HTML_LORE_*`
- Browser preference prefix: `html-vault-*` -> `html-lore-*`
- Backup type: `html-vault-backup` -> `html-lore-backup`

## Compatibility Cleanup

Older `0.7.x` releases temporarily accepted old CLI commands, Python imports,
and `HTML_VAULT_*` environment variables. Current code keeps the renamed
HTMlore runtime path only. New work must use the new names.

Browser preference and backup migration remains intentionally conservative so
old local preferences can still be recovered by the web app.

## Update An Existing Git Clone

After the GitHub repository has been renamed, update your local remote:

```bash
git remote set-url origin git@github.com:JMoCoder/html_lore.git
git fetch --all --tags
```

Then update your working tree:

```bash
git checkout main
git pull --ff-only
```

For development clones:

```bash
git checkout develop
git pull --ff-only
```

## Docker Upgrade

Back up first:

```bash
tar -czf "../html-lore-data-$(date +%Y%m%d-%H%M%S).tgz" data
```

Then update and rebuild:

```bash
git pull --ff-only
docker compose up -d --build
```

Your existing `./data` directory remains valid. User content, metadata,
`data/users.json`, and per-user directories under `data/users/<data_id>/` are
not renamed or moved.

## Environment Variables

New variables use `HTML_LORE_*`. Legacy `HTML_VAULT_*` variables should be
renamed before deploying current releases.

Recommended mapping:

| Old | New |
| --- | --- |
| `HTML_VAULT_TITLE` | `HTML_LORE_TITLE` |
| `HTML_VAULT_HTTP_PORT` | `HTML_LORE_HTTP_PORT` |
| `HTML_VAULT_CONTENT` | `HTML_LORE_CONTENT` |
| `HTML_VAULT_META` | `HTML_LORE_META` |
| `HTML_VAULT_PUBLIC` | `HTML_LORE_PUBLIC` |
| `HTML_VAULT_MAX_UPLOAD_BYTES` | `HTML_LORE_MAX_UPLOAD_BYTES` |
| `HTML_VAULT_API_TOKEN` | `HTML_LORE_API_TOKEN` |
| `HTML_VAULT_AUTH_USERNAME` | `HTML_LORE_AUTH_USERNAME` |
| `HTML_VAULT_AUTH_PASSWORD` | `HTML_LORE_AUTH_PASSWORD` |
| `HTML_VAULT_USERS_FILE` | `HTML_LORE_USERS_FILE` |
| `HTML_VAULT_USER_DATA_DIR` | `HTML_LORE_USER_DATA_DIR` |
| `HTML_VAULT_SESSION_SECRET` | `HTML_LORE_SESSION_SECRET` |
| `HTML_VAULT_SESSION_SECURE` | `HTML_LORE_SESSION_SECURE` |
| `HTML_VAULT_CORS_ORIGINS` | `HTML_LORE_CORS_ORIGINS` |
| `HTML_VAULT_PAGES_URL` | `HTML_LORE_PAGES_URL` |
| `HTML_VAULT_AGENT_URL` | `HTML_LORE_AGENT_URL` |
| `HTML_VAULT_AGENT_TOKEN` | `HTML_LORE_AGENT_TOKEN` |

If old and new variables are both present, current releases read only the new
`HTML_LORE_*` value.

## CLI Migration

Preferred:

```bash
html-lore build --content examples/content --meta examples/meta --out public
html-lore serve-api --host 127.0.0.1 --port 8787
html-lore user-add --username admin --password 'change-me' --replace
```

## Python Import Migration

Preferred:

```python
from html_lore.builder import build_site
from html_lore.server.app import create_app
```

## Browser Preferences

The frontend automatically copies old `html-vault-*` localStorage values to
new `html-lore-*` keys on startup. Old keys are not deleted.

## Backups

New exports use:

```text
html-lore-backup-YYYYMMDD.json
```

Imports still accept older `html-vault-backup` payloads.

## Verify After Upgrade

Open the app and check:

- Login works.
- Existing notes are visible.
- Importing an HTML file still rebuilds the library.
- Existing favorites, archive state, collections, and tags remain available.
- Settings > About shows the expected version.

For local development:

```bash
python3 -m pytest
npm run test:e2e
docker compose config
```

## Rollback

If you need to roll back:

```bash
git checkout v0.6.7
docker compose up -d --build
```

Because data paths were not renamed, `./data` remains usable. Always keep the
backup made before the upgrade until you confirm the deployment is healthy.
