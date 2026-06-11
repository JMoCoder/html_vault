from __future__ import annotations

from dataclasses import dataclass
from typing import Any

from .external_search import ExternalSearchAdapter, ExternalSearchResult, ExternalSearchUnavailable, prepare_external_search_query, sanitize_external_results


@dataclass(frozen=True)
class ResearchResult:
    sources: list[dict[str, Any]]
    status: dict[str, Any]
    trace: list[dict[str, Any]]


class ResearchWorkflow:
    name = "ResearchQAWorkflow.beta"

    def __init__(self, external_search: ExternalSearchAdapter) -> None:
        self.external_search = external_search

    def run(self, query: str) -> ResearchResult:
        status: dict[str, Any] = {"provider": self.external_search.name, "available": self.external_search.available}
        trace: list[dict[str, Any]] = []
        if not self.external_search.available:
            status["message"] = "External content expansion is not configured."
            trace.append({"node": "ExternalSearchAvailabilityNode", "status": "unavailable"})
            return ResearchResult(sources=[], status=status, trace=trace)

        search_query, query_report = plan_research_query(query)
        status.update(query_report)
        trace.append({"node": "ResearchQueryPlannerNode", "status": "completed", "query_chars": query_report["query_chars"]})
        if not search_query:
            status["message"] = "External search query is empty after safety filtering."
            return ResearchResult(sources=[], status=status, trace=trace)

        max_results = max(1, int(getattr(self.external_search, "max_results", 5) or 5))
        status["max_results"] = max_results
        try:
            raw_results = self.external_search.search(search_query, max_results=max_results)
        except ExternalSearchUnavailable as exc:
            status.update({"available": False, "message": str(exc)})
            trace.append({"node": "ExternalSearchProviderNode", "status": "unavailable"})
            return ResearchResult(sources=[], status=status, trace=trace)

        trace.append({"node": "ExternalSearchProviderNode", "status": "completed", "result_count": len(raw_results)})
        sources, dropped = verify_research_sources(raw_results)
        trace.append({"node": "ResearchSourceVerifierNode", "status": "completed", "selected_count": len(sources), "dropped_count": dropped})
        merged_sources, merge_report = merge_research_evidence(sources)
        trace.append({"node": "ResearchEvidenceMergerNode", "status": "completed", **merge_report})
        status.update({"available": True, "count": len(merged_sources), "dropped": dropped, "queried": True, "workflow": self.name, **merge_report})
        return ResearchResult(sources=merged_sources, status=status, trace=trace)


def plan_research_query(query: Any) -> tuple[str, dict[str, Any]]:
    return prepare_external_search_query(query)


def verify_research_sources(results: list[ExternalSearchResult]) -> tuple[list[dict[str, Any]], int]:
    return sanitize_external_results(results)


def merge_research_evidence(sources: list[dict[str, Any]]) -> tuple[list[dict[str, Any]], dict[str, int]]:
    return list(sources), {"external_evidence_count": len(sources)}
