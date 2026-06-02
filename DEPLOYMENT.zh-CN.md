# HTML Vault 部署安全基线

语言：[English](DEPLOYMENT.md) | [中文](DEPLOYMENT.zh-CN.md)

本文件定义项目层面可复用的部署与安全措施。它不是 VPS 系统加固清单；每台主机仍需要常规 OS、防火墙、SSH、TLS 和备份加固。

## 环境角色

- `main`：稳定生产分支。
- `develop`：日常开发与测试分支。
- 本机：开发环境与本地笔记本测试环境。
- VPS：生产运行环境，同时承担真实场景验证。
- `data/`：私有笔记本数据，不提交到 Git。

## 最低生产安全要求

不要在没有认证边界的情况下，把后端 API 直接暴露到公网。

项目层面必需控制：

- 后端设置 `HTML_VAULT_API_TOKEN`。
- 设置 `HTML_VAULT_CORS_ORIGINS` 为准确的前端公网来源。
- 静态前端和 API 都放在 HTTPS 后面。
- 优先用反向代理登录认证保护整个站点。
- `data/content`、`data/meta` 和备份目录放在 Git 仓库之外。
- API Key 和后续模型凭据只保存在服务端。
- 用 `HTML_VAULT_MAX_UPLOAD_BYTES` 限制上传大小。
- 部署前、结构性升级前备份 `data/`。

## 后端环境变量

```bash
HTML_VAULT_CONTENT=/srv/html-vault/data/content
HTML_VAULT_META=/srv/html-vault/data/meta
HTML_VAULT_PUBLIC=/srv/html-vault/public
HTML_VAULT_TITLE="HTML Vault"
HTML_VAULT_MAX_UPLOAD_BYTES=10485760
HTML_VAULT_API_TOKEN="replace-with-a-long-random-token"
HTML_VAULT_CORS_ORIGINS="https://vault.example.com"
```

后端只监听 localhost 或私有网络地址：

```bash
html-vault serve-api --host 127.0.0.1 --port 8787
```

## 前端 Token

本地测试可以让前端读取：

```html
<script>
  window.HTML_VAULT_AGENT_URL = "https://vault.example.com";
  window.HTML_VAULT_AGENT_TOKEN = "replace-with-a-long-random-token";
</script>
```

前端也会读取 `localStorage.html-vault-agent-token`，方便开发调试。生产环境优先使用反向代理登录/session 保护，不建议把长期 token 直接写进前端 HTML。为了兼容 iframe/raw HTML 访问，项目支持 query token，但它不应作为公网唯一安全边界。

## 反向代理边界

推荐生产布局：

```text
Browser
  -> 带登录/session 的 HTTPS 反向代理
    -> static public/ frontend
    -> /api/* 反代到 127.0.0.1:8787
```

反向代理应当：

- 终止 TLS；
- 访问应用前要求登录；
- 只转发明确需要的路径；
- 设置上传 body 大小限制；
- 不记录 Authorization header 或 query token。

## 部署流程

1. 在 `develop` 开发和测试。
2. 本地跑完整测试。
3. 将 `develop` 合并到 `main` 作为生产发布。
4. VPS 拉取 `main`。
5. 备份 `/srv/html-vault/data`。
6. 重新构建 `public`。
7. 重启后端服务。
8. 验证登录、上传、搜索、阅读、归档和备份。

## 数据策略

`data/` 是私有运行时数据。它应该备份，不应推送到 GitHub。

推荐生产数据路径：

```text
/srv/html-vault/data/content
/srv/html-vault/data/meta
/srv/html-vault/backups
```

Git 只保存应用代码、测试和文档。
