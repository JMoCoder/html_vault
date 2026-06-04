"""Legacy compatibility wrapper for ``html_lore.cli``."""

from __future__ import annotations

from typing import Sequence

from html_lore.cli import main as lore_main

__all__ = ["main"]


def main(argv: Sequence[str] | None = None) -> None:
    lore_main(argv, prog="html-vault")


if __name__ == "__main__":
    main()
