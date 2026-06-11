from pathlib import Path

import pytest

from html_lore.cli import main as lore_main


def test_html_lore_cli_help_uses_new_program_name(capsys: pytest.CaptureFixture[str]) -> None:
    with pytest.raises(SystemExit) as exc_info:
        lore_main(["--help"])

    assert exc_info.value.code == 0
    assert "usage: html-lore" in capsys.readouterr().out


def test_html_lore_cli_ai_eval_qa_outputs_json(capsys: pytest.CaptureFixture[str], tmp_path: Path) -> None:
    content_dir = tmp_path / "content"
    meta_dir = tmp_path / "meta"
    public_dir = tmp_path / "public"
    note_path = content_dir / "mcp.html"
    note_path.parent.mkdir(parents=True)
    (meta_dir / "items").mkdir(parents=True)
    public_dir.mkdir()
    note_path.write_text("<!doctype html><html><body><h1>MCP Security</h1><p>MCP tool authorization and risk control.</p></body></html>", encoding="utf-8")
    (meta_dir / "items" / "mcp.yml").write_text(
        "\n".join(
            [
                "title: MCP Security",
                "summary: MCP tool authorization and risk control.",
                "source_type: imported",
                "collection: AI",
                "tags:",
                "  - MCP",
                "",
            ],
        ),
        encoding="utf-8",
    )

    lore_main(
        [
            "ai-eval-qa",
            "--content",
            str(content_dir),
            "--meta",
            str(meta_dir),
            "--public",
            str(public_dir),
            "--provider",
            "fake",
            "--model",
            "fake-eval-model",
        ],
    )

    output = capsys.readouterr().out
    assert '"kind": "knowledge_qa_eval"' in output
    assert '"question_count": 3' in output
    assert not (meta_dir / "ai" / "conversations.json").exists()
