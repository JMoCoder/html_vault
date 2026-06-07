from __future__ import annotations

import re
import uuid
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from html_lore.builder import build_site
from html_lore.manifest import build_item
from html_lore.metadata import MetadataStore, dump_simple_yaml
from html_lore.server.config import ServerSettings
from html_lore.server.uploads import ensure_within

from .html_generation_graph import HtmlGenerationGraph, HtmlGenerationState


VALID_THEMES = {"default", "dark", "light"}
VALID_TARGET_USES = {"default", "personal", "share"}
VALID_REFERENCE_STYLES = {"default", "image", "note"}
VALID_STYLE_PREFERENCES = {"default", "report", "website", "ppt"}


class HtmlGenerationError(ValueError):
    def __init__(self, message: str, *, run: dict[str, Any] | None = None) -> None:
        super().__init__(message)
        self.run = run


@dataclass(frozen=True)
class GenerationSpec:
    theme: str = "default"
    target_use: str = "default"
    reference_style: str = "default"
    reference_note_id: str = ""
    style_preference: str = "default"

    @classmethod
    def from_values(cls, values: dict[str, Any]) -> "GenerationSpec":
        theme = validate_enum(values.get("theme", "default"), VALID_THEMES, "theme")
        target_use = validate_enum(values.get("target_use", values.get("targetUse", "default")), VALID_TARGET_USES, "target_use")
        style_preference = validate_enum(values.get("style_preference", values.get("stylePreference", "default")), VALID_STYLE_PREFERENCES, "style_preference")
        reference_style = validate_enum(values.get("reference_style", values.get("referenceStyle", "default")), VALID_REFERENCE_STYLES, "reference_style")
        reference_note_id = normalize_reference_note_id(values.get("reference_note_id") or values.get("referenceNoteId") or "")
        if reference_style == "default":
            reference_note_id = ""
        if reference_style == "note" and not reference_note_id:
            raise HtmlGenerationError("Reference note is required.")
        return cls(
            theme=theme,
            target_use=target_use,
            reference_style=reference_style,
            reference_note_id=reference_note_id,
            style_preference=style_preference,
        )

    def as_dict(self) -> dict[str, str]:
        return {
            "theme": self.theme,
            "target_use": self.target_use,
            "reference_style": self.reference_style,
            "reference_note_id": self.reference_note_id,
            "style_preference": self.style_preference,
        }


def generate_note_from_conversation(
    *,
    settings: ServerSettings,
    conversation: dict[str, Any],
    spec: GenerationSpec,
) -> dict[str, Any]:
    graph = HtmlGenerationGraph()
    started_at = datetime.now(timezone.utc)
    state = graph.run(
        HtmlGenerationState(
            run_id=uuid.uuid4().hex,
            conversation_id=str(conversation.get("id") or ""),
            spec=spec.as_dict(),
            context_snapshot=conversation.get("context_snapshot") if isinstance(conversation.get("context_snapshot"), dict) else {},
            messages=[message for message in conversation.get("messages", []) if isinstance(message, dict)],
        ),
    )
    completed_at = datetime.now(timezone.utc)
    state_dict = state.as_dict()
    state_dict["graph"] = graph.name
    state_dict["started_at"] = started_at.isoformat()
    state_dict["completed_at"] = completed_at.isoformat()
    state_dict["duration_ms"] = int((completed_at - started_at).total_seconds() * 1000)
    if not state.qa_report["ok"]:
        message = str(state.qa_report["message"])
        raise HtmlGenerationError(message, run=failed_run(state_dict, message, "qa_failed"))
    if not state.review_decision["ok"]:
        message = str(state.review_decision["message"])
        raise HtmlGenerationError(message, run=failed_run(state_dict, message, "review_failed"))
    item = persist_generated_note(settings=settings, state=state_dict)
    return {"run": public_run(state_dict, item), "item": item}


