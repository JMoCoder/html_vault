from __future__ import annotations

import time
from collections import defaultdict, deque
from threading import Lock


class AIRateLimitError(ValueError):
    pass


class AIRateLimiter:
    def __init__(self) -> None:
        self._buckets: dict[str, deque[float]] = defaultdict(deque)
        self._lock = Lock()

    def check(self, key: str, *, max_requests: int, window_seconds: int) -> None:
        safe_key = key.strip() or "anonymous"
        limit = max(1, int(max_requests or 1))
        window = max(1, int(window_seconds or 1))
        now = time.monotonic()
        cutoff = now - window
        with self._lock:
            bucket = self._buckets[safe_key]
            while bucket and bucket[0] <= cutoff:
                bucket.popleft()
            if len(bucket) >= limit:
                raise AIRateLimitError(f"AI request limit exceeded. Try again in {window} seconds.")
            bucket.append(now)


ai_rate_limiter = AIRateLimiter()
