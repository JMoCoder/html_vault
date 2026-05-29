# HTML Vault

语言：[English](README.md) | [中文](README.zh-CN.md) | [日本語](README.ja.md)

HTML Vault 是一个静态优先的 HTML 知识工作台。把 HTML 文件放进内容目录，构建 manifest，就可以发布一个卡片式知识库，可托管在任意静态 Web 服务器上。

## 功能

- Manifest v2 知识条目模型。
- 支持 `meta/items/**/*.yml` 旁车元数据。
- 卡片网格，支持按资料库状态、集合、标签筛选。
- iframe 阅读页、原文打开、hash 链接。
- 新建知识入口，可对接未来 Agent Server。
- 中文、英文、日语三语界面切换。
- 暗色/亮色模式。
- 设置页：AI 服务商配置、用户协议、关于项目、更新文档。
- 集合/标签侧栏显示管理；新增、重命名、合并、删除需要未来元数据写入服务。
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

集合和标签管理位于设置页。静态模式可以隐藏侧栏导航项，但不会修改原始元数据。新增、重命名、合并、删除属于结构性元数据操作，需要未来 Agent Server 或 metadata editor 写回 `meta/items/**/*.yml`。

## 开发

```bash
pip install -e ".[dev]"
pytest
python tests/run_smoke.py
html-vault build --content examples/content --meta examples/meta --out public
```

## 许可证

MIT