def persist_generated_note(*, settings: ServerSettings, state: dict[str, Any]) -> dict[str, Any]:
    now = datetime.now(timezone.utc)
    brief = state.get("content_brief") if isinstance(state.get("content_brief"), dict) else {}
    relative_path = next_generated_path(settings.content_dir, str(brief.get("title") or "generated-note"), now)
    content_path = settings.content_dir / relative_path
    ensure_within(content_path, settings.content_dir)
    content_path.parent.mkdir(parents=True, exist_ok=True)
    content_path.write_text(str(state.get("html_draft") or ""), encoding="utf-8")
    metadata = {
        "id": relative_path.as_posix(),
        "title": str(brief.get("title") or "Generated note"),
        "summary": str(brief.get("summary") or ""),
        "source_type": "topic",
        "collection": str(brief.get("collection") or "AI"),
        "tags": list(brief.get("tags") or []),
        "status": "ready",
        "favorite": False,
        "archived": False,
        "pinned": False,
        "open_mode": "iframe",
        "created": now.isoformat(),
        "updated": now.isoformat(),
        "agent": {
            "generated": True,
            "run_id": state.get("run_id"),
            "conversation_id": state.get("conversation_id"),
            "graph": state.get("graph") or "HtmlGenerationGraph.beta",
            "theme": (state.get("spec") or {}).get("theme", "default") if isinstance(state.get("spec"), dict) else "default",
            "target_use": (state.get("spec") or {}).get("target_use", "default") if isinstance(state.get("spec"), dict) else "default",
            "style_preference": (state.get("spec") or {}).get("style_preference", "default") if isinstance(state.get("spec"), dict) else "default",
        },
    }
    if settings.meta_dir is not None:
        metadata_path = settings.meta_dir / "items" / relative_path.with_suffix(".yml")
        ensure_within(metadata_path, settings.meta_dir)
        metadata_path.parent.mkdir(parents=True, exist_ok=True)
        metadata_path.write_text(dump_simple_yaml(metadata), encoding="utf-8")
    item = build_item(content_path, settings.content_dir, MetadataStore.load(settings.meta_dir))
    build_site(
        content_dir=settings.content_dir,
        meta_dir=settings.meta_dir,
        output_dir=settings.public_dir,
        site_title=settings.site_title,
    )
    return item


def public_run(state: dict[str, Any], item: dict[str, Any]) -> dict[str, Any]:
    return {
        "id": state.get("run_id"),
        "kind": "html_generation",
        "status": "completed",
        "started_at": state.get("started_at"),
        "completed_at": state.get("completed_at"),
        "duration_ms": state.get("duration_ms"),
        "conversation_id": state.get("conversation_id"),
        "spec": state.get("spec"),
        "graph": state.get("graph") or "HtmlGenerationGraph.beta",
        "generation_intent": state.get("generation_intent") if isinstance(state.get("generation_intent"), dict) else {},
        "qa_report": state.get("qa_report"),
        "review_decision": state.get("review_decision"),
        "node_trace": state.get("node_trace") if isinstance(state.get("node_trace"), list) else [],
        "usage": state.get("usage") if isinstance(state.get("usage"), dict) else {},
        "error": state.get("error") if isinstance(state.get("error"), dict) else {},
        "item_id": item.get("id"),
    }


def failed_run(state: dict[str, Any], message: str, code: str) -> dict[str, Any]:
    return {
        "id": state.get("run_id"),
        "kind": "html_generation",
        "status": "failed",
        "started_at": state.get("started_at"),
        "completed_at": state.get("completed_at"),
        "duration_ms": state.get("duration_ms"),
        "conversation_id": state.get("conversation_id"),
        "spec": state.get("spec"),
        "graph": state.get("graph") or "HtmlGenerationGraph.beta",
        "generation_intent": state.get("generation_intent") if isinstance(state.get("generation_intent"), dict) else {},
        "qa_report": state.get("qa_report") if isinstance(state.get("qa_report"), dict) else {},
        "review_decision": state.get("review_decision") if isinstance(state.get("review_decision"), dict) else {},
        "node_trace": state.get("node_trace") if isinstance(state.get("node_trace"), list) else [],
        "usage": state.get("usage") if isinstance(state.get("usage"), dict) else {},
        "error": {"code": code, "message": message},
        "item_id": "",
    }


def next_generated_path(content_dir: Path, title: str, now: datetime) -> Path:
    relative_dir = Path("generated") / now.strftime("%Y") / now.strftime("%m")
    stem = slugify(title)
    candidate = relative_dir / f"{stem}.html"
    index = 2
    while (content_dir / candidate).exists():
        candidate = relative_dir / f"{stem}-{index}.html"
        index += 1
    return candidate


def validate_enum(value: Any, valid: set[str], name: str) -> str:
    cleaned = str(value or "default").strip() or "default"
    if cleaned not in valid:
        raise HtmlGenerationError(f"Unsupported {name}.")
    return cleaned


def normalize_reference_note_id(value: Any) -> str:
    cleaned = str(value or "").strip()
    if not cleaned:
        return ""
    parts = cleaned.replace("\\", "/").split("/")
    if (
        len(cleaned) > 240
        or any(ord(char) < 32 for char in cleaned)
        or cleaned.startswith("/")
        or any(part in {"", ".", ".."} for part in parts)
    ):
        raise HtmlGenerationError("Unsupported reference note.")
    return cleaned


def slugify(value: str) -> str:
    normalized = re.sub(r"[^A-Za-z0-9._-]+", "-", value.strip()).strip("-._").lower()
    return normalized[:72].strip("-._") or "generated-note"
