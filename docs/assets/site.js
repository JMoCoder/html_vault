(function () {
  "use strict";

  const dict = {
    en: {
      navIssue: "The Idea", navReader: "Reader + Library", navFlywheel: "AI Flywheel",
      navPublish: "Publish", navDeploy: "Deploy", liveDemo: "Live demo",

      coverIssue: "Issue 0.6.8", coverEdition: "Self-hosted Edition", coverMit: "MIT / Open Source",
      coverKicker: "A knowledge tool that keeps your files yours",
      coverLine1: "Scattered HTML files,", coverLine2: "finally a home.",
      coverLede: "HTMlore gathers the HTML files spread across your disk into one place — a reader and a knowledge base at the same time. AI keeps extending, iterating and settling what you learn, and a free static host turns any note into a shareable page that builds your personal brand.",
      openDemo: "Open the live demo", readStory: "Read the story ↓",
      idx01: "Reader & Library", idx01d: "One library for every HTML file",
      idx02: "The Learning Flywheel", idx02d: "AI extends, iterates, settles",
      idx03: "Publish & Brand", idx03d: "Free static hosting, instant share",

      ch01Eyebrow: "Reader + Knowledge base",
      ch01Title: "Every HTML file you saved, in one place you can actually read.",
      ch01Lead: "HTML files pile up everywhere — exported articles, AI answers saved to disk, old reports, single-page apps. HTMlore imports them into one library, reads them in a clean card workspace, and organizes them with collections, tags, favorites and search. It is a reader and a knowledge base in the same window.",
      ch01Aside1: "<strong>Files stay portable.</strong> Notes remain real HTML on disk — inspect, copy, back up, or serve them with ordinary web tools. Nothing locked in a database.",
      ch01Aside2: "<strong>Organize without friction.</strong> Collections, multi-select tags with AND/OR, favorites, archive, sort and full-text search keep a growing library navigable.",
      ch01Aside3: "<strong>Read, don't dig.</strong> Open any note full-screen, view the original file, copy or share its link — the reading view is the workspace.",

      swLibrary: "Library", swAll: "All notes", swReading: "Reading", swGenerated: "AI generated", swImported: "Imported",
      swTags: "Tags", swSearch: "Search your library…", swAiBtn: "AI",
      swCard1Meta: "AI / MCP", swCard1: "MCP Server Security Model", swCard1d: "Trust boundaries, permissions and tool-call risks.",
      swCard2Meta: "Reading / Design", swCard2: "Notes on Editorial Layout", swCard2d: "Grids, rhythm and hierarchy for dense reading.",
      swCard3Meta: "Deploy / Docker", swCard3: "Single-container Deployment", swCard3d: "One service, persistent data, simple backup.",
      swCard4Meta: "LLM / Notes", swCard4: "Prompting Patterns I Reuse", swCard4d: "A living page, extended after every session.",
      spreadCap: "The card workspace — reader and library in a single view.",

      ch02Eyebrow: "The learning flywheel",
      ch02Title: "Knowledge that compounds: AI extends it, iterates it, settles it.",
      ch02Lead: "A note isn't a dead file. Ask AI over your own library and the answer becomes a new HTML note. Revisit it, refine it, and the page deepens. Each turn feeds the next — extend, iterate, settle — until scattered reading becomes a personal body of knowledge that quietly compounds over time.",
      ch02Aside1: "<strong>Grounded in your library.</strong> The AI layer works over notes you choose as context — answers stay tied to what you've actually collected.",
      ch02Aside2: "<strong>Output is a note, not a chat bubble.</strong> Generated HTML lands back in the library, ready to read, tag, and grow.",
      ch02Aside3: "<strong>Credentials stay server-side.</strong> Model keys live in the backend, never baked into the static frontend.",
      fwCapture: "Capture", fwExtend: "Extend", fwIterate: "Iterate", fwSettle: "Settle",
      fwCaptureDesc: "Save an HTML note — an article, an idea, an AI answer — into your library.",
      fwExtendDesc: "Ask AI across your library; the reply comes back as a new note.",
      fwIterateDesc: "Revisit and refine it; the page deepens with every pass.",
      fwSettleDesc: "It settles into your library — tagged, searchable, and reusable.",
      fwLoop: "↻ Repeat — scattered reading compounds into your own knowledge",

      ch03Eyebrow: "Publish & personal brand",
      ch03Title: "A free static host for your HTML — share in a click, build a name.",
      ch03Lead: "Any note can become a public page. HTMlore builds a static site from your content — host it for free on Pages-style infrastructure, send a link, and your work is online. No build pipeline, no server bill. Over time your published notes become a body of work — the quiet foundation of a personal brand.",
      ch03Aside1: "<strong>Static by design.</strong> Build a read-only site from existing content and metadata, then serve it anywhere static files live.",
      ch03Aside2: "<strong>Free to host, instant to share.</strong> No subscription to publish — copy a link and your page is live for anyone.",
      ch03Aside3: "<strong>Installable as a PWA.</strong> A manifest and service worker make the workspace feel like an app on any device.",
      pcReadTitle: "Reads like a page", pcReadText: "Polished, fast, mobile-ready HTML — not a database export.",
      pcShareTitle: "Share in one link", pcShareText: "Copy and send. The recipient just opens a URL.",
      pcCostTitle: "Free hosting", pcCostText: "Static output runs on free Pages-style hosts.",
      pcBrandTitle: "Build a brand", pcBrandText: "A growing set of published notes becomes your portfolio.",

      featEyebrow: "In the box", featTitle: "Built like an operations workbench, not a toy.",
      feat1: "Import & storage", feat1d: "Upload HTML into generated or imported libraries, raw content kept outside Git.",
      feat2: "Browse & filter", feat2d: "Collections, tags, favorites, archive, search, sort, and AND/OR tag filters.",
      feat3: "Reader workflow", feat3d: "Full HTML reading, original-file access, copy/share, metadata editing, archive & restore.",
      feat4: "AI-ready sidebar", feat4d: "Contextual Q&A and note generation grounded in manually selected files.",
      feat5: "Self-hosted & multi-user", feat5d: "Built-in login, HttpOnly sessions, per-user notebooks, documented security boundary.",
      feat6: "Deploy anywhere", feat6d: "One Docker service, a static build mode, and a PWA — pick what fits.",

      deployEyebrow: "Two minutes to running", deployTitle: "Your data, your machine.",
      deployText: "Run the full notebook in a single Docker container on a laptop, NAS, LAN box or private VPS. Or build a static site for free public hosting. The files never leave your control.",
      openDemo2: "Open the live demo", viewSource: "View source", termOpen: "open",

      footerTag: "Your HTML, your lore, your brand.",
      footerVersion: "Issue 0.6.8 · MIT licensed", footerRights: "Your HTML files remain yours."
    },

    zh: {
      navIssue: "理念", navReader: "阅读器 + 知识库", navFlywheel: "AI 飞轮",
      navPublish: "发布", navDeploy: "部署", liveDemo: "在线演示",

      coverIssue: "刊号 0.6.8", coverEdition: "自托管版", coverMit: "MIT / 开源",
      coverKicker: "一个让文件始终属于你的知识工具",
      coverLine1: "散落各处的 HTML，", coverLine2: "终于有了归处。",
      coverLede: "HTMlore 把散落在硬盘各处的 HTML 文件聚拢到一起 —— 它既是阅读器，也是知识库。AI 不断延展、迭代、沉淀你所学的内容；免费的静态托管又让任意一篇笔记变成可分享的页面，逐步建立起你的个人品牌。",
      openDemo: "打开在线演示", readStory: "往下读 ↓",
      idx01: "阅读器 & 知识库", idx01d: "所有 HTML 文件归于一处",
      idx02: "学习沉淀飞轮", idx02d: "AI 延展、迭代、沉淀",
      idx03: "发布 & 个人品牌", idx03d: "免费静态托管，一键分享",

      ch01Eyebrow: "阅读器 + 知识库",
      ch01Title: "你存下的每个 HTML 文件，终于汇到一个能好好阅读的地方。",
      ch01Lead: "HTML 文件遍布各处 —— 导出的文章、随手保存的 AI 回答、旧报告、单页应用。HTMlore 把它们导入同一个库，用清爽的卡片工作区阅读，并以合集、标签、收藏与搜索加以组织。在同一个窗口里，它既是阅读器，也是知识库。",
      ch01Aside1: "<strong>文件始终可携。</strong> 笔记在磁盘上仍是真正的 HTML —— 可查看、复制、备份，也能用普通 Web 工具直接打开，绝不锁进数据库。",
      ch01Aside2: "<strong>组织毫不费力。</strong> 合集、支持与/或的多选标签、收藏、归档、排序与全文搜索，让不断增长的库始终井然有序。",
      ch01Aside3: "<strong>只管读，不用翻。</strong> 全屏打开任意笔记、查看原始文件、复制或分享链接 —— 阅读视图本身就是工作区。",

      swLibrary: "资料库", swAll: "全部笔记", swReading: "阅读中", swGenerated: "AI 生成", swImported: "已导入",
      swTags: "标签", swSearch: "搜索你的知识库…", swAiBtn: "AI",
      swCard1Meta: "AI / MCP", swCard1: "MCP 服务安全模型", swCard1d: "信任边界、权限与工具调用风险。",
      swCard2Meta: "阅读 / 设计", swCard2: "编辑排版笔记", swCard2d: "为密集阅读而设的网格、节奏与层级。",
      swCard3Meta: "部署 / Docker", swCard3: "单容器部署", swCard3d: "一个服务、数据持久、备份简单。",
      swCard4Meta: "LLM / 笔记", swCard4: "我反复复用的提示词模式", swCard4d: "一篇活页，每次对话后继续延展。",
      spreadCap: "卡片工作区 —— 阅读器与资料库同处一屏。",

      ch02Eyebrow: "学习沉淀飞轮",
      ch02Title: "会复利的知识：AI 延展它、迭代它、沉淀它。",
      ch02Lead: "笔记不是一个死文件。让 AI 在你自己的库里检索，答案会变成一篇新的 HTML 笔记。再次回看、再次打磨，页面随之加深。每一轮都喂养下一轮 —— 延展、迭代、沉淀 —— 直到零散的阅读汇成一套属于你的知识体系，在时间里悄然复利。",
      ch02Aside1: "<strong>立足于你的库。</strong> AI 层在你选定为上下文的笔记上工作 —— 答案始终扎根于你真正收藏过的内容。",
      ch02Aside2: "<strong>产出是笔记，而非聊天气泡。</strong> 生成的 HTML 回落到资料库，可阅读、可打标签、可继续生长。",
      ch02Aside3: "<strong>凭据留在服务端。</strong> 模型密钥存于后端，绝不写进静态前端。",
      fwCapture: "采集", fwExtend: "延展", fwIterate: "迭代", fwSettle: "沉淀",
      fwCaptureDesc: "把一篇 HTML 笔记 —— 文章、想法或 AI 回答 —— 收进你的库。",
      fwExtendDesc: "在你的库上向 AI 提问，回答作为一篇新笔记返回。",
      fwIterateDesc: "回看、打磨，页面在每一轮中愈发深入。",
      fwSettleDesc: "沉淀入库 —— 打好标签、可被搜索、可被复用。",
      fwLoop: "↻ 周而复始 —— 零散阅读复利成你自己的知识",

      ch03Eyebrow: "发布 & 个人品牌",
      ch03Title: "免费托管你的 HTML —— 一键分享，建立名声。",
      ch03Lead: "任意笔记都能变成一张公开页面。HTMlore 从你的内容生成一个静态站点 —— 用 Pages 式的基础设施免费托管，发一条链接，你的作品就上线了。无需构建流水线，也没有服务器账单。日积月累，你发布的笔记汇成一份作品集 —— 这正是个人品牌悄然奠基之处。",
      ch03Aside1: "<strong>天生静态。</strong> 从现有内容与元数据生成只读站点，可部署在任何能放静态文件的地方。",
      ch03Aside2: "<strong>托管免费，分享即时。</strong> 发布无需订阅 —— 复制链接，任何人都能立即打开你的页面。",
      ch03Aside3: "<strong>可安装为 PWA。</strong> manifest 与 Service Worker 让工作区在任意设备上都像一个原生应用。",
      pcReadTitle: "读起来就是一张页面", pcReadText: "精致、快速、适配移动端的 HTML —— 而非数据库导出。",
      pcShareTitle: "一条链接即可分享", pcShareText: "复制发送，对方只需打开一个网址。",
      pcCostTitle: "免费托管", pcCostText: "静态产物可跑在免费的 Pages 式托管上。",
      pcBrandTitle: "建立品牌", pcBrandText: "不断增长的发布笔记，渐成你的作品集。",

      featEyebrow: "开箱即有", featTitle: "按运维工作台打造，而非玩具。",
      feat1: "导入与存储", feat1d: "将 HTML 上传至生成库或导入库，原始内容保留在 Git 之外。",
      feat2: "浏览与筛选", feat2d: "合集、标签、收藏、归档、搜索、排序，以及与/或标签筛选。",
      feat3: "阅读工作流", feat3d: "完整 HTML 阅读、原文件访问、复制/分享、元数据编辑、归档与还原。",
      feat4: "AI 就绪侧栏", feat4d: "基于手动选定文件的情境问答与笔记生成。",
      feat5: "自托管与多用户", feat5d: "内置登录、HttpOnly 会话、按用户隔离的笔记本、清晰的安全边界。",
      feat6: "随处部署", feat6d: "一个 Docker 服务、一种静态构建模式、一个 PWA —— 按需选用。",

      deployEyebrow: "两分钟即可运行", deployTitle: "你的数据，你的机器。",
      deployText: "在笔记本、NAS、局域网主机或私有 VPS 上，用单个 Docker 容器运行完整的笔记本；或构建静态站点用于免费的公开托管。文件始终在你的掌控之中。",
      openDemo2: "打开在线演示", viewSource: "查看源码", termOpen: "打开",

      footerTag: "你的 HTML，你的知识库，你的品牌。",
      footerVersion: "刊号 0.6.8 · MIT 许可", footerRights: "你的 HTML 文件始终属于你。"
    },

    ja: {
      navIssue: "コンセプト", navReader: "リーダー + ライブラリ", navFlywheel: "AI フライホイール",
      navPublish: "公開", navDeploy: "デプロイ", liveDemo: "ライブデモ",

      coverIssue: "第 0.6.8 号", coverEdition: "セルフホスト版", coverMit: "MIT / オープンソース",
      coverKicker: "ファイルをあなたのものに保ち続ける知識ツール",
      coverLine1: "散らばった HTML に、", coverLine2: "ついに居場所を。",
      coverLede: "HTMlore は、ディスク各所に散らばった HTML ファイルを一か所に集めます —— リーダーであり、同時に知識ベースです。AI が学びを絶えず広げ、磨き、定着させ、無料の静的ホスティングが任意のノートを共有可能なページへと変え、あなたのパーソナルブランドを築きます。",
      openDemo: "ライブデモを開く", readStory: "続きを読む ↓",
      idx01: "リーダー & ライブラリ", idx01d: "すべての HTML を一つのライブラリに",
      idx02: "学びのフライホイール", idx02d: "AI が広げ・磨き・定着",
      idx03: "公開 & ブランド", idx03d: "無料の静的ホスト、即共有",

      ch01Eyebrow: "リーダー + 知識ベース",
      ch01Title: "保存したすべての HTML を、ちゃんと読める一か所に。",
      ch01Lead: "HTML ファイルはあちこちに溜まります —— 書き出した記事、保存した AI の回答、古いレポート、シングルページアプリ。HTMlore はそれらを一つのライブラリに取り込み、すっきりしたカード型ワークスペースで読み、コレクション・タグ・お気に入り・検索で整理します。同じ画面で、リーダーであり知識ベースです。",
      ch01Aside1: "<strong>ファイルは可搬のまま。</strong> ノートはディスク上で本物の HTML のまま —— 閲覧・コピー・バックアップでき、普通の Web ツールで開けます。データベースに閉じ込めません。",
      ch01Aside2: "<strong>摩擦なく整理。</strong> コレクション、AND/OR 対応の複数タグ、お気に入り、アーカイブ、並べ替え、全文検索が、増え続けるライブラリを見通しよく保ちます。",
      ch01Aside3: "<strong>掘らずに読む。</strong> 任意のノートを全画面で開き、元ファイルを表示し、リンクをコピー・共有 —— 読書ビューがそのままワークスペースです。",

      swLibrary: "ライブラリ", swAll: "すべて", swReading: "閲覧中", swGenerated: "AI 生成", swImported: "取り込み済",
      swTags: "タグ", swSearch: "ライブラリを検索…", swAiBtn: "AI",
      swCard1Meta: "AI / MCP", swCard1: "MCP サーバのセキュリティモデル", swCard1d: "信頼境界・権限・ツール呼び出しのリスク。",
      swCard2Meta: "閲覧 / デザイン", swCard2: "エディトリアル組版ノート", swCard2d: "密な読書のためのグリッド・リズム・階層。",
      swCard3Meta: "デプロイ / Docker", swCard3: "シングルコンテナ運用", swCard3d: "一つのサービス、永続データ、簡単なバックアップ。",
      swCard4Meta: "LLM / ノート", swCard4: "再利用するプロンプトの型", swCard4d: "生きたページ。対話のたびに広がる。",
      spreadCap: "カード型ワークスペース —— リーダーとライブラリが一画面に。",

      ch02Eyebrow: "学びのフライホイール",
      ch02Title: "複利で増える知識 —— AI が広げ、磨き、定着させる。",
      ch02Lead: "ノートは死んだファイルではありません。自分のライブラリ上で AI に尋ねれば、答えは新しい HTML ノートになります。読み返し、磨けば、ページは深まります。一巡が次の一巡を養い —— 広げ、磨き、定着 —— 散らばった読書が、時とともに静かに複利で増えていく、あなただけの知識体系になります。",
      ch02Aside1: "<strong>あなたのライブラリに根ざす。</strong> AI 層は文脈として選んだノート上で動作 —— 答えは実際に集めた内容に結びついたまま。",
      ch02Aside2: "<strong>出力はノート、チャットの吹き出しではない。</strong> 生成された HTML はライブラリに戻り、読み・タグ付け・成長へ。",
      ch02Aside3: "<strong>資格情報はサーバ側に。</strong> モデルの鍵はバックエンドに置き、静的フロントには決して埋め込みません。",
      fwCapture: "収集", fwExtend: "拡張", fwIterate: "反復", fwSettle: "定着",
      fwCaptureDesc: "HTML ノート —— 記事・アイデア・AI の回答 —— をライブラリに収める。",
      fwExtendDesc: "ライブラリ上で AI に尋ね、回答が新しいノートとして返る。",
      fwIterateDesc: "読み返して磨くたびに、ページは深まっていく。",
      fwSettleDesc: "ライブラリに定着 —— タグ付け・検索・再利用が可能に。",
      fwLoop: "↻ 繰り返すほど、散らばった読書が知識へと複利で増える",

      ch03Eyebrow: "公開 & パーソナルブランド",
      ch03Title: "HTML の無料静的ホスト —— ワンクリックで共有し、名を築く。",
      ch03Lead: "どのノートも公開ページにできます。HTMlore はあなたのコンテンツから静的サイトを生成 —— Pages 風のインフラで無料ホストし、リンクを送れば作品はオンラインに。ビルドパイプラインもサーバ代も不要。公開したノートはやがて作品群となり —— それがパーソナルブランドの静かな土台になります。",
      ch03Aside1: "<strong>設計からして静的。</strong> 既存のコンテンツとメタデータから読み取り専用サイトを生成し、静的ファイルが置ける場所ならどこでも配信。",
      ch03Aside2: "<strong>ホスト無料、共有は即時。</strong> 公開にサブスクは不要 —— リンクをコピーすれば誰でも開けます。",
      ch03Aside3: "<strong>PWA としてインストール可能。</strong> manifest と Service Worker で、どの端末でもアプリのように。",
      pcReadTitle: "ページとして読める", pcReadText: "洗練され、速く、モバイル対応の HTML —— DB 出力ではなく。",
      pcShareTitle: "リンク一つで共有", pcShareText: "コピーして送るだけ。相手は URL を開くだけ。",
      pcCostTitle: "無料ホスティング", pcCostText: "静的成果物は無料の Pages 風ホストで動作。",
      pcBrandTitle: "ブランドを築く", pcBrandText: "増えていく公開ノートが、あなたのポートフォリオに。",

      featEyebrow: "同梱の機能", featTitle: "おもちゃではなく、運用ワークベンチとして。",
      feat1: "取り込みと保存", feat1d: "生成ライブラリや取り込みライブラリへ HTML をアップ、原文は Git 外に保持。",
      feat2: "閲覧と絞り込み", feat2d: "コレクション・タグ・お気に入り・アーカイブ・検索・並べ替え・AND/OR タグ絞り込み。",
      feat3: "読書ワークフロー", feat3d: "完全な HTML 閲覧、元ファイルアクセス、コピー/共有、メタ編集、アーカイブと復元。",
      feat4: "AI 対応サイドバー", feat4d: "手動で選んだファイルに根ざした文脈 Q&A とノート生成。",
      feat5: "セルフホスト & マルチユーザー", feat5d: "内蔵ログイン、HttpOnly セッション、ユーザー別ノート、明文化された境界。",
      feat6: "どこでもデプロイ", feat6d: "一つの Docker サービス、静的ビルド、PWA —— 用途に応じて選択。",

      deployEyebrow: "2 分で起動", deployTitle: "あなたのデータ、あなたのマシン。",
      deployText: "ノート PC・NAS・LAN マシン・プライベート VPS 上で、単一の Docker コンテナとしてノートブックを実行。あるいは無料公開向けに静的サイトを生成。ファイルはあなたの管理下から離れません。",
      openDemo2: "ライブデモを開く", viewSource: "ソースを見る", termOpen: "開く",

      footerTag: "あなたの HTML、あなたの知識、あなたのブランド。",
      footerVersion: "第 0.6.8 号 · MIT ライセンス", footerRights: "あなたの HTML ファイルはあなたのものです。"
    }
  };

  const SUPPORTED = ["en", "zh", "ja"];

  function detectLang() {
    try {
      const saved = localStorage.getItem("hv-lang");
      if (saved && SUPPORTED.includes(saved)) return saved;
    } catch (e) {}
    const nav = (navigator.language || "en").toLowerCase();
    if (nav.startsWith("zh")) return "zh";
    if (nav.startsWith("ja")) return "ja";
    return "en";
  }

  function applyLang(lang) {
    const table = dict[lang] || dict.en;
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      const key = el.getAttribute("data-i18n");
      if (table[key] != null) el.innerHTML = table[key];
    });
    document.querySelectorAll(".language-switch button").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });
    try { localStorage.setItem("hv-lang", lang); } catch (e) {}
  }

  function detectTheme() {
    try {
      const saved = localStorage.getItem("hv-theme");
      if (saved === "light" || saved === "dark") return saved;
    } catch (e) {}
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("hv-theme", theme); } catch (e) {}
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyLang(detectLang());
    applyTheme(detectTheme());

    document.querySelectorAll(".language-switch button").forEach(function (btn) {
      btn.addEventListener("click", function () { applyLang(btn.getAttribute("data-lang")); });
    });

    const toggle = document.getElementById("theme-toggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        const cur = document.documentElement.getAttribute("data-theme");
        applyTheme(cur === "dark" ? "light" : "dark");
      });
    }

    // ---- full-page scroll: jump to the next section page ----
    const nextBtn = document.getElementById("scroll-next");
    const pages = Array.prototype.slice.call(document.querySelectorAll("main > section, footer.colophon"));

    const HEADER = 64; // sticky masthead offset

    function absTop(el) {
      return Math.round(el.getBoundingClientRect().top + window.scrollY);
    }

    function currentPageTop() {
      return window.scrollY + HEADER;
    }

    function nextPageTop() {
      const y = currentPageTop();
      for (let i = 0; i < pages.length; i++) {
        const t = absTop(pages[i]);
        if (t > y + 24) return t;
      }
      return null;
    }

    function goNext() {
      const targetTop = nextPageTop();
      if (targetTop === null) return;
      window.scrollTo({ top: Math.max(0, targetTop - HEADER), behavior: "smooth" });
    }

    function updateBtn() {
      if (!nextBtn) return;
      const y = window.scrollY;
      const hasNext = nextPageTop() !== null;
      const atBottom = (window.innerHeight + y) >= document.body.scrollHeight - 4;
      nextBtn.classList.toggle("is-hidden", !hasNext || atBottom);
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", goNext);
      let dimTimer;
      window.addEventListener("scroll", function () {
        nextBtn.classList.add("dim");
        clearTimeout(dimTimer);
        dimTimer = setTimeout(function () { nextBtn.classList.remove("dim"); }, 320);
        updateBtn();
      }, { passive: true });
      window.addEventListener("resize", updateBtn);
      updateBtn();
    }
  });
})();
