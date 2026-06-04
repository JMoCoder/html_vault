"""Public HTMlore package namespace.

The implementation still lives in ``html_vault`` during the 0.x compatibility
window so existing imports, Docker entrypoints, and scripts keep working.
"""

from html_vault import __version__

__all__ = ["__version__"]
