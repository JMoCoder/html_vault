from __future__ import annotations

import uuid
from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Any

from html_lore.server.config import ServerSettings

from .html_generation import GenerationSpec, HtmlGenerationError, generate_note_from_conversation
from .retrieval import extract_safe_text


class MaterialGenerationError(ValueError):
    def __init__(self, message: str, *, run: dict[str, Any] | None = None) -> None:
        super().__init__(message)
        self.run = run


@dataclass(frozen=True)
class ParsedMaterial:
    title: str
    text: str
    material_type: str

    def as_dict(self) -> dict[str, Any]:
        return {
            "title": self.title,
            "text": self.text,
            "material_type": self.material_type,
        }


def generate_note_from_material(
    *,
    settings: ServerSettings,
    filename: str,
    content: bytes,
    instruction: str,
    spec: GenerationSpec,
) -> dict[str, Any]:
    started_at = datetime.now(timezone.utc)
    try:
        material = parse_material(filename=filename, content=content, max_bytes=settings.max_upload_bytes)
    except MaterialGenerationError as exc:
        raise MaterialGenerationError(
            str(exc),
            run=failed_material_run(
                filename=filename,
                material=None,
                started_at=started_at,
                message=str(exc),
                code="material_parse_failed",
            ),
        ) from exc
    task = instruction.strip() or "Generate an HTML knowledge note from the uploaded material."
    conversation = material_conversation(material, task)
    try:
        result = generate_note_from_conversation(settings=settings, conversation=conversation, spec=spec)
    except HtmlGenerationError as exc:
        if exc.run:
            exc.run["kind"] = "material_html_generation"
            exc.run["material"] = material_summary(material)
        raise
    result["run"]["kind"] = "material_html_generation"
    result["run"]["material"] = material_summary(material)
    return result


def material_summary(material: ParsedMaterial) -> dict[str, Any]:
    return {
        "title": material.title,
        "material_type": material.material_type,
        "text_chars": len(material.text),
    }


def failed_material_run(*, filename: str, material: ParsedMaterial | None, started_at: datetime, message: str, code: str) -> dict[str, Any]:
    completed_at = datetime.now(timezone.utc)
    material_info = material_summary(material) if material else {
        "title": title_from_filename(filename or "material"),
        "material_type": material_type_from_filename(filename),
        "text_chars": 0,
    }
    return {
        "id": f"material_{uuid.uuid4().hex}",
        "kind": "material_html_generation",
        "status": "failed",
        "started_at": started_at.isoformat(),
        "completed_at": completed_at.isoformat(),
        "duration_ms": int((completed_at - started_at).total_seconds() * 1000),
        "conversation_id": "",
        "spec": {},
        "graph": "MaterialToHtmlGraph.beta",
        "generation_intent": {},
        "qa_report": {},
        "review_decision": {},
        "node_trace": [{"node": "MaterialParseNode", "status": "failed"}],
        "usage": {},
        "error": {"code": code, "message": message},
        "material": material_info,
        "item_id": "",
    }


def parse_material(*, filename: str, content: bytes, max_bytes: int) -> ParsedMaterial:
    if not content:
        raise MaterialGenerationError("Uploaded material is empty.")
    if len(content) > max_bytes:
        raise MaterialGenerationError("Uploaded material exceeds the configured size limit.")
    if b"\x00" in content[:1024]:
        raise MaterialGenerationError("Uploaded material does not look like text.")
    name = filename.strip() or "material.txt"
    lowered = name.lower()
    text = content.decode("utf-8", errors="replace")
    if lowered.endswith((".html", ".htm")):
        safe_text = extract_safe_text(text)
        material_type = "html"
    elif lowered.endswith((".md", ".markdown")):
        safe_text = normalize_text(text)
        material_type = "markdown"
    elif lowered.endswith((".txt", ".text")):
        safe_text = normalize_text(text)
        material_type = "text"
    else:
        raise MaterialGenerationError("Only HTML, Markdown, and plain text materials are supported in this beta.")
    if not safe_text:
        raise MaterialGenerationError("Uploaded material does not contain readable text.")
    return ParsedMaterial(title=title_from_filename(name), text=safe_text[:12000], material_type=material_type)


def material_conversation(material: ParsedMaterial, instruction: str) -> dict[str, Any]:
    return {
        "id": f"material_{uuid.uuid4().hex}",
        "context_snapshot": {
            "source_mode": "local_only",
            "scope": "material",
            "item_ids": [],
            "item_count": 0,
            "items": [],
            "requested": {
                "material_type": material.material_type,
                "material_title": material.title,
            },
        },
        "messages": [
            {
                "role": "user",
                "content": f"USER_TASK:\n{instruction}\n\nUNTRUSTED_SOURCE_CONTENT:\n{material.text}",
            },
            {
                "role": "assistant",
                "content": f"Prepared a content brief from uploaded {material.material_type} material: {material.title}.",
            },
        ],
    }


def title_from_filename(filename: str) -> str:
    stem = filename.rsplit("/", 1)[-1].rsplit("\\", 1)[-1]
    if "." in stem:
        stem = stem.rsplit(".", 1)[0]
    return normalize_text(stem.replace("-", " ").replace("_", " ")) or "Uploaded material"


def material_type_from_filename(filename: str) -> str:
    lowered = (filename or "").lower()
    if lowered.endswith((".html", ".htm")):
        return "html"
    if lowered.endswith((".md", ".markdown")):
        return "markdown"
    if lowered.endswith((".txt", ".text")):
        return "text"
    return "unknown"


def normalize_text(value: str) -> str:
    return " ".join(str(value or "").split())
