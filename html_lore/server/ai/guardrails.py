from __future__ import annotations

import re


class GuardrailError(ValueError):
    pass


class AIBudgetError(GuardrailError):
    pass


BLOCKED_INPUT_PATTERNS = [
    r"\b(api[_ -]?key|secret|password|token)\b",
    r"ignore (all )?(previous|system|developer) instructions",
    r"忽略.*(系统|开发者|指令)",
    r"泄露.*(密钥|token|密码)",
    r"绕过.*(护栏|安全|权限)",
    r"读取.*(其他用户|后台|服务器)",
]

ILLEGAL_CONTENT_KEYWORDS = {
    "色情",
    "赌博",
    "毒品",
    "违法犯罪",
}


def validate_user_message(content: str) -> None:
    text = content.strip()
    if not text:
        raise GuardrailError("Message is required.")
    lowered = text.lower()
    for pattern in BLOCKED_INPUT_PATTERNS:
        if re.search(pattern, lowered, re.IGNORECASE):
            raise GuardrailError("This AI panel cannot help bypass security rules or expose secrets.")
    if any(keyword in text for keyword in ILLEGAL_CONTENT_KEYWORDS):
        raise GuardrailError("This request is outside the allowed knowledge-base assistant scope.")


def validate_message_budget(content: str, *, max_chars: int) -> None:
    if len(content) <= max_chars:
        return
    raise AIBudgetError(f"Message is too long. Keep it under {max_chars} characters.")


def validate_prompt_budget(messages: list[dict[str, str]], *, max_chars: int) -> None:
    total_chars = sum(len(str(message.get("content") or "")) for message in messages)
    if total_chars <= max_chars:
        return
    raise AIBudgetError(
        f"AI prompt budget exceeded ({total_chars} characters, limit {max_chars}). "
        "Narrow the context or ask a more specific question.",
    )


def validate_answer(content: str) -> None:
    if re.search(r"sk-[A-Za-z0-9_-]{12,}", content):
        raise GuardrailError("AI output failed secret-safety validation.")
    if re.search(r"HTML_LORE_[A-Z0-9_]*=(\S+)", content):
        raise GuardrailError("AI output failed server-config safety validation.")
