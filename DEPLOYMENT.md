# HTML Vault Deployment Baseline

Languages: [English](DEPLOYMENT.md) | [中文](DEPLOYMENT.zh-CN.md)

This document defines reusable project-level deployment and security measures.
It is not a host hardening checklist; each self-hosted machine still needs
normal OS, firewall, SSH or local access, TLS when public, and backup
hardening.

## Environment Roles

- `main`: stable production branch.
- `develop`: active development and test branch.
- Local workstation: development and local notebook testing.
- Self-hosted Docker host: local computer, NAS, LAN server, or VPS running the
  long-lived notebook service. A local computer deployment does not need to be
  online 24/7 unless you want continuous remote access.
- `data/`: private notebook data, not committed to Git.

## Minimal Production Security

Do not expose the backend API directly to the public internet without an
authentication boundary.

Required project-level controls:

- Set `HTML_VAULT_API_TOKEN` for the backend API.
- Set `HTML_VAULT_CORS_ORIGINS` to the exact public frontend origin.
- Put the static frontend and API behind HTTPS.
- Use reverse-proxy authentication for the whole site. Configure this with your
  preferred public deployment stack.
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

The default Docker compose mounts those paths inside the app container as
`/data/content`, `/data/meta`, and `/public`; host-side directories remain
`./data/...` and `./public` relative to the checked-out repository unless you
change the compose file.

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

The default Docker deployment serves both the frontend and `/api/*` from the
single app container. Public deployments should put that container behind your
preferred HTTPS/authentication boundary.

The optional `deploy/caddy-basic-auth.Caddyfile` implements one possible public
deployment shape:

```text
Browser -> Caddy :80 with Basic Auth -> public/ static files
Browser -> Caddy :80 with Basic Auth -> /api/* -> api:8787
```

Caddy asks users to log in before serving the app, then injects
`Authorization: Bearer {$HTML_VAULT_API_TOKEN}` only when proxying to the
internal API service. The browser does not need to store or see the long-lived
backend token.

## Self-Hosted Docker Deployment

On a fresh host:

```bash
git clone https://github.com/JMoCoder/html_vault.git /srv/html-vault
cd /srv/html-vault
git checkout main
docker compose up -d --build
```

Open `http://localhost:8080` or `http://your-host-ip:8080`.

The first start creates `data/content`, `data/meta`, and `public` bind-mounted
directories if they do not already exist. Uploaded HTML files are stored under
`data/content`, metadata under `data/meta`, and rebuilt static assets under
`public`.

For public internet deployment, do not expose the default compose stack without
an authentication boundary. You can use your own reverse proxy, or the optional
Caddy Basic Auth example:

```bash
cp .env.secure.example .env
python3 - <<'PY'
import secrets
print("HTML_VAULT_API_TOKEN=" + secrets.token_urlsafe(32))
PY
docker run --rm caddy:2-alpine caddy hash-password --plaintext 'change-this-login-password'
```

Edit `.env`, paste the generated token, paste the Caddy password hash, and set
`HTML_VAULT_CORS_ORIGINS` to your public origin. Caddy password hashes contain
`$`; in `.env`, escape every `$` as `$$`. For example, `$2a$14$...` must be
pasted as `$$2a$$14$$...`.

Then run:

```bash
docker compose up -d --build
```

## Production Updates

HTML Vault does not auto-update the host. `GET /api/version` and the frontend
About page only show update hints.

Manual update flow:

```bash
cd /srv/html-vault
git fetch origin
git checkout main
git pull --ff-only
tar -czf "../html-vault-data-$(date +%Y%m%d-%H%M%S).tgz" data
docker compose up -d --build
docker compose logs -f
```

If a release has a data migration note, back up `data/` before running the new
containers. Rollback means checking out the previous Git tag or commit and
restarting the compose stack; restore the matching `data/` backup if the release
changed data structure.

## Deployment Flow

1. Develop and test on `develop`.
2. Run full tests locally.
3. Merge `develop` into `main` for production release.
4. Pull `main` on the self-hosted Docker host.
5. Back up `/srv/html-vault/data`.
6. Rebuild/recreate containers with `docker compose up -d --build`.
7. Verify login, upload, search, read, archive, version display, and backup.

## Data Policy

`data/` is private runtime state. It should be backed up, not pushed to GitHub.
Recommended production data paths:

```text
/srv/html-vault/data/content
/srv/html-vault/data/meta
/srv/html-vault/backups
```

Git stores application code, tests, and docs only.
