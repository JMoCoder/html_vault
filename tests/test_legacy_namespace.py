from html_lore import __version__ as lore_version
from html_lore.builder import build_site as lore_build_site
from html_lore.server.app import create_app as lore_create_app

from html_vault import __version__ as vault_version
from html_vault.builder import build_site as vault_build_site
from html_vault.server.app import create_app as vault_create_app


def test_legacy_html_vault_namespace_forwards_to_html_lore() -> None:
    assert vault_version == lore_version
    assert vault_build_site is lore_build_site
    assert vault_create_app is lore_create_app
