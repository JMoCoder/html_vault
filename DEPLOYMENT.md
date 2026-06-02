# HTML Vault Deployment Baseline

Languages: [English](DEPLOYMENT.md) | [中文](DEPLOYMENT.zh-CN.md)

This document defines reusable project-level deployment and security measures.
It is not a VPS hardening checklist; each host still needs normal OS, firewall,
SSH, TLS, and backup hardening.

## Environment Roles

- `main`: stable production branch.
- `develop`: active development and test branch.
- Local workstation: development and local notebook testing.
- VPS: production runtime plus real-world validation.
- `data/`: private notebook data, not committed to Git.

## Minimal Production Security

Do not expose the backend API directly to the public internet without an
authentication boundary.

Required project-level controls:

- Set `HTML_VAULT_API_TOKEN` for the backend API.
- Set `HTML_VAULT_CORS_ORIGINS` to the exact public frontend origin.
- Put the static frontend and API behind HTTPS.
- Prefer reverse-proxy authentication for the whole site.
- Keep `data/content`, `data/meta`, and backups outside the Git repository.
- Keep API keys and future model credentials on the server only.
- Limit upload size with `HTML_VAULT_MAX_UPLOAD_BYTES`.
- Back up `data/` before deploys and before schema-changing upgrades.

## Backend Environment

```bash
HTML_VAULT_CONTENT=/srv/html-vault/data/content
HTML_VAULT_META=/srv/html-vault/data/meta
HTML_VAULT_PUBLIC=/srv/html-vault/public
HTML_VAULT_TITLE="HTML Vault"
HTML_VAULT_MAX_UPLOAD_BYTES=10485760
HTML_VAULT_API_TOKEN="replace-with-a-long-random-token"
HTML_VAULT_CORS_ORIGINS="https://vault.example.com"
```

Run the backend only on localhost or a private network address:

```bash
html-vault serve-api --host 127.0.0.1 --port 8787
```

## Frontend Token

For local testing, the frontend can read:

```html
<script>
  window.HTML_VAULT_AGENT_URL = "https://vault.example.com";
  window.HTML_VAULT_AGENT_TOKEN = "replace-with-a-long-random-token";
</script>
```

The frontend also reads `localStorage.html-vault-agent-token` for development.
For production, prefer reverse-proxy login/session protection over exposing a
long-lived token in frontend HTML. Query-token support exists for iframe/raw
HTML access compatibility and should not be the only public security boundary.

## Reverse Proxy Boundary

Recommended production layout:

```text
Browser
  -> HTTPS reverse proxy with login/session
    -> static public/ frontend
    -> /api/* reverse proxy to 127.0.0.1:8787
```

The reverse proxy should:

- terminate TLS;
- require login before serving the app;
- forward only intended paths;
- set upload body limits;
- avoid logging Authorization headers or query tokens.

## Deployment Flow

1. Develop and test on `develop`.
2. Run full tests locally.
3. Merge `develop` into `main` for production release.
4. Pull `main` on the VPS.
5. Back up `/srv/html-vault/data`.
6. Rebuild `public`.
7. Restart the backend service.
8. Verify login, upload, search, read, archive, and backup.

## Data Policy

`data/` is private runtime state. It should be backed up, not pushed to GitHub.
Recommended production data paths:

```text
/srv/html-vault/data/content
/srv/html-vault/data/meta
/srv/html-vault/backups
```

Git stores application code, tests, and docs only.
