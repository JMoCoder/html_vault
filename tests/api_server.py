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
from http.cookiejar import CookieJar
from pathlib import Path
from typing import Any


def free_port() -> int:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.bind(("127.0.0.1", 0))
        return int(sock.getsockname()[1])


class ApiServer:
    def __init__(
        self,
        *,
        content_dir: Path,
        meta_dir: Path,
        public_dir: Path,
        site_title: str = "Test Vault",
        api_token: str = "",
        auth_username: str = "",
        auth_password: str = "",
        session_secret: str = "",
    ) -> None:
        self.port = free_port()
        self.api_token = api_token
        self.cookie_jar = CookieJar()
        self.opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(self.cookie_jar))
        env = os.environ.copy()
        env.update(
            {
                "HTML_VAULT_CONTENT": str(content_dir),
                "HTML_VAULT_META": str(meta_dir),
                "HTML_VAULT_PUBLIC": str(public_dir),
                "HTML_VAULT_TITLE": site_title,
                "HTML_VAULT_API_TOKEN": api_token,
                "HTML_VAULT_AUTH_USERNAME": auth_username,
                "HTML_VAULT_AUTH_PASSWORD": auth_password,
                "HTML_VAULT_SESSION_SECRET": session_secret,
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
        return json.loads(self.request_text(method, path, query=query, body=body, headers=headers))

    def json(self, method: str, path: str, data: Any) -> Any:
        body = json.dumps(data).encode("utf-8")
        return self.request(
            method,
            path,
            body=body,
            headers={
                "Content-Type": "application/json",
                "Content-Length": str(len(body)),
            },
        )

    def json_error(self, method: str, path: str, data: Any) -> tuple[int, Any]:
        body = json.dumps(data).encode("utf-8")
        try:
            self.request(
                method,
                path,
                body=body,
                headers={
                    "Content-Type": "application/json",
                    "Content-Length": str(len(body)),
                },
            )
        except urllib.error.HTTPError as exc:
            return exc.code, json.loads(exc.read().decode("utf-8"))
        raise AssertionError("Expected HTTP error response.")

    def request_text(self, method: str, path: str, *, query: dict[str, str] | None = None, body: bytes | None = None, headers: dict[str, str] | None = None) -> str:
        url = f"http://127.0.0.1:{self.port}{path}"
        if query:
            url = f"{url}?{urllib.parse.urlencode(query)}"
        request_headers = dict(headers or {})
        if self.api_token and "Authorization" not in request_headers:
            request_headers["Authorization"] = f"Bearer {self.api_token}"
        request = urllib.request.Request(url, data=body, method=method, headers=request_headers)
        with self.opener.open(request, timeout=5) as response:
            return response.read().decode("utf-8")

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


def run_api_server(
    *,
    content_dir: Path,
    meta_dir: Path,
    public_dir: Path,
    site_title: str = "Test Vault",
    api_token: str = "",
    auth_username: str = "",
    auth_password: str = "",
    session_secret: str = "",
) -> ApiServer:
    return ApiServer(
        content_dir=content_dir,
        meta_dir=meta_dir,
        public_dir=public_dir,
        site_title=site_title,
        api_token=api_token,
        auth_username=auth_username,
        auth_password=auth_password,
        session_secret=session_secret,
    )
