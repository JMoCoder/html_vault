import json
import shutil
from pathlib import Path

import pytest

from html_vault.server.config import ServerSettings
from html_vault.server.jobs import JobError, JobService
from tests.api_server import run_api_server


ROOT = Path(__file__).resolve().parents[1]


def copy_fixture_tree(tmp_path: Path) -> tuple[Path, Path, Path]:
    content_dir = tmp_path / "content"
    meta_dir = tmp_path / "meta"
    public_dir = tmp_path / "public"
    shutil.copytree(ROOT / "examples" / "content", content_dir)
    shutil.copytree(ROOT / "examples" / "meta", meta_dir)
    return content_dir, meta_dir, public_dir


def test_job_service_rebuild_persists_status(tmp_path: Path) -> None:
    content_dir, meta_dir, public_dir = copy_fixture_tree(tmp_path)
    service = JobService(
        ServerSettings(
            content_dir=content_dir,
            meta_dir=meta_dir,
            public_dir=public_dir,
            site_title="Job Test",
            max_upload_bytes=1024 * 1024,
        ),
    )

    job = service.rebuild()
    stored = service.get_job(job["job_id"])
    jobs_file = meta_dir / "config" / "jobs.json"

    assert job["kind"] == "rebuild"
    assert job["status"] == "completed"
    assert stored == job
    assert jobs_file.exists()
    assert json.loads(jobs_file.read_text(encoding="utf-8"))[job["job_id"]] == job
    assert (public_dir / "manifest.json").exists()


def test_job_service_missing_job_errors(tmp_path: Path) -> None:
    content_dir, meta_dir, public_dir = copy_fixture_tree(tmp_path)
    service = JobService(
        ServerSettings(
            content_dir=content_dir,
            meta_dir=meta_dir,
            public_dir=public_dir,
            site_title="Job Test",
            max_upload_bytes=1024 * 1024,
        ),
    )

    with pytest.raises(JobError):
        service.get_job("missing")


def test_rebuild_api_returns_queryable_job(tmp_path: Path) -> None:
    content_dir, meta_dir, public_dir = copy_fixture_tree(tmp_path)
    server = run_api_server(content_dir=content_dir, meta_dir=meta_dir, public_dir=public_dir, site_title="Rebuild API Test")
    try:
        job = server.request("POST", "/api/rebuild")
        queried = server.request("GET", f"/api/rebuild/{job['job_id']}")

        assert job["kind"] == "rebuild"
        assert job["status"] == "completed"
        assert queried == job
        assert (public_dir / "manifest.json").exists()
    finally:
        server.close()
