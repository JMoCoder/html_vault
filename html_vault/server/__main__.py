from __future__ import annotations

import uvicorn


def main() -> None:
    uvicorn.run("html_vault.server.app:app", host="127.0.0.1", port=8787, reload=False)


if __name__ == "__main__":
    main()
