# HTML Vault

Languages: [English](README.md) | [中文](README.zh-CN.md) | [日本語](README.ja.md)

HTML Vault は静的優先の HTML ナレッジワークスペースです。HTML ファイルをコンテンツディレクトリに置き、manifest を生成すると、任意の静的 Web サーバーでホストできるカード型ナレッジベースを公開できます。

## 機能

- Manifest v2 のナレッジ項目モデル。
- `meta/items/**/*.yml` のサイドカーメタデータ。
- ライブラリ状態、コレクション、タグで絞り込めるカードグリッド。
- iframe リーダー、原文を開く操作、hash リンク。
- 左側のインポート入口は既存 HTML ファイル用、右側の AI 作成入口は新しい HTML ノート生成用。
- 中国語、英語、日本語の UI 切り替え。
- ダーク/ライトモード。
- 設定ページ: AI プロバイダー設定、利用規約、プロジェクト情報、更新ドキュメント。
- ライブラリ/コレクション/タグのサイドバー表示管理。コレクションとタグの追加、名前変更、統合、削除には将来のメタデータ書き込み機能が必要です。
- AI ナレッジアシスタントと AI エージェントのセクションを将来の分類、タグ付け、ナレッジ会話向けに用意。
- 検索欄の左にある魔法の杖ボタンで、現在のビューからランダムなナレッジ項目を開けます。
- GitHub Pages、Cloudflare Pages、Caddy、Nginx、NAS、任意の静的サーバーにデプロイ可能。

## クイックスタート

```bash
python -m venv .venv
source .venv/bin/activate
pip install -e .
html-vault build --content examples/content --meta examples/meta --out public
python -m http.server 8080 --directory public
```

`http://localhost:8080` を開きます。

## AI プロバイダー設定

設定ページの API Key は `localStorage` に保存されません。静的モードでは、プロバイダー、モデル名、Base URL、temperature、max tokens などの非機密設定のみ保存します。

Full モードでは、API Key は HTTPS またはプライベートネットワーク経由で保護された Agent Server にのみ送信し、サーバー側で環境変数または暗号化された認証情報として保存してください。ブラウザーに返してはいけません。

## サイドバー管理

ライブラリ、コレクション、タグの管理は設定ページにあります。静的モードではサイドバー項目の表示/非表示のみ変更でき、元のメタデータは変更しません。ライブラリは固定のシステムビューなので、表示/非表示のみ変更できます。コレクションとタグの追加、名前変更、統合、削除は構造的なメタデータ操作であり、将来の Agent Server または metadata editor が `meta/items/**/*.yml` に書き戻す必要があります。

## 予定している AI モジュール

AI ナレッジアシスタントは、ナレッジデータベースの再分類、再タグ付け、レビュー状態更新などの一括操作入口です。現在は送信時に二重確認を表示し、開発中メッセージを出すだけで、データは変更しません。

AI エージェントは、ナレッジベースファイルをもとにした複数ターン会話のために予約されています。

## 開発

```bash
pip install -e ".[dev]"
pytest
python tests/run_smoke.py
html-vault build --content examples/content --meta examples/meta --out public
```

## ライセンス

MIT
