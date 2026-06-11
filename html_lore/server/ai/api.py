from __future__ import annotations

from typing import Any

from html_lore.server.config import ServerSettings
from html_lore.server.items import ItemService

from .context import AIContextError, ContextResolver
from .conversations import ConversationError, ConversationStore
from .external_search import build_external_search_adapter
from .guardrails import GuardrailError
from .html_generation import GenerationSpec, HtmlGenerationError, generate_note_from_conversation
from .jobs import AIJobError, AIJobStore, ai_job_queue
from .knowledge_qa_graph import KnowledgeQAGraph, KnowledgeQAState, public_qa_run
from .material_generation import MaterialGenerationError, generate_note_from_material
from .model_client import ModelClient, test_provider
from .providers import AIProviderConfigError, AIProviderConfigStore, ProviderCallError
from .runs import AIRunError, AIRunStore


class AIService:
    def __init__(self, store: AIProviderConfigStore, settings: ServerSettings) -> None:
        self.store = store
        self.settings = settings

    def provider(self) -> dict[str, Any]:
        return {"provider": self.store.get().public_dict()}

    def update_provider(self, values: dict[str, Any]) -> dict[str, Any]:
        config = self.store.update(values)
        return {"provider": config.public_dict()}

    def status(self) -> dict[str, Any]:
        config = self.store.get()
        client_status = ModelClient(config).status()
        external_search = build_external_search_adapter(self.settings)
        external_status = {
            "provider": external_search.name,
            "available": bool(external_search.available),
            "max_results": max(1, int(getattr(external_search, "max_results", self.settings.ai_external_search_max_results) or 5)),
        }
        return {
            "configured": config.configured,
            "available": bool(client_status["available"]),
            "message": client_status["message"],
            "provider": config.public_dict(),
            "external_search_available": external_status["available"],
            "external_search": external_status,
        }

    def test_provider(self) -> dict[str, Any]:
        config = self.store.get()
        return test_provider(config)


