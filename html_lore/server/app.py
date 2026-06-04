from __future__ import annotations

from functools import lru_cache
from pathlib import Path
from typing import Annotated

try:
    from fastapi import Depends, FastAPI, File, Form, Header, HTTPException, Query, Request, Response, UploadFile
    from fastapi.middleware.cors import CORSMiddleware
    from fastapi.responses import FileResponse, HTMLResponse
except ModuleNotFoundError as exc:  # pragma: no cover - import guard for static-only installs
    raise RuntimeError(
        "The backend server requires the agent extra: pip install 'html-lore[agent]'",
    ) from exc

from html_lore import __version__

from .auth import current_user, login, logout, read_session, require_session, session_status
from .config import ServerSettings, load_settings
from .items import ItemContentError, ItemDeleteError, ItemMetadataError, ItemService, ItemStateError, normalize_query
from .jobs import JobError, JobService
from .navigation import NavigationConfigError, NavigationConfigService
from .uploads import UploadError, UploadService


@lru_cache
def get_settings() -> ServerSettings:
    return load_settings()


def get_request_settings(
    settings: Annotated[ServerSettings, Depends(get_settings)],
    request: Request,
) -> ServerSettings:
    user = read_session(settings, request) if settings.auth_enabled else None
    return settings.for_user(user.data_id) if user else settings


def get_item_service(settings: Annotated[ServerSettings, Depends(get_request_settings)]) -> ItemService:
    return ItemService(settings)


def get_upload_service(settings: Annotated[ServerSettings, Depends(get_request_settings)]) -> UploadService:
    return UploadService(settings)


def get_navigation_service(settings: Annotated[ServerSettings, Depends(get_request_settings)]) -> NavigationConfigService:
    return NavigationConfigService(settings)


def get_job_service(settings: Annotated[ServerSettings, Depends(get_request_settings)]) -> JobService:
    return JobService(settings)


def verify_api_token(
    settings: Annotated[ServerSettings, Depends(get_settings)],
    request: Request,
    authorization: Annotated[str, Header()] = "",
    access_token: str = "",
) -> None:
    if settings.api_token:
        scheme, _, token = authorization.partition(" ")
        if (scheme.lower() == "bearer" and token == settings.api_token) or access_token == settings.api_token:
            return
    if settings.auth_enabled:
        require_session(settings, request)
        return
    if not settings.api_token:
        return
    raise HTTPException(status_code=401, detail="API token or login session required.")


ApiAuth = Annotated[None, Depends(verify_api_token)]


