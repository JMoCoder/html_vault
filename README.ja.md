# HTML Vault

Languages: [English](README.md) | [中文](README.zh-CN.md) | [日本語](README.ja.md)

Deployment: [Self-hosted Docker and security baseline](DEPLOYMENT.md)

HTML Vault は、HTML 形式のナレッジファイルを保存、閲覧、読書し、将来的には AI と対話するためのセルフホスト型ナレッジワークスペースです。内容をデータベース中心のノートアプリに閉じ込めず、移植可能なファイルとして保持したいユーザー向けに設計されています。

長期的な方向性は、Web ファーストの個人ナレッジ Vault です。HTML ノートをインポートまたは生成し、コレクションとタグで整理し、洗練されたカードワークスペースで読み、PWA としてインストールし、将来的には AI サービスを接続して、自分のライブラリに対する分類、検索、要約、多ターン会話を行えるようにします。

## Why HTML Vault

多くのナレッジツールは、内容を不透明なデータベース行として保存するか、Markdown 執筆を中心にしています。HTML Vault は別の方針を取ります:

- **HTML ファイルを永続的なコンテンツ層にします。** ノートは確認、コピー、アーカイブ、バックアップでき、一般的な Web インフラで配信できます。
- **YAML サイドカーメタデータで整理情報を明示します。** タイトル、概要、コレクション、タグ、お気に入り、アーカイブ、ソース情報はコンテンツとは別に保存されます。
- **Web アプリを主クライアントにします。** 別のデスクトップアプリではなく、ブラウザーとモバイル PWA を主な利用形態にします。
- **AI は任意のサービス層です。** 現在のアプリには AI ワークフロー用 UI とコンテキスト設計がありますが、認証情報とモデル呼び出しは静的フロントエンドには保存しません。

## 0.6.x Current Scope

現在の `0.6.x` は、内蔵ログイン認証を備えた最初のセルフホストノートブックラインです。Docker デプロイ、内蔵ログイン、HTML インポート、メタデータ永続化、フィルター、読書、アーカイブ、公開デプロイの安全境界を中心にしています。

現在実装済み:

- `docker compose up -d --build` による単一コンテナ Docker デプロイ。
- HttpOnly session Cookie とバックエンド設定のテストユーザー認証情報を使う内蔵ログイン画面。
- `app_static/` から生成される静的優先フロントエンド。
- 実際のノートブック運用向けバックエンド API。
- HTML アップロードと `data/content` へのインポート。
- YAML メタデータの `data/meta` への永続化。
- インポート、メタデータ変更、状態変更後の `public/` 自動再ビルド。
- ライブラリ、コレクション、タグ、お気に入り、検索、並び替えを備えたカードワークスペース。
- OR/AND 一致を選べる複数タグフィルター。
- iframe 読書、原文アクセス、コピー/共有、お気に入り/アーカイブ、メタデータ編集を備えたリーダー。
- アーカイブ済みノートの編集ロックと完全削除。
- ライブラリ、コレクション、タグのサイドバー表示管理。
- グローバル AI サイドバー UI スキャフォールドとコンテキストラベル。
- AI プロバイダー、データ、ユーザー、アカウントセキュリティ、プロジェクト情報、更新情報の設定セクション。
- PWA manifest と Service Worker。
- 中国語、英語、日本語のシステム UI。
- ライト/ダークテーマ切り替えとリサイズ可能なサイドバー。
- `GET /api/version` と GitHub releases/tags による更新ヒント。
- 任意の Caddy Basic Auth 公開デプロイ例。

未実装:

- 実際の AI モデル呼び出し。
- AI 生成 HTML ノート。
- AI による再分類、再タグ付けなどのバッチ処理。
- マルチユーザーアカウント。
- クラウド同期またはホスト型サブスクリプションサービス。
- 完全なバックアップ/復元と WebDAV 実行。
- コレクション/タグの一括リネーム、統合、削除。

## Quick Docker Start

既定の Docker パスはローカル PC、NAS、LAN サーバー、プライベート VPS 向けです。token も Caddy も必須ではありません。

```bash
git clone https://github.com/JMoCoder/html_vault.git
cd html_vault
docker compose up -d --build
```

開く:

```text
http://localhost:8080
```

既定のローカル/テストログイン:

```text
Username: admin
Password: test-password
```

同じネットワーク上の別デバイスからは:

```text
http://your-host-ip:8080
```

ランタイムデータは Git には保存されません:

```text
data/content   インポートされた HTML ファイル
data/meta      YAML サイドカーメタデータとランタイム設定
public         生成された Web アプリ出力
```

既定の認証情報のまま compose スタックを公開インターネットに出さないでください。公開デプロイでは `HTML_VAULT_AUTH_USERNAME`、`HTML_VAULT_AUTH_PASSWORD`、`HTML_VAULT_SESSION_SECRET` を変更し、HTTPS の背後に置いてください。Caddy Basic Auth 例として `compose.prod.yml`、`.env.secure.example`、`deploy/caddy-basic-auth.Caddyfile` を用意しています。

## Update Existing Docker Deployment