class AIConversationService:
    def __init__(
        self,
        settings: ServerSettings,
        store: ConversationStore,
        item_service: ItemService,
        provider_store: AIProviderConfigStore,
        run_store: AIRunStore,
    ) -> None:
        self.settings = settings
        self.store = store
        self.item_service = item_service
        self.provider_store = provider_store
        self.run_store = run_store

    def resolve_context(self, values: dict[str, Any]) -> dict[str, Any]:
        return {"context": ContextResolver(self.item_service, max_context_items=self.settings.ai_max_context_items).resolve(values)}

    def create(self, values: dict[str, Any]) -> dict[str, Any]:
        return {"conversation": self.store.create(values)}

    def list(self, *, context_key: str = "", limit: int = 100) -> dict[str, Any]:
        conversations = self.store.list(context_key=context_key, limit=limit)
        return {"conversations": conversations, "count": len(conversations)}

    def latest(self, context_key: str) -> dict[str, Any]:
        return {"conversation": self.store.latest_for_context(context_key)}

    def get(self, conversation_id: str) -> dict[str, Any]:
        return {"conversation": self.store.get(conversation_id)}

    def delete(self, conversation_id: str) -> dict[str, Any]:
        return self.store.delete(conversation_id)

    def messages(self, conversation_id: str) -> dict[str, Any]:
        messages = self.store.list_messages(conversation_id)
        return {"messages": messages, "count": len(messages)}

    def add_message(self, conversation_id: str, values: dict[str, Any]) -> dict[str, Any]:
        content = str(values.get("content") or values.get("message") or "").strip()
        conversation = self.store.get(conversation_id)
        state = KnowledgeQAState(
            conversation_id=conversation_id,
            conversation=conversation,
            content=content,
        )
        try:
            state = KnowledgeQAGraph(
                item_service=self.item_service,
                model_client=ModelClient(self.provider_store.get()),
                conversation_store=self.store,
                external_search=build_external_search_adapter(self.settings),
                max_message_chars=self.settings.ai_max_message_chars,
                max_prompt_chars=self.settings.ai_max_prompt_chars,
                max_response_tokens=self.settings.ai_max_response_tokens,
                retrieval_mode=self.settings.ai_retrieval_mode,
            ).run(state)
        except GuardrailError as exc:
            self.run_store.add(public_qa_run(state, status="failed", error={"code": "guardrail_failed", "message": str(exc)}))
            raise
        except (AIProviderConfigError, ProviderCallError) as exc:
            self.run_store.add(public_qa_run(state, status="failed", error={"code": "provider_failed", "message": str(exc)}))
            raise ConversationError(str(exc)) from exc
        run = public_qa_run(state)
        self.run_store.add(run)
        return {
            "conversation": state.stored_conversation,
            "message": state.stored_conversation["messages"][-1],
            "sources": state.sources,
            "usage": state.usage,
            "graph": KnowledgeQAGraph.name,
            "node_trace": state.node_trace,
            "external_status": state.external_status,
            "retrieval_status": state.retrieval_status,
            "qa_status": qa_status_from_report(run["qa_report"]),
            "qa_report": run["qa_report"],
        }

    def generate_note(self, conversation_id: str, values: dict[str, Any]) -> dict[str, Any]:
        conversation = self.store.get(conversation_id)
        spec = GenerationSpec.from_values(values)
        try:
            result = generate_note_from_conversation(settings=self.settings, conversation=conversation, spec=spec)
        except HtmlGenerationError as exc:
            self._store_failed_run(exc)
            raise
        run = self.run_store.add(result["run"])
        return {"run": run, "item": result["item"]}

    def enqueue_generate_note(self, conversation_id: str, values: dict[str, Any]) -> dict[str, Any]:
        conversation = self.store.get(conversation_id)
        spec = GenerationSpec.from_values(values)
        store = AIJobStore(self.settings)
        job = store.create(
            kind="html_generation",
            label=f"Generate note from conversation {conversation_id[:12]}",
            payload={"type": "conversation_html_generation", "conversation_id": conversation_id, "spec": spec.as_dict()},
        )
        ai_job_queue.enqueue(settings=self.settings, job=job, task=self._conversation_generation_task(conversation_id, spec.as_dict()))
        return {"job": job, "job_id": job["job_id"]}

    def generate_note_from_material(self, *, filename: str, content: bytes, instruction: str, values: dict[str, Any]) -> dict[str, Any]:
        spec = GenerationSpec.from_values(values)
        try:
            result = generate_note_from_material(
                settings=self.settings,
                filename=filename,
                content=content,
                instruction=instruction,
                spec=spec,
            )
        except (HtmlGenerationError, MaterialGenerationError) as exc:
            self._store_failed_run(exc)
            raise
        run = self.run_store.add(result["run"])
        return {"run": run, "item": result["item"]}

    def enqueue_generate_note_from_material(self, *, filename: str, content: bytes, instruction: str, values: dict[str, Any]) -> dict[str, Any]:
        spec = GenerationSpec.from_values(values)
        store = AIJobStore(self.settings)
        job = store.create(kind="material_html_generation", label=filename or "Uploaded material")

        def task() -> dict[str, Any]:
            try:
                result = generate_note_from_material(
                    settings=self.settings,
                    filename=filename,
                    content=content,
                    instruction=instruction,
                    spec=spec,
                )
            except (HtmlGenerationError, MaterialGenerationError) as exc:
                self._store_failed_run(exc)
                raise
            run = self.run_store.add(result["run"])
            return {"run": run, "item": result["item"]}

        ai_job_queue.enqueue(settings=self.settings, job=job, task=task)
        return {"job": job, "job_id": job["job_id"]}

    def runs(self, limit: int = 20) -> dict[str, Any]:
        runs = self.run_store.list(limit=limit)
        return {"runs": runs, "count": len(runs)}

    def run(self, run_id: str) -> dict[str, Any]:
        return {"run": self.run_store.get(run_id)}

    def jobs(self, limit: int = 20) -> dict[str, Any]:
        jobs = AIJobStore(self.settings).list(limit=limit)
        return {"jobs": jobs, "count": len(jobs)}

    def job(self, job_id: str) -> dict[str, Any]:
        return {"job": AIJobStore(self.settings).get(job_id)}

    def cancel_job(self, job_id: str) -> dict[str, Any]:
        return {"job": AIJobStore(self.settings).cancel(job_id)}

    def retry_job(self, job_id: str) -> dict[str, Any]:
        store = AIJobStore(self.settings)
        job = store.get(job_id, include_private=True)
        if job.get("status") != "failed":
            raise AIJobError("Only failed AI jobs can be retried.")
        payload = job.get("payload") if isinstance(job.get("payload"), dict) else {}
        if str(payload.get("type") or "") != "conversation_html_generation":
            raise AIJobError("This AI job cannot be retried.")
        conversation_id = str(payload.get("conversation_id") or "").strip()
        spec_values = payload.get("spec") if isinstance(payload.get("spec"), dict) else {}
        spec = GenerationSpec.from_values(spec_values)
        self.store.get(conversation_id)
        retried = store.update(
            job_id,
            {
                "status": "pending",
                "started_at": "",
                "completed_at": "",
                "message": "AI job queued for retry.",
                "run_id": "",
                "item_id": "",
                "error": {},
                "cancel_requested": False,
                "attempts": int(job.get("attempts") or 0) + 1,
            },
        )
        ai_job_queue.enqueue(settings=self.settings, job=retried, task=self._conversation_generation_task(conversation_id, spec.as_dict()))
        return {"job": retried, "job_id": retried["job_id"]}

    def _conversation_generation_task(self, conversation_id: str, spec_values: dict[str, Any]):
        def task() -> dict[str, Any]:
            conversation = self.store.get(conversation_id)
            spec = GenerationSpec.from_values(spec_values)
            try:
                result = generate_note_from_conversation(settings=self.settings, conversation=conversation, spec=spec)
            except HtmlGenerationError as exc:
                self._store_failed_run(exc)
                raise
            run = self.run_store.add(result["run"])
            return {"run": run, "item": result["item"]}

        return task

    def _store_failed_run(self, exc: Exception) -> None:
        run = getattr(exc, "run", None)
        if isinstance(run, dict) and run:
            self.run_store.add(run)


