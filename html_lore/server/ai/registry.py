from __future__ import annotations

import json
from dataclasses import dataclass
from importlib import resources
from typing import Any


class AIRegistryError(ValueError):
    pass


@dataclass(frozen=True)
class AgentSpec:
    id: str
    version: str
    role: str
    prompt_template: str
    input_schema: str
    output_schema: str
    allowed_skills: tuple[str, ...]
    model_policy: dict[str, Any]

    def public_dict(self) -> dict[str, Any]:
        return {
            "id": self.id,
            "version": self.version,
            "role": self.role,
            "prompt_template": self.prompt_template,
            "input_schema": self.input_schema,
            "output_schema": self.output_schema,
            "allowed_skills": list(self.allowed_skills),
            "model_policy": dict(self.model_policy),
        }


@dataclass(frozen=True)
class PromptTemplate:
    id: str
    version: str
    path: str
    content: str

    def render(self, values: dict[str, Any]) -> str:
        rendered = self.content
        for key, value in values.items():
            rendered = rendered.replace("{{" + key + "}}", str(value))
        missing = [part.split("}}", 1)[0] for part in rendered.split("{{")[1:] if "}}" in part]
        if missing:
            raise AIRegistryError(f"Prompt template has unresolved placeholders: {', '.join(sorted(set(missing)))}.")
        return rendered.strip()

    def public_dict(self) -> dict[str, str]:
        return {"id": self.id, "version": self.version, "path": self.path}


def load_agent(agent_id: str) -> AgentSpec:
    path = _resource_file("agents", f"{agent_id}.json")
    try:
        raw = json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError as exc:
        raise AIRegistryError(f"AI agent config not found: {agent_id}.") from exc
    except json.JSONDecodeError as exc:
        raise AIRegistryError(f"AI agent config is invalid JSON: {agent_id}.") from exc
    if not isinstance(raw, dict):
        raise AIRegistryError(f"AI agent config must be an object: {agent_id}.")
    allowed_skills = raw.get("allowed_skills") if isinstance(raw.get("allowed_skills"), list) else []
    model_policy = raw.get("model_policy") if isinstance(raw.get("model_policy"), dict) else {}
    return AgentSpec(
        id=str(raw.get("id") or agent_id),
        version=str(raw.get("version") or ""),
        role=str(raw.get("role") or ""),
        prompt_template=str(raw.get("prompt_template") or ""),
        input_schema=str(raw.get("input_schema") or ""),
        output_schema=str(raw.get("output_schema") or ""),
        allowed_skills=tuple(str(skill) for skill in allowed_skills),
        model_policy=dict(model_policy),
    )


def load_prompt(template_path: str) -> PromptTemplate:
    normalized = normalize_template_path(template_path)
    path = _resource_file("prompts", *normalized.split("/"))
    try:
        content = path.read_text(encoding="utf-8")
    except FileNotFoundError as exc:
        raise AIRegistryError(f"AI prompt template not found: {normalized}.") from exc
    stem = normalized.rsplit("/", 1)[-1]
    parts = stem.rsplit(".", 2)
    version = parts[-2] if len(parts) >= 3 else ""
    return PromptTemplate(id=normalized, version=version, path=normalized, content=content)


def normalize_template_path(value: str) -> str:
    normalized = str(value or "").strip().replace("\\", "/")
    if not normalized or normalized.startswith("/") or ".." in normalized.split("/"):
        raise AIRegistryError("Invalid AI prompt template path.")
    return normalized


def _resource_file(*parts: str):
    return resources.files("html_lore.server.ai").joinpath(*parts)
