from __future__ import annotations

import uuid
from dataclasses import dataclass
from typing import Any

from html_lore.server.config import ServerSettings

from .html_generation import GenerationSpec, generate_note_from_conversation
from .retrieval import extract_safe_text


class MaterialGenerationError(ValueError):
    pass


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
    material = parse_material(filename=filename, content=content, max_bytes=settings.max_upload_bytes)
    task = instruction.strip() or "Generate an HTML knowledge note from the uploaded material."
    conversation = material_conversation(material, task)
    result = generate_note_from_conversation(settings=settings, conversation=conversation, spec=spec)
    result["run"]["kind"] = "material_html_generation"
    result["run"]["material"] = {
        "title": material.title,
        "material_type": material.material_type,
        "text_chars": len(material.text),
    }
    return result


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


def normalize_text(value: str) -> str:
    return " ".join(str(value or "").split())