HTML Vault はホストを自動更新しません。アプリは GitHub releases/tags から更新ヒントを表示するだけです。

更新前に `data/` をバックアップします:

```bash
cp -a data "data.backup.$(date +%Y%m%d-%H%M%S)"
```

変更内容を確認します:

```bash
git fetch
git log --oneline HEAD..origin/main
git diff --stat HEAD..origin/main
```

更新を適用します:

```bash
git pull --ff-only
docker compose up -d --build
docker compose logs -f
```

## Static Build

既存のコンテンツとメタデータから静的サイトを生成することもできます:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -e .
html-vault build --content examples/content --meta examples/meta --out public
python -m http.server 8080 --directory public
```

`http://localhost:8080` を開きます。

静的モードは読み取り専用公開、GitHub Pages のようなホスティング、生成アプリの確認に適しています。実際のアップロードとメタデータ永続化には、バックエンド API または既定の Docker デプロイが必要です。

## Data Model

HTML ファイルはコンテンツディレクトリに保存されます:

```text
content/
  generated/2026/05/mcp-security.html
  imported/docker-network.html
  reading/knowledge-workspace.html
```

任意のメタデータは同じパス構造で `meta/items/` に保存されます:

```yaml
id: generated/2026/05/mcp-security.html
title: MCP Server Security Model
summary: Trust boundaries, permissions, tool-call risks, and deployment notes.
source_type: topic
collection: AI
tags:
  - MCP
  - Security
favorite: true
pinned: true
open_mode: iframe
agent:
  generated: true
  job_id: job_demo
```

メタデータは HTML ドキュメントから抽出した値を上書きします。メタデータがない場合、HTML Vault はタイトル、概要、コレクション、ソース種別、タイムスタンプ、レビュー状態を推測します。

## Backend API

バックエンド API は Docker デプロイに含まれます。任意の `agent` extra で手動起動することもできます:

```bash
pip install -e ".[agent]"
HTML_VAULT_CONTENT=data/content \
HTML_VAULT_META=data/meta \
HTML_VAULT_PUBLIC=public \
html-vault serve-api --host 127.0.0.1 --port 8787
```

実装済みエンドポイント:

- `GET /api/health`
- `GET /api/version`
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

API は現在のフロントエンドワークフローをカバーします: アップロード、一覧、検索、フィルター、読書、メタデータ編集、お気に入り、アーカイブ、アーカイブ解除、アーカイブ済みノートの完全削除、サイドバー表示設定の永続化、再ビルド Job、バージョン確認。

## Security Model

既定の Docker モードはローカル、LAN、プライベートセルフホスト向けです。既定のローカル/テストログインは `admin` / `test-password` で、開発用 session secret を使用します。ブラウザーは最初にログイン画面を表示し、ログイン後は HttpOnly session Cookie を使用します。登録は無効です。公開デプロイでは既定のユーザー名、パスワード、session secret を必ず変更してください。

HTML Vault を公開インターネットに出す場合:

- HTTPS の背後に置く。
- 内蔵ログインを有効にするか、同等の認証境界を前段に置く。
- HTTPS で配信する場合は `HTML_VAULT_SESSION_SECURE=true` を設定する。
- スクリプト、自動化、またはリバースプロキシ API アクセス用に `HTML_VAULT_API_TOKEN` を設定する。
- 長期 API token をフロントエンド JavaScript に埋め込まない。
- アップグレード前とスキーマ変更リリース前に `data/` をバックアップする。

再利用可能な安全基線と Caddy Basic Auth 例は [DEPLOYMENT.md](DEPLOYMENT.md) を参照してください。

## Roadmap

近い将来のバックエンド/ノートブック機能:

- コレクションとタグの一括操作。
- バックアップと復元フロー。
- WebDAV 設定の実行。
- より堅牢なインポート検証と重複処理。
- SQLite FTS や Pagefind などの検索バックエンド移行。

AI 機能:

- サーバー側の AI プロバイダー認証情報保存。
- AI 生成 HTML ノート。
- グローバル AI サイドバーによるナレッジベース Q&A。
- AI による分類、タグ付け、要約、整理 Job。
- 破壊的な AI バッチ操作に対するユーザー確認と監査履歴。

将来のプロダクト方向:

- ホスト型同期とクロスデバイス利用。
- ユーザーアカウントとアカウントセキュリティ。
- 商用 AI/クラウドサービス連携。
- より良いモバイル PWA フロー。
- ローカル優先のデータ所有権を保ちながら、任意のコラボレーション機能を提供。

## Repository Layout

```text
app_static/        ビルド出力へコピーされる静的ワークスペース UI
html_vault/        Python ビルダー、manifest ロジック、バックエンド API
examples/          サンプルコンテンツとメタデータ
tests/             ビルダーとバックエンド API のテスト
deploy/            任意のデプロイ例
docs/              GitHub Pages ホームページと読み取り専用 Demo
documents/         ローカル計画ドキュメント、Git では無視
```

## Development

```bash
pip install -e ".[dev,agent]"
pytest
python tests/run_smoke.py
html-vault build --content examples/content --meta examples/meta --out public
```

## License

MIT
