# HTML Vault

语言：[English](README.md) | [中文](README.zh-CN.md) | [日本語](README.ja.md)

部署：[自托管 Docker 与安全基线](DEPLOYMENT.zh-CN.md)

HTML Vault 是一个自托管 HTML 知识库工作台，用于保存、浏览、阅读和未来通过 AI 讨论 HTML 形式的知识文件。它面向希望内容仍然保留为可携带文件、而不是被锁进数据库优先笔记软件的用户。

项目长期方向是一个 Web 优先的个人知识库：导入或生成 HTML 笔记，用集合和标签组织，通过精致的卡片工作台阅读，安装为 PWA，并在后续接入 AI 服务，对自己的资料库进行分类、检索、总结和多轮问答。

## 为什么是 HTML Vault

很多知识工具要么把内容存成不透明的数据库记录，要么以 Markdown 写作为核心。HTML Vault 选择另一条路线：

- **HTML 文件是长期内容层。** 笔记可以被检查、复制、归档、备份，也可以由普通 Web 基础设施托管。
- **YAML 旁车元数据让组织方式清晰可见。** 标题、摘要、集合、标签、收藏、归档和来源信息都与内容分离保存。
- **Web 应用是主客户端。** 项目目标是浏览器和移动端 PWA，而不是额外开发桌面端。
- **AI 是可选服务层。** 当前已经具备 AI 工作流的界面和上下文架构，但凭据与模型调用不会写入静态前端。

## 0.5.0 稳定版范围

`0.5.0` 是第一个稳定的自托管笔记本版本，重点是本地或私有网络中的真实使用：Docker 部署、HTML 导入、元数据持久化、筛选、阅读、归档，以及公网部署安全边界文档。

当前已实现：

- 单容器 Docker 部署：`docker compose up -d --build`。
- 从 `app_static/` 生成的静态优先前端。
- 用于真实笔记本运行的后端 API。
- HTML 文件上传并导入到 `data/content`。
- YAML 元数据持久化到 `data/meta`。
- 导入、元数据变更和状态变更后自动重建 `public/`。
- 卡片式工作台，支持资料库、集合、标签、收藏、搜索和排序。
- 标签复选筛选，支持“或/且”匹配。
- 阅读页支持 iframe 阅读、原文访问、复制/分享、收藏/归档和元信息编辑。
- 已归档笔记编辑锁定，并支持永久删除。
- 资料库、集合、标签的侧栏显隐管理。
- 全局 AI 侧栏界面骨架和上下文标签。
- 设置页包含 AI 服务商、数据、用户、账户安全、项目信息和更新相关区域。
- PWA manifest 与 Service Worker。
- 中文、英文、日语系统界面。
- 亮色/暗色主题切换和可调宽侧栏。
- `GET /api/version` 与 GitHub releases/tags 更新提示。
- 可选 Caddy Basic Auth 公网部署示例。

尚未实现：

- 真实 AI 模型调用。
- AI 生成 HTML 笔记。
- AI 重新分类、打标签等批处理任务。
- 多用户账户。
- 云同步或托管订阅服务。
- 完整备份/恢复和 WebDAV 执行逻辑。
- 集合/标签批量重命名、合并、删除。

## Docker 快速开始

默认 Docker 路径适合本地电脑、NAS、局域网服务器或私有 VPS。它不需要 token，也不强制使用 Caddy。

```bash
git clone https://github.com/JMoCoder/html_vault.git
cd html_vault
docker compose up -d --build
```

打开：

```text
http://localhost:8080
```

或在同一局域网的其他设备上打开：

```text
http://你的主机-ip:8080
```

运行时数据不会提交到 Git：

```text
data/content   导入的 HTML 文件
data/meta      YAML 旁车元数据和运行时配置
public         生成后的 Web 应用输出
```

