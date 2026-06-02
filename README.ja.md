# HTML Vault

Languages: [English](README.md) | [中文](README.zh-CN.md) | [日本語](README.ja.md)

Deployment: [Security baseline](DEPLOYMENT.md)

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

## ローカルノートブックモード

実際のローカル HTML ノートブックとして使う場合は、静的フロントエンドとバックエンド API の両方を起動します。バックエンドはインポートした HTML を `data/content` に、sidecar metadata を `data/meta` に書き込み、`public` を再ビルドします。

```bash
mkdir -p data
cp -a examples/content data/content
cp -a examples/meta data/meta
html-vault build --content data/content --meta data/meta --out public --title "HTML Vault"
HTML_VAULT_CONTENT=data/content \
HTML_VAULT_META=data/meta \
HTML_VAULT_PUBLIC=public \
HTML_VAULT_TITLE="HTML Vault" \
html-vault serve-api --host 127.0.0.1 --port 8787
```

別のターミナルで:

```bash
python -m http.server 8080 --directory public
```

`http://127.0.0.1:8080` を開きます。localhost では、フロントエンドが自動的に `http://127.0.0.1:8787` へ接続し、実際の HTML アップロード、メタデータ永続化、フィルター、アーカイブ状態、再ビルドを有効にします。

VPS または公開デプロイの前に [DEPLOYMENT.md](DEPLOYMENT.md) を確認してください。

## AI プロバイダー設定

設定ページの API Key は `localStorage` に保存されません。静的モードでは、プロバイダー、モデル名、Base URL、temperature、max tokens などの非機密設定のみ保存します。

Full モードでは、API Key は HTTPS またはプライベートネットワーク経由で保護された Agent Server にのみ送信し、サーバー側で環境変数または暗号化された認証情報として保存してください。ブラウザーに返してはいけません。

## Backend API

最初のバックエンド機能は任意の `agent` extra で起動できます:

```bash
pip install -e ".[agent]"
HTML_VAULT_CONTENT=examples/content \
HTML_VAULT_META=examples/meta \
HTML_VAULT_API_TOKEN=dev-token \
HTML_VAULT_CORS_ORIGINS=http://127.0.0.1:8080 \
html-vault serve-api --port 8787
```

実装済みエンドポイント:

- `GET /api/health`
- `GET /api/manifest`
- `GET /api/navigation`
- `PUT /api/navigation`
- `GET /api/items`
- `GET /api/search`
- `GET /api/items/{id}`
- `GET /api/items/{id}/content`
- `GET /api/items/{id}/raw`
- `POST /api/rebuild`
- `GET /api/rebuild/{job_id}`
- `PATCH /api/items/{id}/metadata`
- `PATCH /api/items/{id}/state`
- `POST /api/uploads/html`
- `GET /api/uploads/{upload_id}`
- `DELETE /api/items/{id}`

`GET /api/items` は現在のフロントエンド一覧ロジックに対応します。ライブラリ、コレクション、カンマ区切りタグ、`tag_match=any|all`、お気に入り/アーカイブ、検索、並び替え、limit を指定できます。

`GET /api/search` は `GET /api/items` と同じパラメータを受け取り、命中した項目、スコア、命中フィールド、スニペットを含む構造化検索結果を返します。現在の実装は manifest メタデータフィールドを使用し、将来 Pagefind、SQLite FTS、クラウド検索バックエンドへ置き換えられます。

`GET /api/navigation` と `PUT /api/navigation` は、ライブラリ表示、コレクション、タグのサイドバー表示設定を `meta/config/navigation.json` に永続化します。

`POST /api/uploads/html` は multipart HTML ファイルを受け取り、任意で `title`、`summary`、`collection`、カンマ区切り `tags` を指定できます。成功時は `content/imported/YYYY/MM/` に保存し、sidecar metadata を生成し、`public/` を再ビルドして、インデックス済み項目とアップロード Job ID を返します。

`GET /api/uploads/{upload_id}` は永続化されたアップロード Job 状態を返します。Job レコードは `meta/config/jobs.json` に保存されます。

`POST /api/rebuild` は静的出力を再ビルドし、軽量 Job を記録します。`GET /api/rebuild/{job_id}` はその再ビルド Job 状態を返します。

`GET /api/items/{id}/content` は iframe 読み取り用のソース HTML を返します。`GET /api/items/{id}/raw` は原文アクセス用に同じソース HTML を返します。どちらも項目が manifest に存在し、設定された content ディレクトリ外へ出ないことを検証します。

`PATCH /api/items/{id}/metadata` は単一ノートのメタデータ編集を YAML sidecar に永続化し、`public/` を再ビルドして、再インデックス済みの項目を返します。現在の書き込み可能フィールドは `title`、`summary`、`collection`、`tags` です。アーカイブ済み項目はメタデータ編集を拒否し、アーカイブ解除後に編集可能へ戻ります。

`PATCH /api/items/{id}/state` は `favorite` と `archived` の boolean 状態を YAML sidecar に永続化し、`public/` を再ビルドして、再インデックス済みの項目を返します。

`DELETE /api/items/{id}` はアーカイブ済み項目のみ受け付けます。HTML ファイルと sidecar metadata を完全に削除し、その後 `public/` を再ビルドします。

`HTML_VAULT_API_TOKEN` を設定すると、API リクエストには `Authorization: Bearer <token>` が必要です。本番環境では `HTML_VAULT_CORS_ORIGINS` を正確なフロントエンド origin に設定してください。

## サイドバー管理

ライブラリ、コレクション、タグの管理は設定ページにあります。静的モードではサイドバー項目の表示/非表示のみ変更でき、元のメタデータは変更しません。ライブラリは固定のシステムビューなので、表示/非表示のみ変更できます。コレクションとタグの追加、名前変更、統合、削除は構造的なメタデータ操作であり、将来の一括メタデータ API が必要です。現在の単一ノート用メタデータエディターは、Agent Server 設定時に `PATCH /api/items/{id}/metadata` で書き戻し、静的モードではブラウザー内の上書きとして保存します。表示設定は利用可能な場合 `PUT /api/navigation` で永続化します。

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
