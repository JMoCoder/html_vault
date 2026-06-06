from __future__ import annotations

import re
import uuid
from dataclasses import dataclass
from datetime import datetime, timezone
from html import escape
from pathlib import Path
from typing import Any

from html_lore.builder import build_site
from html_lore.manifest import build_item
from html_lore.metadata import MetadataStore, dump_simple_yaml
from html_lore.server.config import ServerSettings
from html_lore.server.uploads import ensure_within


VALID_THEMES = {"default", "dark", "light"}
VALID_TARGET_USES = {"default", "personal", "share"}
VALID_STYLE_PREFERENCES = {"default", "report", "website", "ppt"}


class HtmlGenerationError(ValueError):
    pass


@dataclass(frozen=True)
class GenerationSpec:
    theme: str = "default"
    target_use: str = "default"
    reference_style: str = "default"
    reference_note_id: str = ""
    style_preference: str = "default"

    @classmethod
    def from_values(cls, values: dict[str, Any]) -> "GenerationSpec":
        return cls(
            theme=validate_enum(values.get("theme", "default"), VALID_THEMES, "theme"),
            target_use=validate_enum(values.get("target_use", values.get("targetUse", "default")), VALID_TARGET_USES, "target_use"),
            reference_style=str(values.get("reference_style") or values.get("referenceStyle") or "default").strip() or "default",
            reference_note_id=str(values.get("reference_note_id") or values.get("referenceNoteId") or "").strip(),
            style_preference=validate_enum(values.get("style_preference", values.get("stylePreference", "default")), VALID_STYLE_PREFERENCES, "style_preference"),
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
    state: dict[str, Any] = {
        "run_id": uuid.uuid4().hex,
        "conversation_id": conversation.get("id"),
        "spec": spec.as_dict(),
        "context_snapshot": conversation.get("context_snapshot") or {},
        "messages": conversation.get("messages") or [],
    }
    state["content_brief"] = pm_agent_node(state)
    state["style_spec"] = ux_agent_node(state)
    state["html_draft"] = coder_agent_node(state)
    state["qa_report"] = qa_node(state["html_draft"])
    state["review_decision"] = reviewer_node(state["html_draft"], spec)
    if not state["qa_report"]["ok"]:
        raise HtmlGenerationError(state["qa_report"]["message"])
    if not state["review_decision"]["ok"]:
        raise HtmlGenerationError(state["review_decision"]["message"])
    item = persist_generated_note(settings=settings, state=state)
    return {"run": public_run(state, item), "item": item}


def pm_agent_node(state: dict[str, Any]) -> dict[str, Any]:
    messages = [message for message in state.get("messages", []) if isinstance(message, dict)]
    last_user = next((str(message.get("content") or "") for message in reversed(messages) if message.get("role") == "user"), "")
    last_assistant = next((str(message.get("content") or "") for message in reversed(messages) if message.get("role") == "assistant"), "")
    context = state.get("context_snapshot") if isinstance(state.get("context_snapshot"), dict) else {}
    titles = [str(item.get("title") or "") for item in context.get("items", []) if isinstance(item, dict)][:6]
    title = summarize_title(last_user, titles)
    summary = summarize_summary(last_user, last_assistant, titles)
    return {
        "title": title,
        "summary": summary,
        "sections": [
            {"heading": "Question", "body": last_user or "No user question was captured."},
            {"heading": "Answer", "body": last_assistant or "No assistant answer was captured yet."},
            {"heading": "Referenced Context", "body": "\n".join(titles) if titles else "No context notes were selected."},
        ],
        "tags": infer_tags(last_user, titles),
        "collection": infer_collection(context),
    }


def ux_agent_node(state: dict[str, Any]) -> dict[str, Any]:
    spec = state.get("spec") if isinstance(state.get("spec"), dict) else {}
    theme = str(spec.get("theme") or "default")
    style_preference = str(spec.get("style_preference") or "default")
    dark = theme == "dark"
    return {
        "theme": theme,
        "style_preference": style_preference,
        "background": "#111827" if dark else "#f8fafc",
        "panel": "#172033" if dark else "#ffffff",
        "text": "#e5edf7" if dark else "#172033",
        "accent": "#0f766e",
    }


def coder_agent_node(state: dict[str, Any]) -> str:
    brief = state.get("content_brief") if isinstance(state.get("content_brief"), dict) else {}
    style = state.get("style_spec") if isinstance(state.get("style_spec"), dict) else {}
    title = escape(str(brief.get("title") or "Generated note"))
    summary = escape(str(brief.get("summary") or "Generated from an HTMlore conversation."))
    sections = brief.get("sections") if isinstance(brief.get("sections"), list) else []
    section_html = "\n".join(
        f"<section><h2>{escape(str(section.get('heading') or 'Section'))}</h2><p>{escape(str(section.get('body') or '')).replace(chr(10), '<br>')}</p></section>"
        for section in sections
        if isinstance(section, dict)
    )
    return f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  <style>
    :root {{ font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: {style.get('text')}; background: {style.get('background')}; }}
    body {{ margin: 0; background: {style.get('background')}; color: {style.get('text')}; }}
    main {{ max-width: 920px; margin: 0 auto; padding: 42px 22px 64px; }}
    header {{ border-bottom: 1px solid rgba(15, 118, 110, .26); margin-bottom: 26px; padding-bottom: 22px; }}
    h1 {{ margin: 0 0 12px; font-size: clamp(2rem, 5vw, 3.4rem); line-height: 1.05; }}
    h2 {{ margin: 0 0 10px; color: {style.get('accent')}; }}
    p {{ line-height: 1.72; }}
    section {{ background: {style.get('panel')}; border: 1px solid rgba(15, 118, 110, .16); border-radius: 10px; padding: 20px; margin: 16px 0; box-shadow: 0 18px 42px rgba(15, 23, 42, .08); }}
  </style>
</head>
<body>
  <main>
    <header>
      <h1>{title}</h1>
      <p>{summary}</p>
    </header>
    {section_html}
  </main>
</body>
</html>"""


def qa_node(html: str) -> dict[str, Any]:
    lowered = html.lower()
    if "<html" not in lowered or "</html>" not in lowered:
        return {"ok": False, "message": "Generated HTML is incomplete."}
    if "<script" in lowered:
        return {"ok": False, "message": "Generated HTML contains script, which is not allowed in this beta graph."}
    if len(html.encode("utf-8")) > 2 * 1024 * 1024:
        return {"ok": False, "message": "Generated HTML is too large."}
    return {"ok": True, "message": "QA passed."}


def reviewer_node(html: str, spec: GenerationSpec) -> dict[str, Any]:
    lowered = html.lower()
    if "html_lore_ai_api_key" in lowered or re.search(r"sk-[a-z0-9_-]{12,}", html, re.IGNORECASE):
        return {"ok": False, "message": "Generated HTML contains a likely secret."}
    if spec.target_use == "share" and ("<script" in lowered or "http://" in lowered):
        return {"ok": False, "message": "Share-target generation failed safety review."}
    return {"ok": True, "message": "Review passed."}


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
            "graph": "HtmlGenerationGraph.beta",
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
        "conversation_id": state.get("conversation_id"),
        "spec": state.get("spec"),
        "qa_report": state.get("qa_report"),
        "review_decision": state.get("review_decision"),
        "item_id": item.get("id"),
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


def summarize_title(last_user: str, titles: list[str]) -> str:
    cleaned = re.sub(r"\s+", " ", last_user).strip()
    if cleaned:
        return cleaned[:72]
    return (titles[0] if titles else "Generated knowledge note")[:72]


def summarize_summary(last_user: str, last_assistant: str, titles: list[str]) -> str:
    source = last_assistant or last_user or "Generated from selected HTMlore context."
    cleaned = re.sub(r"\s+", " ", source).strip()
    if titles:
        cleaned = f"Based on {len(titles)} context note(s): {cleaned}"
    return cleaned[:240]


def infer_tags(last_user: str, titles: list[str]) -> list[str]:
    text = " ".join([last_user, *titles])
    candidates = []
    for token in re.findall(r"[A-Za-z][A-Za-z0-9+-]{1,24}", text):
        normalized = token.strip()
        if normalized.lower() in {"what", "does", "cover", "from", "note", "notes", "based"}:
            continue
        if normalized not in candidates:
            candidates.append(normalized)
    return candidates[:6] or ["AI"]


def infer_collection(context: dict[str, Any]) -> str:
    requested = context.get("requested") if isinstance(context.get("requested"), dict) else {}
    if requested.get("collection"):
        return str(requested["collection"])
    items = context.get("items") if isinstance(context.get("items"), list) else []
    collections = [str(item.get("collection") or "") for item in items if isinstance(item, dict) and item.get("collection")]
    return collections[0] if len(set(collections)) == 1 and collections else "AI"


def slugify(value: str) -> str:
    normalized = re.sub(r"[^A-Za-z0-9._-]+", "-", value.strip()).strip("-._").lower()
    return normalized[:72].strip("-._") or "generated-note"
