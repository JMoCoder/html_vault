from __future__ import annotations

import json
import os
import socket
import subprocess
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Any


def free_port() -> int:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.bind(("127.0.0.1", 0))
        return int(sock.getsockname()[1])


class ApiServer:
    def __init__(self, *, content_dir: Path, meta_dir: Path, public_dir: Path, site_title: str = "Test Vault") -> None:
        self.port = free_port()
        env = os.environ.copy()
        env.update(
            {
                "HTML_VAULT_CONTENT": str(content_dir),
                "HTML_VAULT_META": str(meta_dir),
                "HTML_VAULT_PUBLIC": str(public_dir),
                "HTML_VAULT_TITLE": site_title,
            },
        )
        self.process = subprocess.Popen(
            [
                sys.executable,
                "-m",
                "uvicorn",
                "html_vault.server.app:app",
                "--host",
                "127.0.0.1",
                "--port",
                str(self.port),
                "--log-level",
                "warning",
            ],
            cwd=Path(__file__).resolve().parents[1],
            env=env,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
        )
        self.wait_until_ready()

    def close(self) -> None:
        self.process.terminate()
        try:
            self.process.wait(timeout=5)
        except subprocess.TimeoutExpired:
            self.process.kill()
            self.process.wait(timeout=5)

    def wait_until_ready(self) -> None:
        deadline = time.time() + 10
        while time.time() < deadline:
            if self.process.poll() is not None:
                stdout, stderr = self.process.communicate()
                raise RuntimeError(f"API server exited early.\nstdout:\n{stdout}\nstderr:\n{stderr}")
            try:
                response = self.request("GET", "/api/health")
                if response["status"] == "ok":
                    return
            except (urllib.error.URLError, json.JSONDecodeError):
                time.sleep(0.1)
        raise RuntimeError("Timed out waiting for API server.")

    def request(self, method: str, path: str, *, query: dict[str, str] | None = None, body: bytes | None = None, headers: dict[str, str] | None = None) -> Any:
        url = f"http://127.0.0.1:{self.port}{path}"
        if query:
            url = f"{url}?{urllib.parse.urlencode(query)}"
        request = urllib.request.Request(url, data=body, method=method, headers=headers or {})
        with urllib.request.urlopen(request, timeout=5) as response:
            return json.loads(response.read().decode("utf-8"))

    def multipart(self, path: str, *, fields: dict[str, str], file_field: str, filename: str, content: bytes, content_type: str) -> Any:
        boundary = "----html-vault-test-boundary"
        chunks: list[bytes] = []
        for name, value in fields.items():
            chunks.extend(
                [
                    f"--{boundary}\r\n".encode("utf-8"),
                    f'Content-Disposition: form-data; name="{name}"\r\n\r\n'.encode("utf-8"),
                    value.encode("utf-8"),
                    b"\r\n",
                ],
            )
        chunks.extend(
            [
                f"--{boundary}\r\n".encode("utf-8"),
                f'Content-Disposition: form-data; name="{file_field}"; filename="{filename}"\r\n'.encode("utf-8"),
                f"Content-Type: {content_type}\r\n\r\n".encode("utf-8"),
                content,
                b"\r\n",
                f"--{boundary}--\r\n".encode("utf-8"),
            ],
        )
        body = b"".join(chunks)
        return self.request(
            "POST",
            path,
            body=body,
            headers={
                "Content-Type": f"multipart/form-data; boundary={boundary}",
                "Content-Length": str(len(body)),
            },
        )


def run_api_server(*, content_dir: Path, meta_dir: Path, public_dir: Path, site_title: str = "Test Vault") -> ApiServer:
    return ApiServer(content_dir=content_dir, meta_dir=meta_dir, public_dir=public_dir, site_title=site_title)
