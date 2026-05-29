FROM python:3.12-slim AS builder

WORKDIR /app
COPY . .
RUN pip install --no-cache-dir .
RUN html-vault build --content examples/content --meta examples/meta --out /site

FROM caddy:2-alpine
COPY --from=builder /site /usr/share/caddy
