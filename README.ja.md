# HTML Vault

Languages: [English](README.md) | [中文](README.zh-CN.md) | [日本語](README.ja.md)

HTML Vault は静的優先の HTML ナレッジワークスペースです。HTML ファイルをコンテンツディレクトリに置き、manifest を生成すると、任意の静的 Web サーバーでホストできるカード型ナレッジベースを公開できます。

## 機能

- Manifest v2 のナレッジ項目モデル。
- `meta/items/**/*.yml` のサイドカーメタデータ。
- ライブラリ状態、コレクション、タグで絞り込めるカードグリッド。
- 上部ツールバーでタグを複数選択して絞り込み、OR/AND 一致を選択できます。
- 上部ツールバーで現在のビューを時間順とタイトル A-Z/Z-A で並べ替えできます。
- カードのメタ情報は生成/インポートのソースラベルを使い、「コレクション/ソース」として表示します。
- コンパクトな操作ボタンを備えたカード固定のインデックス表示。
- iframe リーダー、原文を開く操作、hash リンク。
- 項目カードとリーダーでお気に入りとアーカイブ操作に対応。
- 項目カードとリーダーからノートメタデータを編集でき、タイトル、概要、コレクション、タグをブラウザー内のローカル上書きとして保存します。
- PWA インストールに対応。Web 版をクロスデバイスの主クライアントとし、独立デスクトップアプリには依存しません。
- 上部のインポート入口は既存 HTML ファイル用、右側の AI 作成入口は新しい HTML ノート生成用。
- 中国語、英語、日本語の UI 切り替え。
- ダーク/ライトモード。
- 左サイドバーとグローバル AI 右サイドバーはどちらもドラッグで幅を調整でき、ローカルに保存されます。
- 検索欄の右にグローバル AI 入口を追加。幅をドラッグ調整できる右サイドバーで、全ノート、コレクション、タグ、検索結果、現在のリーダー項目、お気に入り/アーカイブ/複数選択フィルター状態に応じた文脈を表示。
- 設定ページ: データ、AI プロバイダー設定、ユーザープロフィール、アカウントとセキュリティ、利用規約、プロジェクト情報、更新ドキュメント。
- ライブラリ/コレクション/タグのサイドバー表示管理。コレクションとタグの追加、名前変更、統合、削除には将来のメタデータ書き込み機能が必要です。
- 設定ページに独立したデータ設定グループを追加し、ローカルバックアップ/復元、WebDAV 設定、データエクスポートを用意。
- AI ナレッジアシスタントは将来の一括分類とタグ付け入口として残し、ナレッジ会話はグローバル AI サイドバーへ移動。
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

## Backend API

最初のバックエンド機能は任意の `agent` extra で起動できます:

```bash
pip install -e ".[agent]"
HTML_VAULT_CONTENT=examples/content \
HTML_VAULT_META=examples/meta \
html-vault serve-api --port 8787
```

実装済みエンドポイント:

- `GET /api/health`
- `GET /api/manifest`
- `GET /api/items`
- `GET /api/items/{id}`
- `POST /api/uploads/html`
- `DELETE /api/items/{id}`

`GET /api/items` は現在のフロントエンド一覧ロジックに対応します。ライブラリ、コレクション、カンマ区切りタグ、`tag_match=any|all`、お気に入り/アーカイブ、検索、並び替え、limit を指定できます。

`POST /api/uploads/html` は multipart HTML ファイルを受け取り、任意で `title`、`summary`、`collection`、カンマ区切り `tags` を指定できます。成功時は `content/imported/YYYY/MM/` に保存し、sidecar metadata を生成し、`public/` を再ビルドして、インデックス済み項目を返します。

`DELETE /api/items/{id}` はアーカイブ済み項目のみ受け付けます。HTML ファイルと sidecar metadata を完全に削除し、その後 `public/` を再ビルドします。

## サイドバー管理

ライブラリ、コレクション、タグの管理は設定ページにあります。静的モードではサイドバー項目の表示/非表示のみ変更でき、元のメタデータは変更しません。ライブラリは固定のシステムビューなので、表示/非表示のみ変更できます。コレクションとタグの追加、名前変更、統合、削除は構造的なメタデータ操作であり、将来の Agent Server が `meta/items/**/*.yml` に書き戻す必要があります。現在の単一ノート用メタデータエディターは、元ファイルを書き換えずにブラウザー内の上書きとして保存します。

## ローカルデータ設定

データ設定グループには、ブラウザー側のバックアップ/復元、WebDAV 設定プレースホルダー、JSON エクスポートがあります。静的モードではローカル UI 設定、お気に入り/アーカイブ/メタデータの上書き状態、サイドバー表示設定、現在の Manifest をエクスポートできますが、ディスク上の元 HTML/YAML ファイルはバックアップしません。

WebDAV は現在、非機密の接続項目のみ保存します。パスワードやアプリトークンは将来の保護された Agent Server で扱うべきです。

## PWA 対応

ビルド出力には `manifest.webmanifest` と `sw.js` が含まれるため、対応ブラウザーで HTML Vault を PWA としてインストールできます。Service Worker はアプリシェルと訪問済みコンテンツをキャッシュし、再読み込みの高速化と基本的なオフラインアクセスを提供します。

## 予定している AI モジュール

AI ナレッジアシスタントは、ナレッジデータベースの再分類、再タグ付け、レビュー状態更新などの一括操作入口です。現在は送信時に二重確認を表示し、開発中メッセージを出すだけで、データは変更しません。

グローバル AI サイドバーは、将来の文脈付き Q&A と HTML ノート生成の入口です。現時点では UI のみで、モデルリクエストは送信されません。実際の生成には将来の Agent Server が必要です。

## 開発

```bash
pip install -e ".[dev]"
pytest
python tests/run_smoke.py
html-vault build --content examples/content --meta examples/meta --out public
```

## ライセンス

MIT
