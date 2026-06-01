from __future__ import annotations

from functools import lru_cache
from typing import Annotated

try:
    from fastapi import Depends, FastAPI, File, Form, HTTPException, Query, UploadFile
    from fastapi.middleware.cors import CORSMiddleware
    from fastapi.responses import HTMLResponse
except ModuleNotFoundError as exc:  # pragma: no cover - import guard for static-only installs
    raise RuntimeError(
        "The backend server requires the agent extra: pip install 'html-vault[agent]'",
    ) from exc

from html_vault import __version__

from .config import ServerSettings, load_settings
from .items import ItemContentError, ItemDeleteError, ItemMetadataError, ItemService, ItemStateError, normalize_query
from .navigation import NavigationConfigError, NavigationConfigService
from .uploads import UploadError, UploadService


@lru_cache
def get_settings() -> ServerSettings:
    return load_settings()


def get_item_service(settings: Annotated[ServerSettings, Depends(get_settings)]) -> ItemService:
    return ItemService(settings)


def get_upload_service(settings: Annotated[ServerSettings, Depends(get_settings)]) -> UploadService:
    return UploadService(settings)


def get_navigation_service(settings: Annotated[ServerSettings, Depends(get_settings)]) -> NavigationConfigService:
    return NavigationConfigService(settings)


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

    @app.get("/api/items/{item_id:path}/content", response_class=HTMLResponse)
    def item_content(item_id: str, service: Annotated[ItemService, Depends(get_item_service)]) -> HTMLResponse:
        try:
            return HTMLResponse(service.read_item_content(item_id))
        except ItemContentError as exc:
            raise HTTPException(status_code=404, detail=str(exc)) from exc

    @app.get("/api/items/{item_id:path}/raw", response_class=HTMLResponse)
    def item_raw(item_id: str, service: Annotated[ItemService, Depends(get_item_service)]) -> HTMLResponse:
        try:
            return HTMLResponse(service.read_item_content(item_id))
        except ItemContentError as exc:
            raise HTTPException(status_code=404, detail=str(exc)) from exc

    @app.get("/api/navigation")
    def navigation(service: Annotated[NavigationConfigService, Depends(get_navigation_service)]) -> dict:
        try:
            return service.get_config()
        except NavigationConfigError as exc:
            raise HTTPException(status_code=400, detail=str(exc)) from exc

    @app.put("/api/navigation")
    def update_navigation(values: dict, service: Annotated[NavigationConfigService, Depends(get_navigation_service)]) -> dict:
        try:
            return service.update_config(values)
        except NavigationConfigError as exc:
            raise HTTPException(status_code=400, detail=str(exc)) from exc

    @app.patch("/api/items/{item_id:path}/metadata")
    def update_item_metadata(item_id: str, values: dict, service: Annotated[ItemService, Depends(get_item_service)]) -> dict:
        try:
            return service.update_item_metadata(item_id, values)
        except ItemMetadataError as exc:
            message = str(exc)
            status = 404 if message == "Item not found." else 400
            raise HTTPException(status_code=status, detail=message) from exc

    @app.patch("/api/items/{item_id:path}/state")
    def update_item_state(item_id: str, values: dict, service: Annotated[ItemService, Depends(get_item_service)]) -> dict:
        try:
            return service.update_item_state(item_id, values)
        except ItemStateError as exc:
            message = str(exc)
            status = 404 if message == "Item not found." else 400
            raise HTTPException(status_code=status, detail=message) from exc

    @app.get("/api/items/{item_id:path}")
    def item(item_id: str, service: Annotated[ItemService, Depends(get_item_service)]) -> dict:
        found = service.get_item(item_id)
        if not found:
            raise HTTPException(status_code=404, detail="Item not found")
        return found

    @app.delete("/api/items/{item_id:path}")
    def delete_item(item_id: str, service: Annotated[ItemService, Depends(get_item_service)]) -> dict:
        try:
            return service.delete_item(item_id)
        except ItemDeleteError as exc:
            message = str(exc)
            status = 404 if message == "Item not found." else 400
            raise HTTPException(status_code=status, detail=message) from exc

    @app.post("/api/uploads/html")
    async def upload_html(
        service: Annotated[UploadService, Depends(get_upload_service)],
        file: Annotated[UploadFile, File()],
        title: Annotated[str, Form()] = "",
        summary: Annotated[str, Form()] = "",
        collection: Annotated[str, Form()] = "",
        tags: Annotated[str, Form()] = "",
    ) -> dict:
        content = await file.read()
        try:
            result = service.import_html(
                filename=file.filename or "imported-note.html",
                content=content,
                title=title,
                summary=summary,
                collection=collection,
                tags=tags,
            )
        except UploadError as exc:
            raise HTTPException(status_code=400, detail=str(exc)) from exc
        return {
            "upload_id": result.upload_id,
            "item_id": result.item_id,
            "status": result.status,
            "item": result.item,
        }

    return app


app = create_app()
