#!/bin/sh
set -eu

CONTENT_DIR="${HTML_VAULT_CONTENT:-/data/content}"
META_DIR="${HTML_VAULT_META:-/data/meta}"
PUBLIC_DIR="${HTML_VAULT_PUBLIC:-/public}"
SITE_TITLE="${HTML_VAULT_TITLE:-HTML Vault}"
USER_DATA_DIR="${HTML_VAULT_USER_DATA_DIR:-/data/users}"

mkdir -p "$CONTENT_DIR" "$META_DIR/items" "$META_DIR/config" "$PUBLIC_DIR" "$USER_DATA_DIR"

if [ "$#" -gt 0 ]; then
  exec "$@"
fi

html-vault build \
  --content "$CONTENT_DIR" \
  --meta "$META_DIR" \
  --out "$PUBLIC_DIR" \
  --title "$SITE_TITLE"

cat > "$PUBLIC_DIR/config.js" <<'EOF'
window.HTML_VAULT_AGENT_URL = window.location.origin;
window.HTML_VAULT_AGENT_TOKEN = "";
EOF

exec html-vault serve-api --host 0.0.0.0 --port 8787
