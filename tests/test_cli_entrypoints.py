import pytest

from html_lore.cli import main as lore_main
from html_vault.cli import main as vault_main


def test_html_lore_cli_help_uses_new_program_name(capsys: pytest.CaptureFixture[str]) -> None:
    with pytest.raises(SystemExit) as exc_info:
        lore_main(["--help"])

    assert exc_info.value.code == 0
    assert "usage: html-lore" in capsys.readouterr().out


def test_legacy_html_vault_cli_help_uses_legacy_program_name(capsys: pytest.CaptureFixture[str]) -> None:
    with pytest.raises(SystemExit) as exc_info:
        vault_main(["--help"])

    assert exc_info.value.code == 0
    assert "usage: html-vault" in capsys.readouterr().out
