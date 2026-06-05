import pytest

from html_lore.cli import main as lore_main


def test_html_lore_cli_help_uses_new_program_name(capsys: pytest.CaptureFixture[str]) -> None:
    with pytest.raises(SystemExit) as exc_info:
        lore_main(["--help"])

    assert exc_info.value.code == 0
    assert "usage: html-lore" in capsys.readouterr().out