不要把默认 compose 栈直接暴露到公网。公网部署时，请用你熟悉的反向代理增加 HTTPS 和登录认证。项目提供 Caddy Basic Auth 示例：`compose.prod.yml`、`.env.secure.example` 和 `deploy/caddy-basic-auth.Caddyfile`。

## 静态构建

HTML Vault 也可以根据已有内容和元数据构建静态站点：

```bash
python -m venv .venv
source .venv/bin/activate
pip install -e .
html-vault build --content examples/content --meta examples/meta --out public
python -m http.server 8080 --directory public
```

打开 `http://localhost:8080`。

静态模式适合只读发布、类似 GitHub Pages 的托管，或检查生成后的应用。真实上传和元数据持久化需要后端 API 或默认 Docker 部署。

## 数据模型

HTML 文件保存在内容目录下：

```text
content/
  generated/2026/05/mcp-security.html
  imported/docker-network.html
  reading/knowledge-workspace.html
```

可选元数据按相同路径保存在 `meta/items/` 下：

```yaml
id: generated/2026/05/mcp-security.html
title: MCP Server 安全模型
summary: 信任边界、权限、工具调用风险与部署建议。
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

元数据会覆盖从 HTML 文档中提取的字段。没有元数据时，HTML Vault 会推断标题、摘要、集合、来源类型、时间戳和审核状态。

## 后端 API

后端 API 已包含在 Docker 部署中，也可以通过可选 `agent` extra 手动启动：

```bash
pip install -e ".[agent]"
HTML_VAULT_CONTENT=data/content \
HTML_VAULT_META=data/meta \
HTML_VAULT_PUBLIC=public \
html-vault serve-api --host 127.0.0.1 --port 8787
```

已实现接口：

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

API 覆盖当前前端核心流程：上传、列表、搜索、筛选、阅读、元信息编辑、收藏、归档、取消归档、已归档笔记永久删除、侧栏显隐持久化、重建任务和版本检查。

## 安全模型

默认 Docker 模式面向本地、局域网和私有自托管使用。默认不要求 `HTML_VAULT_API_TOKEN`，因此前端可以直接调用同源 API。

当你把 HTML Vault 暴露到公网时：

- 必须放在 HTTPS 后面。
- 必须在访问应用前要求登录、session 或其他认证。
- 为后端 API 设置 `HTML_VAULT_API_TOKEN`。
- 让反向代理在服务端内部注入后端 token。
- 不要把长期 API token 写进前端 JavaScript。
- 升级前和结构性变更前备份 `data/`。

详见 [DEPLOYMENT.zh-CN.md](DEPLOYMENT.zh-CN.md)，其中包含可复用安全基线和 Caddy Basic Auth 示例。

## 路线图

近期后端与笔记本能力：

- 集合和标签批量操作。
- 备份与恢复流程。
- WebDAV 设置执行。
- 更完整的导入校验和重复内容处理。
- 搜索后端升级路径，例如 SQLite FTS 或 Pagefind。

AI 能力：

- 服务端保存 AI 服务商凭据。
- AI 生成 HTML 笔记。
- 通过全局 AI 侧栏进行知识库问答。
- AI 辅助分类、打标签、总结和清理。
- 对破坏性 AI 批处理提供用户确认和审计记录。

未来产品方向：

- 托管同步和跨设备使用。
- 用户账户与账户安全。
- 商业 AI/云服务集成。
- 更好的移动端 PWA 流程。
- 在保持本地优先数据所有权的前提下提供可选协作功能。

## 仓库结构

```text
app_static/        构建时复制到输出目录的静态工作台 UI
html_vault/        Python 构建器、manifest 逻辑和后端 API
examples/          示例内容与元数据
tests/             构建器和后端 API 测试
deploy/            可选部署示例
docs/              GitHub Pages 官网与只读 Demo
documents/         本地规划文档，Git 忽略
```

## 开发

```bash
pip install -e ".[dev,agent]"
pytest
python tests/run_smoke.py
html-vault build --content examples/content --meta examples/meta --out public
```

## 许可证

MIT
