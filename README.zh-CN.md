# HTML Vault

语言：[English](README.md) | [中文](README.zh-CN.md) | [日本語](README.ja.md)

HTML Vault 是一个静态优先的 HTML 知识工作台。把 HTML 文件放进内容目录，构建 manifest，就可以发布一个卡片式知识库，可托管在任意静态 Web 服务器上。

## 功能

- Manifest v2 知识条目模型。
- 支持 `meta/items/**/*.yml` 旁车元数据。
- 卡片网格，支持按资料库状态、集合、标签筛选。
- 顶部工具栏支持集合与标签复选筛选，并提供一键清空。
- 可在方块卡片与横向条目两种索引样式间切换。
- iframe 阅读页、原文打开、hash 链接。
- 条目卡片和阅读页支持收藏与归档操作。
- 支持 PWA 安装，Web 端作为跨设备主客户端，不再依赖独立桌面端。
- 左侧导入入口用于已有 HTML 文件；右侧 AI 创建入口用于生成新的 HTML 笔记。
- 中文、英文、日语三语界面切换。
- 暗色/亮色模式。
- 左侧边栏和全局 AI 右侧栏都支持拖动调宽，并保存到本地。
- 搜索框右侧新增全局 AI 入口，打开可拖动调宽的右侧栏；上下文会随全部笔记、集合、标签、搜索结果、当前阅读话题以及收藏/归档/复选筛选变化。
- 设置页：AI 服务商配置、用户协议、关于项目、更新文档。
- 资料库/集合/标签侧栏显示管理；集合和标签的新增、重命名、合并、删除需要未来元数据写入服务。
- 设置页新增独立数据区，预留本地备份与恢复、WebDAV 设置、数据导出。
- AI 知识库助理保留为未来批量分类、打标签入口；基于知识库的多轮对话迁移到全局 AI 侧栏。
- 主页搜索框左侧提供“手气不错”魔法棒按钮，可随机打开当前视图中的知识条目。
- 可部署到 GitHub Pages、Cloudflare Pages、Caddy、Nginx、NAS 或任意静态服务器。

## 快速开始

```bash
python -m venv .venv
source .venv/bin/activate
pip install -e .
html-vault build --content examples/content --meta examples/meta --out public
python -m http.server 8080 --directory public
```

打开 `http://localhost:8080`。

## AI 服务商配置

设置页中的 API Key 不会保存到 `localStorage`。静态模式只保存服务商、模型名、Base URL、temperature、max tokens 等非敏感偏好。

Full 模式下，API Key 应只通过 HTTPS 或私有网络发送到受保护的 Agent Server，由服务端作为环境变量或加密凭据保存，并且永远不返回给浏览器。

## 侧栏管理

资料库、集合和标签管理位于设置页。静态模式可以隐藏侧栏导航项，但不会修改原始元数据。资料库是固定系统视图，所以仅支持显隐控制。集合和标签的新增、重命名、合并、删除属于结构性元数据操作，需要未来 Agent Server 或 metadata editor 写回 `meta/items/**/*.yml`。

## 本地数据设置

数据设置区包含浏览器侧备份与恢复、WebDAV 配置占位、JSON 数据导出。静态模式可导出本地 UI 偏好、收藏/归档覆盖状态、侧栏显隐设置和当前 Manifest，但不会备份磁盘上的源 HTML/YAML 文件。

WebDAV 当前只保存非敏感连接字段。密码或应用令牌应交给未来受保护的 Agent Server 处理。

## PWA 支持

构建产物包含 `manifest.webmanifest` 与 `sw.js`，支持的浏览器可以将 HTML Vault 安装为 PWA。Service Worker 会缓存应用外壳和访问过的内容，用于更快加载和基础离线访问。

## 规划中的 AI 模块

AI 知识库助理是未来批量操作入口，用于对知识库数据库重新分类、重新打标签或更新审核状态。当前提交时会弹出二次确认，然后显示开发中，不会修改数据。

全局 AI 侧栏将承载未来的上下文问答与生成 HTML 笔记能力。当前仅落实界面，不会发送模型请求；真实生成仍需要后续 Agent Server。

## 开发

```bash
pip install -e ".[dev]"
pytest
python tests/run_smoke.py
html-vault build --content examples/content --meta examples/meta --out public
```

## 许可证

MIT
