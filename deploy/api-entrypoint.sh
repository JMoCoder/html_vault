#!/bin/sh
set -eu

CONTENT_DIR="${HTML_LORE_CONTENT:-/data/content}"
META_DIR="${HTML_LORE_META:-/data/meta}"
PUBLIC_DIR="${HTML_LORE_PUBLIC:-/public}"
SITE_TITLE="${HTML_LORE_TITLE:-HTMlore}"
USER_DATA_DIR="${HTML_LORE_USER_DATA_DIR:-/data/users}"

mkdir -p "$CONTENT_DIR" "$META_DIR/items" "$META_DIR/config" "$PUBLIC_DIR" "$USER_DATA_DIR"

if [ "$#" -gt 0 ]; then
  exec "$@"
fi

html-lore build \
  --content "$CONTENT_DIR" \
  --meta "$META_DIR" \
  --out "$PUBLIC_DIR" \
  --title "$SITE_TITLE"

cat > "$PUBLIC_DIR/config.js" <<'EOF'
window.HTML_LORE_AGENT_URL = window.location.origin;
window.HTML_LORE_AGENT_TOKEN = "";
EOF

exec html-lore serve-api --host 0.0.0.0 --port 8787