def qa_status_from_report(report: dict[str, Any]) -> dict[str, Any]:
    citation = report.get("citation") if isinstance(report.get("citation"), dict) else {}
    quality = report.get("answer_quality") if isinstance(report.get("answer_quality"), dict) else {}
    external = report.get("external_status") if isinstance(report.get("external_status"), dict) else {}
    coverage = report.get("evidence_coverage") if isinstance(report.get("evidence_coverage"), dict) else {}
    flags = [str(flag) for flag in quality.get("flags") or [] if str(flag)]
    external_unavailable = bool(external.get("message") and not external.get("queried"))
    if external_unavailable:
        flags.append("external_unavailable")
    if not external_unavailable and str(coverage.get("status") or "") in {"partial", "no_local_evidence"}:
        flags.append("partial_context_coverage")
    flags = list(dict.fromkeys(flags))
    return {
        "status": str(quality.get("status") or "unknown"),
        "requires_attention": bool(quality.get("requires_attention") or flags),
        "flags": flags,
        "citation_status": str(citation.get("status") or ""),
        "source_count": int(report.get("source_count") or 0),
    }


__all__ = [
    "AIContextError",
    "AIConversationService",
    "AIProviderConfigError",
    "AIProviderConfigStore",
    "AIService",
    "ConversationError",
    "ConversationStore",
    "GuardrailError",
    "HtmlGenerationError",
    "MaterialGenerationError",
    "AIRunError",
    "AIRunStore",
    "AIJobError",
]
