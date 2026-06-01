from __future__ import annotations

from functools import lru_cache
from typing import Annotated

try:
    from fastapi import Depends, FastAPI, HTTPException, Query
    from fastapi.middleware.cors import CORSMiddleware
except ModuleNotFoundError as exc:  # pragma: no cover - import guard for static-only installs
    raise RuntimeError(
        "The backend server requires the agent extra: pip install 'html-vault[agent]'",
    ) from exc

from html_vault import __version__

from .config import ServerSettings, load_settings
from .items import ItemService, normalize_query


@lru_cache
def get_settings() -> ServerSettings:
    return load_settings()


def get_item_service(settings: Annotated[ServerSettings, Depends(get_settings)]) -> ItemService:
    return ItemService(settings)


def create_app() -> FastAPI:
    app = FastAPI(title="HTML Vault Agent Server", version=__version__)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=False,
        allow_methods=["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
        allow_headers=["*"],
    )

    @app.get("/api/health")
    def health() -> dict[str, str]:
        return {"status": "ok"}

    @app.get("/api/manifest")
    def manifest(service: Annotated[ItemService, Depends(get_item_service)]) -> dict:
        return service.manifest()

    @app.get("/api/items")
    def items(
        service: Annotated[ItemService, Depends(get_item_service)],
        q: str = "",
        library: str = "all",
        collection: str = "",
        tags: str = "",
        tag_match: str = "any",
        favorite: bool | None = None,
        archived: bool | None = None,
        sort: str = "newest",
        limit: Annotated[int | None, Query(gt=0, le=500)] = None,
    ) -> dict:
        query = normalize_query(
            q=q,
            library=library,
            collection=collection,
            tags=tags,
            tag_match=tag_match,
            favorite=favorite,
            archived=archived,
            sort=sort,
            limit=limit,
        )
        result = service.list_items(query)
        return {"items": result, "count": len(result)}

    @app.get("/api/items/{item_id:path}")
    def item(item_id: str, service: Annotated[ItemService, Depends(get_item_service)]) -> dict:
        found = service.get_item(item_id)
        if not found:
            raise HTTPException(status_code=404, detail="Item not found")
        return found

    return app


app = create_app()