def create_app() -> FastAPI:
    settings = get_settings()
    if settings.auth_enabled:
        from .users import UserStore

        UserStore(settings).ensure_bootstrap_admin()
    app = FastAPI(title="HTMlore API Server", version=__version__)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=list(settings.cors_origins),
        allow_credentials=False,
        allow_methods=["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
        allow_headers=["Authorization", "Content-Type"],
    )

    @app.get("/api/health")
    def health() -> dict[str, str]:
        return {"status": "ok"}

    @app.get("/api/auth/status")
    def auth_status(request: Request) -> dict:
        return session_status(settings, request)

    @app.post("/api/auth/login")
    def auth_login(values: dict, response: Response) -> dict:
        username = str(values.get("username", ""))
        password = str(values.get("password", ""))
        return login(settings, response, username=username, password=password)

    @app.post("/api/auth/logout")
    def auth_logout(response: Response) -> dict:
        return logout(settings, response)

    @app.get("/api/manifest")
    def manifest(_: ApiAuth, service: Annotated[ItemService, Depends(get_item_service)]) -> dict:
        return service.manifest()

    @app.get("/api/version")
    def version(_: ApiAuth) -> dict[str, str]:
        return {
            "version": __version__,
            "brand": "HTMlore",
            "repository": "JMoCoder/html_lore",
            "release_url": "https://github.com/JMoCoder/html_lore/releases",
        }

    @app.post("/api/rebuild")
    def rebuild(_: ApiAuth, service: Annotated[JobService, Depends(get_job_service)]) -> dict:
        try:
            return service.rebuild()
        except JobError as exc:
            raise HTTPException(status_code=500, detail=str(exc)) from exc

    @app.get("/api/rebuild/{job_id}")
    def rebuild_job(job_id: str, _: ApiAuth, service: Annotated[JobService, Depends(get_job_service)]) -> dict:
        try:
            job = service.get_job(job_id)
        except JobError as exc:
            raise HTTPException(status_code=404, detail=str(exc)) from exc
        if job.get("kind") != "rebuild":
            raise HTTPException(status_code=404, detail="Rebuild job not found.")
        return job

    @app.get("/api/items")
    def items(
        _: ApiAuth,
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

    @app.get("/api/search")
    def search(
        _: ApiAuth,
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
        return service.search_items(query)

    @app.get("/api/items/{item_id:path}/content", response_class=HTMLResponse)
    def item_content(item_id: str, _: ApiAuth, service: Annotated[ItemService, Depends(get_item_service)]) -> HTMLResponse:
        try:
            return HTMLResponse(service.read_item_content(item_id))
        except ItemContentError as exc:
            raise HTTPException(status_code=404, detail=str(exc)) from exc

    @app.get("/api/items/{item_id:path}/raw", response_class=HTMLResponse)
    def item_raw(item_id: str, _: ApiAuth, service: Annotated[ItemService, Depends(get_item_service)]) -> HTMLResponse:
        try:
            return HTMLResponse(service.read_item_content(item_id))
        except ItemContentError as exc:
            raise HTTPException(status_code=404, detail=str(exc)) from exc

    @app.get("/api/navigation")
    def navigation(_: ApiAuth, service: Annotated[NavigationConfigService, Depends(get_navigation_service)]) -> dict:
        try:
            return service.get_config()
        except NavigationConfigError as exc:
            raise HTTPException(status_code=400, detail=str(exc)) from exc

    @app.put("/api/navigation")
    def update_navigation(values: dict, _: ApiAuth, service: Annotated[NavigationConfigService, Depends(get_navigation_service)]) -> dict:
        try:
            return service.update_config(values)
        except NavigationConfigError as exc:
            raise HTTPException(status_code=400, detail=str(exc)) from exc

    @app.patch("/api/items/{item_id:path}/metadata")
    def update_item_metadata(item_id: str, values: dict, _: ApiAuth, service: Annotated[ItemService, Depends(get_item_service)]) -> dict:
        try:
            return service.update_item_metadata(item_id, values)
        except ItemMetadataError as exc:
            message = str(exc)
            status = 404 if message == "Item not found." else 400
            raise HTTPException(status_code=status, detail=message) from exc

    @app.patch("/api/items/{item_id:path}/state")
    def update_item_state(item_id: str, values: dict, _: ApiAuth, service: Annotated[ItemService, Depends(get_item_service)]) -> dict:
        try:
            return service.update_item_state(item_id, values)
        except ItemStateError as exc:
            message = str(exc)
            status = 404 if message == "Item not found." else 400
            raise HTTPException(status_code=status, detail=message) from exc

    @app.get("/api/items/{item_id:path}")
    def item(item_id: str, _: ApiAuth, service: Annotated[ItemService, Depends(get_item_service)]) -> dict:
        found = service.get_item(item_id)
        if not found:
            raise HTTPException(status_code=404, detail="Item not found")
        return found

    @app.delete("/api/items/{item_id:path}")
    def delete_item(item_id: str, _: ApiAuth, service: Annotated[ItemService, Depends(get_item_service)]) -> dict:
        try:
            return service.delete_item(item_id)
        except ItemDeleteError as exc:
            message = str(exc)
            status = 404 if message == "Item not found." else 400
            raise HTTPException(status_code=status, detail=message) from exc

    @app.get("/api/uploads/{upload_id}")
    def upload_status(upload_id: str, _: ApiAuth, service: Annotated[JobService, Depends(get_job_service)]) -> dict:
        try:
            return service.get_upload(upload_id)
        except JobError as exc:
            raise HTTPException(status_code=404, detail=str(exc)) from exc

    @app.post("/api/uploads/html")
    async def upload_html(
        _: ApiAuth,
        service: Annotated[UploadService, Depends(get_upload_service)],
        jobs: Annotated[JobService, Depends(get_job_service)],
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
        job = jobs.record_upload(upload_id=result.upload_id, item_id=result.item_id, status=result.status)
        return {
            "upload_id": result.upload_id,
            "job_id": job["job_id"],
            "item_id": result.item_id,
            "status": result.status,
            "item": result.item,
        }

    if settings.public_dir.exists():
        @app.get("/{path:path}")
        def static_file(path: str, request: Request) -> FileResponse:
            return serve_static(settings, request, path)

    return app


app = create_app()


def serve_static(settings: ServerSettings, request: Request, path: str) -> FileResponse:
    relative_path = Path(path or "index.html")
    if static_requires_auth(relative_path):
        user = read_session(settings, request) if settings.auth_enabled else None
        active_settings = settings.for_user(user.data_id) if user else settings
    else:
        active_settings = settings
    public_dir = active_settings.public_dir.resolve()
    requested = (public_dir / relative_path).resolve()
    if requested.is_dir():
        requested = (requested / "index.html").resolve()
    if public_dir not in requested.parents and requested != public_dir:
        raise HTTPException(status_code=404, detail="File not found.")
    if not requested.exists() or not requested.is_file():
        raise HTTPException(status_code=404, detail="File not found.")
    if static_requires_auth(requested.relative_to(public_dir)):
        require_session(settings, request)
    return FileResponse(requested)


def static_requires_auth(path: Path) -> bool:
    parts = path.parts
    if not parts:
        return False
    if parts[0] == "content":
        return True
    if path.name == "manifest.json":
        return True
    return False
