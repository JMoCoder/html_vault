const i18n = {
  en: {
    appLanguage: "en",
    sidebarAria: "Vault navigation",
    readerAria: "Reader",
    readerFrameTitle: "HTML knowledge item",
    closeReader: "Close reader",
    home: "Home",
    language: "Language",
    toggleTheme: "Toggle dark and light mode",
    settings: "Settings",
    settingsTitle: "Project settings",
    closeSettings: "Close settings",
    settingsSections: "Settings sections",
    libraryManagement: "Library",
    collectionManagement: "Collections",
    tagManagement: "Tags",
    libraryManagementIntro: "Library filters are fixed system views. You can choose whether each view appears in the sidebar.",
    collectionManagementIntro: "Hide collections from the sidebar now. Add, rename, merge, and delete need a metadata writer because collections are stored on items.",
    tagManagementIntro: "Hide tags from the sidebar now. Add, rename, merge, and delete need a metadata writer because tags are stored on items.",
    managementStaticNote: "Static mode can only control sidebar visibility. Structural changes must update item metadata through Agent Server or a metadata editor.",
    addCollection: "Add collection",
    addTag: "Add tag",
    rename: "Rename",
    merge: "Merge",
    delete: "Delete",
    requiresWriter: "Requires metadata writer",
    visible: "Visible",
    aiProviders: "AI providers",
    aiKnowledgeAssistant: "AI knowledge assistant",
    aiKnowledgeAssistantIntro: "Prepare an AI job to reclassify, retag, or review all knowledge items in the library. This module is a placeholder until database write support is implemented.",
    assistantOperation: "Operation",
    assistantClassify: "Reclassify collections",
    assistantTag: "Retag items",
    assistantReview: "Mark review status",
    assistantCustom: "Custom prompt",
    assistantPrompt: "Prompt",
    assistantPromptPlaceholder: "Describe how AI should reorganize or tag the knowledge base.",
    assistantImpactNote: "This type of operation may rewrite existing database metadata. The real submit flow must show a second confirmation before it runs.",
    submitAssistantJob: "Submit AI job",
    assistantConfirm: "This may affect the existing knowledge database. Continue?",
    assistantComingSoon: "Development in progress. No database changes were made.",
    aiAgents: "AI agents",
    aiAgentsIntro: "Multi-turn AI agents based on knowledge base files.",
    aiAgentsPlaceholder: "This area will host multi-turn conversations over selected library files after Agent Server support is added.",
    developmentInProgress: "Development in progress",
    userAgreement: "User agreement",
    aboutProject: "About project",
    updateDocs: "Update docs",
    aiProviderIntro: "Configure the provider and model used by the optional Agent Server.",
    provider: "Provider",
    customProvider: "Custom provider",
    currentModel: "Current model",
    apiBaseUrl: "API base URL",
    apiKey: "API key",
    apiKeyPlaceholder: "Stored only by Agent Server, not in this browser",
    newModel: "Add model",
    temperature: "Temperature",
    maxTokens: "Max tokens",
    keyStorageNote: "Security: API keys are not saved in localStorage. In static mode this form only saves non-sensitive preferences. In full mode the key is sent to the Agent Server over your protected connection and should be encrypted or stored as a server environment secret.",
    saveProviderConfig: "Save configuration",
    testConnection: "Test connection",
    settingsSavedStatic: "Saved local model preferences. API key was not stored.",
    settingsNeedsAgent: "Agent Server is not configured. API key was not sent or saved.",
    settingsSavedAgent: "Configuration sent to Agent Server.",
    settingsAgentFailed: "Agent Server did not accept the configuration.",
    termsIntro: "HTML Vault is designed for personal and team knowledge assets.",
    termsPrivateUse: "Use it with content you own, have permission to process, or can lawfully store for private use.",
    termsCopyright: "Generated notes should summarize and cite sources instead of copying protected works wholesale.",
    termsSecurity: "You are responsible for protecting deployed Agent APIs, uploads, and model credentials.",
    aboutIntro: "HTML Vault turns HTML files into a card-based static knowledge workspace.",
    aboutStaticFirst: "HTML and YAML files remain the knowledge source of truth; the database should only hold optional job state.",
    aboutVersion: "Current early version: 0.2.0.",
    updatesIntro: "Project updates are tracked in the repository and local planning docs.",
    updatesChangelog: "Public release notes live in CHANGELOG.md.",
    updatesDocsLocal: "Product planning documents under docs/ are local-only and ignored by Git.",
    updatesNext: "Next major work: Agent Server, secure provider storage, Pagefind, and metadata editing.",
    loading: "Loading",
    items: "{count} items",
    library: "Library",
    collections: "Collections",
    tags: "Tags",
    newButton: "+ Import",
    allItems: "All Items",
    inbox: "Inbox",
    recent: "Recent",
    favorites: "Favorites",
    generated: "Generated",
    imported: "Imported",
    needsReview: "Needs Review",
    knowledgeWorkspace: "Knowledge Workspace",
    feelingLucky: "I'm feeling lucky",
    search: "Search",
    searchTitle: "Search: {query}",
    searchPlaceholder: "Title, summary, tag, path",
    manifestMissing: "Manifest not found. Run <code>html-vault build</code> first.",
    noMatches: "No matching HTML knowledge items.",
    newKnowledgeItem: "New Knowledge Item",
    createHtmlNote: "Create with AI",
    staticMode: "Static mode",
    agentConnected: "Agent connected",
    connectAgent: "Connect an Agent Server to create notes from this entry.",
    inputType: "Input type",
    inputAuto: "Auto",
    inputLink: "Link",
    inputFile: "File",
    inputBook: "Book",
    inputTopic: "Topic",
    newItemPlaceholder: "Paste a link, choose file mode, enter a book, or describe a topic",
    create: "Create",
    emptyInput: "Enter a link, book, file path, or topic first.",
    agentNotConfigured: "Agent Server not configured. Set window.HTML_VAULT_AGENT_URL before loading the app.",
    submittingJob: "Submitting job...",
    queuedJob: "Queued job {jobId}",
    agentUnavailable: "Agent Server is unavailable.",
    noSummary: "No summary yet.",
    read: "Read",
    original: "Original",
    copyLink: "Copy Link",
    copied: "Copied",
    item: "Item",
  },
  "zh-CN": {
    appLanguage: "zh-CN",
    sidebarAria: "知识库导航",
    readerAria: "阅读器",
    readerFrameTitle: "HTML 知识条目",
    closeReader: "关闭阅读器",
    home: "回到主页",
    language: "语言",
    toggleTheme: "切换暗色与亮色模式",
    settings: "设置",
    settingsTitle: "项目设置",
    closeSettings: "关闭设置",
    settingsSections: "设置分区",
    libraryManagement: "资料库管理",
    collectionManagement: "集合管理",
    tagManagement: "标签管理",
    libraryManagementIntro: "资料库是固定系统视图。这里仅控制每个视图是否显示在左侧导航栏。",
    collectionManagementIntro: "当前可隐藏侧栏集合。新增、重命名、合并、删除需要元数据写入能力，因为集合保存在条目上。",
    tagManagementIntro: "当前可隐藏侧栏标签。新增、重命名、合并、删除需要元数据写入能力，因为标签保存在条目上。",
    managementStaticNote: "静态模式只能控制侧栏显隐。结构性变更必须通过 Agent Server 或元数据编辑器批量更新条目元数据。",
    addCollection: "新增集合",
    addTag: "新增标签",
    rename: "重命名",
    merge: "合并",
    delete: "删除",
    requiresWriter: "需要元数据写入服务",
    visible: "显示",
    aiProviders: "AI 服务商配置",
    aiKnowledgeAssistant: "AI 知识库助理",
    aiKnowledgeAssistantIntro: "预留 AI 批量任务入口，用于对资料库全部内容重新分类、重新打标签或审核整理。数据库写入能力完成前，这里先作为模块占位。",
    assistantOperation: "任务类型",
    assistantClassify: "重新分类集合",
    assistantTag: "重新打标签",
    assistantReview: "标记审核状态",
    assistantCustom: "自定义提示词",
    assistantPrompt: "提示词",
    assistantPromptPlaceholder: "描述希望 AI 如何整理、分类或标注当前知识库。",
    assistantImpactNote: "这类操作未来会改写现有数据库元数据。真实提交前必须弹出二次确认。",
    submitAssistantJob: "提交 AI 任务",
    assistantConfirm: "这可能影响现有知识库数据库。确认继续吗？",
    assistantComingSoon: "开发中，未对数据库做任何修改。",
    aiAgents: "AI 智能体",
    aiAgentsIntro: "基于知识库文件进行多轮对话的智能体入口。",
    aiAgentsPlaceholder: "Agent Server 支持完成后，这里将承载围绕选定知识库文件的多轮对话。",
    developmentInProgress: "开发中",
    userAgreement: "用户协议",
    aboutProject: "关于项目",
    updateDocs: "更新文档",
    aiProviderIntro: "配置可选 Agent Server 使用的服务商与模型。",
    provider: "服务商",
    customProvider: "自定义服务商",
    currentModel: "当前模型",
    apiBaseUrl: "API 基础地址",
    apiKey: "API Key",
    apiKeyPlaceholder: "只由 Agent Server 保存，不保存在浏览器",
    newModel: "新增模型",
    temperature: "Temperature",
    maxTokens: "最大 Tokens",
    keyStorageNote: "安全说明：API Key 不会写入 localStorage。静态模式只保存非敏感偏好；Full 模式下 Key 只会通过受保护连接发送给 Agent Server，并应由服务端加密保存或作为环境变量管理。",
    saveProviderConfig: "保存配置",
    testConnection: "测试连接",
    settingsSavedStatic: "已保存本地模型偏好。API Key 未被保存。",
    settingsNeedsAgent: "尚未配置 Agent Server。API Key 没有发送，也没有保存。",
    settingsSavedAgent: "配置已发送到 Agent Server。",
    settingsAgentFailed: "Agent Server 未接受该配置。",
    termsIntro: "HTML Vault 用于个人与团队知识资产管理。",
    termsPrivateUse: "请仅处理你拥有、被授权处理，或可合法用于私有保存的内容。",
    termsCopyright: "生成笔记应以总结和来源引用为主，不应整段复制受版权保护的作品。",
    termsSecurity: "你需要自行保护部署后的 Agent API、上传文件和模型凭据。",
    aboutIntro: "HTML Vault 将 HTML 文件变成卡片式静态知识工作台。",
    aboutStaticFirst: "HTML 与 YAML 文件是知识真源；数据库只应保存可选任务状态。",
    aboutVersion: "当前早期版本：0.2.0。",
    updatesIntro: "项目更新记录在仓库与本地规划文档中。",
    updatesChangelog: "公开发布记录保存在 CHANGELOG.md。",
    updatesDocsLocal: "docs/ 下的产品规划文档仅保存在本地，并被 Git 忽略。",
    updatesNext: "后续重点：Agent Server、安全服务商配置、Pagefind、元数据编辑。",
    loading: "加载中",
    items: "{count} 个条目",
    library: "资料库",
    collections: "集合",
    tags: "标签",
    newButton: "+ 导入",
    allItems: "全部条目",
    inbox: "收件箱",
    recent: "最近更新",
    favorites: "收藏",
    generated: "生成内容",
    imported: "导入内容",
    needsReview: "待审核",
    knowledgeWorkspace: "知识工作台",
    feelingLucky: "手气不错",
    search: "搜索",
    searchTitle: "搜索：{query}",
    searchPlaceholder: "标题、摘要、标签、路径",
    manifestMissing: "未找到 Manifest。请先运行 <code>html-vault build</code>。",
    noMatches: "没有匹配的 HTML 知识条目。",
    newKnowledgeItem: "新知识条目",
    createHtmlNote: "用 AI 创建",
    staticMode: "静态模式",
    agentConnected: "Agent 已连接",
    connectAgent: "连接 Agent Server 后，可从这里创建笔记。",
    inputType: "输入类型",
    inputAuto: "自动",
    inputLink: "链接",
    inputFile: "文件",
    inputBook: "书籍",
    inputTopic: "主题",
    newItemPlaceholder: "粘贴链接、切换文件模式、输入书名，或描述一个主题",
    create: "创建",
    emptyInput: "请先输入链接、书籍、文件路径或主题。",
    agentNotConfigured: "尚未配置 Agent Server。请在加载应用前设置 window.HTML_VAULT_AGENT_URL。",
    submittingJob: "正在提交任务...",
    queuedJob: "已加入任务队列 {jobId}",
    agentUnavailable: "Agent Server 不可用。",
    noSummary: "暂无摘要。",
    read: "阅读",
    original: "原文",
    copyLink: "复制链接",
    copied: "已复制",
    item: "条目",
  },
  ja: {
    appLanguage: "ja",
    sidebarAria: "ナレッジベースナビゲーション",
    readerAria: "リーダー",
    readerFrameTitle: "HTML ナレッジ項目",
    closeReader: "リーダーを閉じる",
    home: "ホームへ戻る",
    language: "言語",
    toggleTheme: "ダーク/ライトモードを切り替え",
    settings: "設定",
    settingsTitle: "プロジェクト設定",
    closeSettings: "設定を閉じる",
    settingsSections: "設定セクション",
    libraryManagement: "ライブラリ",
    collectionManagement: "コレクション",
    tagManagement: "タグ",
    libraryManagementIntro: "ライブラリは固定のシステムビューです。ここでは各ビューをサイドバーに表示するかだけを設定できます。",
    collectionManagementIntro: "現在はサイドバーのコレクション表示/非表示のみ変更できます。追加、名前変更、統合、削除にはメタデータ書き込み機能が必要です。",
    tagManagementIntro: "現在はサイドバーのタグ表示/非表示のみ変更できます。追加、名前変更、統合、削除にはメタデータ書き込み機能が必要です。",
    managementStaticNote: "静的モードではサイドバー表示のみ制御できます。構造的な変更には Agent Server またはメタデータエディターによる項目メタデータ更新が必要です。",
    addCollection: "コレクションを追加",
    addTag: "タグを追加",
    rename: "名前変更",
    merge: "統合",
    delete: "削除",
    requiresWriter: "メタデータ書き込みサービスが必要",
    visible: "表示",
    aiProviders: "AI プロバイダー設定",
    aiKnowledgeAssistant: "AI ナレッジアシスタント",
    aiKnowledgeAssistantIntro: "ライブラリ全体を再分類、再タグ付け、レビュー整理する AI ジョブの入口です。データベース書き込み対応まではプレースホルダーです。",
    assistantOperation: "操作",
    assistantClassify: "コレクションを再分類",
    assistantTag: "項目を再タグ付け",
    assistantReview: "レビュー状態を設定",
    assistantCustom: "カスタムプロンプト",
    assistantPrompt: "プロンプト",
    assistantPromptPlaceholder: "AI にナレッジベースをどう整理、分類、タグ付けしてほしいかを書いてください。",
    assistantImpactNote: "この種の操作は既存データベースのメタデータを書き換える可能性があります。実行前には必ず二重確認を表示します。",
    submitAssistantJob: "AI ジョブを送信",
    assistantConfirm: "既存のナレッジデータベースに影響する可能性があります。続行しますか？",
    assistantComingSoon: "開発中です。データベースは変更していません。",
    aiAgents: "AI エージェント",
    aiAgentsIntro: "ナレッジベースファイルをもとにした複数ターン会話の入口です。",
    aiAgentsPlaceholder: "Agent Server 対応後、選択したライブラリファイルに基づく複数ターン会話をここに追加します。",
    developmentInProgress: "開発中",
    userAgreement: "利用規約",
    aboutProject: "プロジェクトについて",
    updateDocs: "更新ドキュメント",
    aiProviderIntro: "任意の Agent Server が使用するプロバイダーとモデルを設定します。",
    provider: "プロバイダー",
    customProvider: "カスタムプロバイダー",
    currentModel: "現在のモデル",
    apiBaseUrl: "API ベース URL",
    apiKey: "API Key",
    apiKeyPlaceholder: "Agent Server のみが保存し、ブラウザーには保存しません",
    newModel: "モデルを追加",
    temperature: "Temperature",
    maxTokens: "最大 Tokens",
    keyStorageNote: "セキュリティ: API Key は localStorage に保存されません。静的モードでは非機密の設定のみ保存します。Full モードでは保護された接続で Agent Server に送信し、サーバー側で暗号化保存または環境変数として管理してください。",
    saveProviderConfig: "設定を保存",
    testConnection: "接続テスト",
    settingsSavedStatic: "ローカルのモデル設定を保存しました。API Key は保存していません。",
    settingsNeedsAgent: "Agent Server が未設定です。API Key は送信も保存もされていません。",
    settingsSavedAgent: "設定を Agent Server に送信しました。",
    settingsAgentFailed: "Agent Server が設定を受け付けませんでした。",
    termsIntro: "HTML Vault は個人およびチームのナレッジ資産管理向けです。",
    termsPrivateUse: "所有している、許可を得ている、または私的保存が合法なコンテンツのみ処理してください。",
    termsCopyright: "生成ノートは保護された著作物を丸ごと複製せず、要約と出典提示を中心にしてください。",
    termsSecurity: "デプロイした Agent API、アップロード、モデル認証情報の保護は利用者の責任です。",
    aboutIntro: "HTML Vault は HTML ファイルをカード型の静的ナレッジワークスペースに変換します。",
    aboutStaticFirst: "HTML と YAML ファイルがナレッジの真のソースです。データベースは任意のジョブ状態のみを保持すべきです。",
    aboutVersion: "現在の初期バージョン: 0.2.0。",
    updatesIntro: "プロジェクト更新はリポジトリとローカル計画ドキュメントで管理します。",
    updatesChangelog: "公開リリースノートは CHANGELOG.md にあります。",
    updatesDocsLocal: "docs/ 配下の製品計画ドキュメントはローカル専用で、Git から除外されます。",
    updatesNext: "次の重点: Agent Server、安全なプロバイダー保存、Pagefind、メタデータ編集。",
    loading: "読み込み中",
    items: "{count} 件",
    library: "ライブラリ",
    collections: "コレクション",
    tags: "タグ",
    newButton: "+ インポート",
    allItems: "すべて",
    inbox: "受信箱",
    recent: "最近更新",
    favorites: "お気に入り",
    generated: "生成済み",
    imported: "インポート済み",
    needsReview: "要確認",
    knowledgeWorkspace: "ナレッジワークスペース",
    feelingLucky: "おまかせ表示",
    search: "検索",
    searchTitle: "検索: {query}",
    searchPlaceholder: "タイトル、概要、タグ、パス",
    manifestMissing: "Manifest が見つかりません。先に <code>html-vault build</code> を実行してください。",
    noMatches: "一致する HTML ナレッジ項目がありません。",
    newKnowledgeItem: "新規ナレッジ項目",
    createHtmlNote: "AI で作成",
    staticMode: "静的モード",
    agentConnected: "Agent 接続済み",
    connectAgent: "Agent Server を接続すると、ここからノートを作成できます。",
    inputType: "入力タイプ",
    inputAuto: "自動",
    inputLink: "リンク",
    inputFile: "ファイル",
    inputBook: "書籍",
    inputTopic: "トピック",
    newItemPlaceholder: "リンク、ファイルモード、書名、またはトピックを入力",
    create: "作成",
    emptyInput: "リンク、書籍、ファイルパス、またはトピックを入力してください。",
    agentNotConfigured: "Agent Server が設定されていません。アプリ読み込み前に window.HTML_VAULT_AGENT_URL を設定してください。",
    submittingJob: "ジョブを送信中...",
    queuedJob: "ジョブをキューに追加しました {jobId}",
    agentUnavailable: "Agent Server を利用できません。",
    noSummary: "概要はまだありません。",
    read: "読む",
    original: "原文",
    copyLink: "リンクをコピー",
    copied: "コピー済み",
    item: "項目",
  },
};

const libraryFilterDefinitions = [
  { value: "all", labelKey: "allItems", test: () => true },
  { value: "inbox", labelKey: "inbox", test: (item) => item.collection === "Inbox" },
  { value: "recent", labelKey: "recent", test: () => true },
  { value: "favorites", labelKey: "favorites", test: (item) => item.favorite },
  { value: "generated", labelKey: "generated", test: (item) => item.agent?.generated || item.source_type === "topic" },
  { value: "imported", labelKey: "imported", test: (item) => item.source_type === "imported" || item.source_type === "html" },
  { value: "needs-review", labelKey: "needsReview", test: (item) => item.review_status === "unreviewed" },
];

const state = {
  manifest: null,
  items: [],
  filter: { type: "library", value: "all" },
  query: "",
  agentUrl: window.HTML_VAULT_AGENT_URL || "",
  language: getInitialLanguage(),
  theme: getInitialTheme(),
  feedbackKey: "connectAgent",
  feedbackParams: {},
  activeSettingsTab: "library",
  aiConfig: loadAiConfig(),
  navConfig: loadNavConfig(),
};

const elements = {
  brandHome: document.querySelector("#brand-home"),
  siteTitle: document.querySelector("#site-title"),
  itemCount: document.querySelector("#item-count"),
  languageSelect: document.querySelector("#language-select"),
  themeToggle: document.querySelector("#theme-toggle"),
  themeIcon: document.querySelector("#theme-icon"),
  settingsOpen: document.querySelector("#settings-open"),
  settingsBack: document.querySelector("#settings-back"),
  settingsPage: document.querySelector("#settings-page"),
  settingsContent: document.querySelector(".settings-content"),
  settingsTabs: document.querySelectorAll("[data-settings-tab]"),
  settingsSections: document.querySelectorAll("[data-settings-section]"),
  collectionManagement: document.querySelector("#collection-management"),
  libraryManagement: document.querySelector("#library-management"),
  tagManagement: document.querySelector("#tag-management"),
  aiSettingsForm: document.querySelector("#ai-settings-form"),
  aiAssistantForm: document.querySelector("#ai-assistant-form"),
  assistantFeedback: document.querySelector("#assistant-feedback"),
  aiProvider: document.querySelector("#ai-provider"),
  currentModel: document.querySelector("#current-model"),
  apiBaseUrl: document.querySelector("#api-base-url"),
  apiKey: document.querySelector("#api-key"),
  newModel: document.querySelector("#new-model"),
  modelTemperature: document.querySelector("#model-temperature"),
  modelMaxTokens: document.querySelector("#model-max-tokens"),
  testProvider: document.querySelector("#test-provider"),
  settingsFeedback: document.querySelector("#settings-feedback"),
  libraryNav: document.querySelector("#library-nav"),
  collectionNav: document.querySelector("#collection-nav"),
  tagNav: document.querySelector("#tag-nav"),
  workspaceTitle: document.querySelector("#workspace-title"),
  luckyButton: document.querySelector("#lucky-button"),
  searchInput: document.querySelector("#search-input"),
  contentGrid: document.querySelector("#content-grid"),
  newCard: document.querySelector("#new-card"),
  newItemForm: document.querySelector("#new-item-form"),
  inputType: document.querySelector("#input-type"),
  newItemInput: document.querySelector("#new-item-input"),
  newFeedback: document.querySelector("#new-feedback"),
  agentStatus: document.querySelector("#agent-status"),
  reader: document.querySelector("#reader"),
  readerClose: document.querySelector("#reader-close"),
  readerTitle: document.querySelector("#reader-title"),
  readerSummary: document.querySelector("#reader-summary"),
  readerSource: document.querySelector("#reader-source"),
  readerTags: document.querySelector("#reader-tags"),
  readerOriginal: document.querySelector("#reader-original"),
  readerCopy: document.querySelector("#reader-copy"),
  readerFrame: document.querySelector("#reader-frame"),
};

async function boot() {
  applyTheme();
  applyTranslations();
  try {
    const response = await fetch("manifest.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`Unable to load manifest: ${response.status}`);
    state.manifest = await response.json();
    state.items = Array.isArray(state.manifest.items) ? state.manifest.items : [];
    renderApp();
    openFromHash();
  } catch (error) {
    elements.contentGrid.innerHTML = `<div class="empty-state">${t("manifestMissing")}</div>`;
    console.error(error);
  }
}

function renderApp() {
  applyTheme();
  applyTranslations();
  elements.siteTitle.textContent = state.manifest.site?.title || "HTML Vault";
  elements.itemCount.textContent = t("items", { count: state.items.length });
  renderFeedback();
  renderLibraryNav();
  renderCollectionNav();
  renderTagNav();
  renderGrid();
  updateAgentStatus();
  renderAiConfig();
  renderManagementLists();
}

function renderLibraryNav() {
  elements.libraryNav.replaceChildren(...libraryFilterDefinitions.filter((filter) => {
    return isManagedItemVisible("library", filter.value);
  }).map((filter) => {
    const count = countLibraryFilter(filter.value);
    return navButton(t(filter.labelKey), count, state.filter.type === "library" && state.filter.value === filter.value, () => {
      selectLibraryFilter(filter.value);
    });
  }));
}

function renderCollectionNav() {
  const buttons = (state.manifest.collections || [])
    .filter((collection) => isManagedItemVisible("collections", collection.name))
    .map((collection) => {
    return navButton(collection.name, collection.count, state.filter.type === "collection" && state.filter.value === collection.name, () => {
      selectCollection(collection.name);
    });
  });
  elements.collectionNav.replaceChildren(...buttons);
}

function renderTagNav() {
  const tags = (state.manifest.tags || [])
    .filter((tag) => isManagedItemVisible("tags", tag.name))
    .map((tag) => {
    const button = document.createElement("button");
    button.className = `tag-filter${state.filter.type === "tag" && state.filter.value === tag.name ? " active" : ""}`;
    button.type = "button";
    button.textContent = `#${tag.name} ${tag.count}`;
    button.addEventListener("click", () => {
      selectTag(tag.name);
    });
    return button;
  });
  elements.tagNav.replaceChildren(...tags);
}

function navButton(label, count, active, onClick) {
  const button = document.createElement("button");
  button.className = `nav-item${active ? " active" : ""}`;
  button.type = "button";
  button.innerHTML = `<span>${escapeHtml(label)}</span><span>${count}</span>`;
  button.addEventListener("click", onClick);
  return button;
}

function countLibraryFilter(value) {
  const filter = libraryFilterDefinitions.find((item) => item.value === value);
  if (!filter) return 0;
  return state.items.filter(filter.test).length;
}

function filteredItems() {
  const query = state.query.trim().toLowerCase();
  let items = [...state.items];

  if (state.filter.type === "library") {
    const filter = libraryFilterDefinitions.find((item) => item.value === state.filter.value);
    items = filter ? items.filter(filter.test) : items;
  } else if (state.filter.type === "collection") {
    items = items.filter((item) => item.collection === state.filter.value);
  } else if (state.filter.type === "tag") {
    items = items.filter((item) => (item.tags || []).includes(state.filter.value));
  }

  if (query) {
    items = items.filter((item) => searchableText(item).includes(query));
  }

  if (state.filter.value === "recent") {
    return items.sort((a, b) => String(b.updated).localeCompare(String(a.updated)));
  }
  return items.sort((a, b) => Number(b.pinned) - Number(a.pinned) || String(b.updated).localeCompare(String(a.updated)));
}

function searchableText(item) {
  return [
    item.title,
    item.summary,
    item.path,
    item.collection,
    item.source_type,
    ...(item.tags || []),
  ].filter(Boolean).join(" ").toLowerCase();
}

function renderGrid() {
  elements.workspaceTitle.textContent = state.query ? t("searchTitle", { query: state.query }) : t("knowledgeWorkspace");
  const items = filteredItems();

  if (items.length === 0) {
    elements.contentGrid.innerHTML = `<div class="empty-state">${t("noMatches")}</div>`;
    return;
  }

  elements.contentGrid.replaceChildren(...items.map(renderCard));
}

function renderCard(item) {
  const card = document.createElement("article");
  card.className = "item-card";
  card.innerHTML = `
    <div class="card-topline">
      <span>${escapeHtml(item.collection || "Inbox")}</span>
      <span>${formatDate(item.updated)}</span>
    </div>
    <h3>${escapeHtml(item.title)}</h3>
    <p>${escapeHtml(item.summary || t("noSummary"))}</p>
    <div class="card-tags">${(item.tags || []).slice(0, 4).map((tag) => `<span>#${escapeHtml(tag)}</span>`).join("")}</div>
    <div class="card-footer">
      <span>${escapeHtml(item.source_type || "html")}</span>
      <div>
        <button type="button" data-read>${escapeHtml(t("read"))}</button>
        <a href="${encodeURI(item.path)}" target="_blank" rel="noreferrer">${escapeHtml(t("original"))}</a>
      </div>
    </div>
  `;
  card.querySelector("[data-read]").addEventListener("click", () => openReader(item));
  card.addEventListener("dblclick", () => openReader(item));
  return card;
}

function openReader(item) {
  elements.reader.hidden = false;
  elements.readerTitle.textContent = item.title;
  elements.readerSummary.textContent = item.summary || "";
  elements.readerSource.textContent = `${item.source_type || "html"} · ${item.collection || "Inbox"}`;
  elements.readerOriginal.href = item.path;
  elements.readerFrame.src = item.path;
  elements.readerTags.replaceChildren(...(item.tags || []).map((tag) => {
    const span = document.createElement("span");
    span.textContent = `#${tag}`;
    return span;
  }));
  window.location.hash = `/${item.id}`;
}

function closeReader() {
  elements.reader.hidden = true;
  elements.readerFrame.removeAttribute("src");
  if (window.location.hash) {
    history.pushState("", document.title, window.location.pathname + window.location.search);
  }
}

function returnToWorkspace() {
  elements.reader.hidden = true;
  elements.readerFrame.removeAttribute("src");
  elements.settingsPage.hidden = true;
  if (window.location.hash) {
    history.pushState("", document.title, window.location.pathname + window.location.search);
  }
}

function goHome() {
  state.filter = { type: "library", value: "all" };
  state.query = "";
  elements.searchInput.value = "";
  returnToWorkspace();
  renderApp();
}

function selectLibraryFilter(value) {
  state.filter = { type: "library", value };
  returnToWorkspace();
  renderApp();
}

function selectCollection(name) {
  state.filter = { type: "collection", value: name };
  returnToWorkspace();
  renderApp();
}

function selectTag(name) {
  state.filter = { type: "tag", value: name };
  returnToWorkspace();
  renderApp();
}

function openSettings(tab = "library", updateHash = true) {
  setSettingsTab(tab, false);
  elements.settingsPage.hidden = false;
  if (updateHash) {
    updateSettingsHash(state.activeSettingsTab);
  }
}

function toggleSettings() {
  if (elements.settingsPage.hidden) {
    openSettings();
  } else {
    closeSettings();
  }
}

function closeSettings() {
  elements.settingsPage.hidden = true;
  if (window.location.hash.startsWith("#/settings")) {
    history.pushState("", document.title, window.location.pathname + window.location.search);
  }
}

function renderSettingsTabs() {
  elements.settingsTabs.forEach((tab) => {
    const active = tab.dataset.settingsTab === state.activeSettingsTab;
    tab.classList.toggle("active", active);
  });
  elements.settingsSections.forEach((section) => {
    const active = section.dataset.settingsSection === state.activeSettingsTab;
    section.classList.toggle("active", active);
  });
  elements.settingsContent.scrollTop = 0;
}

function setSettingsTab(tab, updateHash = true) {
  const validTabs = new Set([...elements.settingsTabs].map((item) => item.dataset.settingsTab));
  state.activeSettingsTab = validTabs.has(tab) ? tab : "library";
  renderSettingsTabs();
  if (updateHash) {
    updateSettingsHash(state.activeSettingsTab);
  }
}

function updateSettingsHash(tab) {
  const nextHash = `#/settings/${tab}`;
  if (window.location.hash !== nextHash) {
    window.location.hash = `/settings/${tab}`;
  }
}

function openFromHash() {
  const id = decodeURIComponent(window.location.hash.replace(/^#\/?/, ""));
  if (id.startsWith("settings")) {
    const tab = id.split("/")[1] || "library";
    openSettings(tab, false);
    return;
  }
  if (!id) return;
  const item = state.items.find((candidate) => candidate.id === id);
  if (item) openReader(item);
}

async function submitNewItem(event) {
  event.preventDefault();
  const input = elements.newItemInput.value.trim();
  if (!input) {
    setFeedback("emptyInput");
    return;
  }

  if (!state.agentUrl) {
    setFeedback("agentNotConfigured");
    return;
  }

  setFeedback("submittingJob");
  try {
    const response = await fetch(`${state.agentUrl.replace(/\/$/, "")}/api/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input_type: elements.inputType.value,
        input,
        options: { output_style: "knowledge_note" },
      }),
    });
    if (!response.ok) throw new Error(`Agent returned ${response.status}`);
    const result = await response.json();
    setFeedback("queuedJob", { jobId: result.job_id || "" });
  } catch (error) {
    setFeedback("agentUnavailable");
    console.error(error);
  }
}

function updateAgentStatus() {
  if (state.agentUrl) {
    elements.agentStatus.textContent = t("agentConnected");
  } else {
    elements.agentStatus.textContent = t("staticMode");
  }
}

function copyReaderLink() {
  const url = window.location.href;
  navigator.clipboard?.writeText(url);
  elements.readerCopy.textContent = t("copied");
  window.setTimeout(() => {
    elements.readerCopy.textContent = t("copyLink");
  }, 1400);
}

function getInitialLanguage() {
  const saved = localStorage.getItem("html-vault-language");
  if (saved && i18n[saved]) return saved;
  return "zh-CN";
}

function setLanguage(language) {
  if (!i18n[language]) return;
  state.language = language;
  localStorage.setItem("html-vault-language", language);
  renderApp();
}

function getInitialTheme() {
  const saved = localStorage.getItem("html-vault-theme");
  if (saved === "dark" || saved === "light") return saved;
  if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) return "dark";
  return "light";
}

function toggleTheme() {
  state.theme = state.theme === "dark" ? "light" : "dark";
  localStorage.setItem("html-vault-theme", state.theme);
  applyTheme();
}

function applyTheme() {
  document.documentElement.dataset.theme = state.theme;
  elements.themeIcon.textContent = state.theme === "dark" ? "☀" : "☾";
}

function loadAiConfig() {
  try {
    return JSON.parse(localStorage.getItem("html-vault-ai-config") || "{}");
  } catch {
    return {};
  }
}

function loadNavConfig() {
  try {
    return JSON.parse(localStorage.getItem("html-vault-nav-config") || '{"library":{},"collections":{},"tags":{}}');
  } catch {
    return { library: {}, collections: {}, tags: {} };
  }
}

function saveNavConfig() {
  localStorage.setItem("html-vault-nav-config", JSON.stringify(state.navConfig));
}

function getManagedItemConfig(type, name) {
  state.navConfig[type] ||= {};
  state.navConfig[type][name] ||= { visible: true };
  return state.navConfig[type][name];
}

function isManagedItemVisible(type, name) {
  const config = getManagedItemConfig(type, name);
  return config.visible !== false;
}

function renderManagementLists() {
  renderLibraryManagement();
  renderManagementList("collections", state.manifest.collections || [], elements.collectionManagement);
  renderManagementList("tags", state.manifest.tags || [], elements.tagManagement);
}

function renderLibraryManagement() {
  const rows = libraryFilterDefinitions.map((filter) => {
    return {
      name: filter.value,
      label: t(filter.labelKey),
      count: countLibraryFilter(filter.value),
    };
  });
  elements.libraryManagement.replaceChildren(...rows.map((item) => renderManagementRow("library", item.name, item.count, item.label)));
}

function renderManagementList(type, items, container) {
  const actions = renderManagementActions(type);
  const rows = items.map((item) => renderManagementRow(type, item.name, item.count));
  container.replaceChildren(actions, ...rows);
}

function renderManagementActions(type) {
  const panel = document.createElement("div");
  panel.className = "management-actions-panel";
  panel.innerHTML = `
    <p>${escapeHtml(t("managementStaticNote"))}</p>
    <div>
      <input type="text" disabled value="" placeholder="${escapeHtml(type === "collections" ? t("addCollection") : t("addTag"))}">
      <button type="button" disabled>${escapeHtml(type === "collections" ? t("addCollection") : t("addTag"))}</button>
    </div>
  `;
  return panel;
}

function renderManagementRow(type, name, count, label = name) {
  const config = getManagedItemConfig(type, name);
  const row = document.createElement("div");
  row.className = "management-row";
  const actions = type === "library" ? "" : `
    <div class="management-actions">
      <button type="button" disabled title="${escapeHtml(t("requiresWriter"))}">${escapeHtml(t("rename"))}</button>
      <button type="button" disabled title="${escapeHtml(t("requiresWriter"))}">${escapeHtml(t("merge"))}</button>
      <button type="button" disabled title="${escapeHtml(t("requiresWriter"))}">${escapeHtml(t("delete"))}</button>
    </div>
  `;
  row.classList.toggle("management-row-compact", type === "library");
  row.innerHTML = `
    <div class="management-name">
      <strong>${escapeHtml(label)}</strong>
      <span>${count}</span>
    </div>
    <label class="switch-row">
      <input type="checkbox" ${config.visible === false ? "" : "checked"} data-management-visible>
      <span>${escapeHtml(t("visible"))}</span>
    </label>
    ${actions}
  `;
  row.querySelector("[data-management-visible]").addEventListener("change", (event) => {
    getManagedItemConfig(type, name).visible = event.target.checked;
    saveNavConfig();
    renderLibraryNav();
    renderCollectionNav();
    renderTagNav();
  });
  return row;
}

function renderAiConfig() {
  const config = state.aiConfig || {};
  elements.aiProvider.value = config.provider || "openai";
  elements.currentModel.value = config.currentModel || "";
  elements.apiBaseUrl.value = config.apiBaseUrl || "";
  elements.newModel.value = config.newModel || "";
  elements.modelTemperature.value = config.temperature || "0.7";
  elements.modelMaxTokens.value = config.maxTokens || "4096";
  elements.apiKey.value = "";
}

async function saveAiConfig(event) {
  event.preventDefault();
  const apiKey = elements.apiKey.value.trim();
  const config = {
    provider: elements.aiProvider.value,
    currentModel: elements.currentModel.value.trim(),
    apiBaseUrl: elements.apiBaseUrl.value.trim(),
    newModel: elements.newModel.value.trim(),
    temperature: elements.modelTemperature.value,
    maxTokens: elements.modelMaxTokens.value,
  };

  state.aiConfig = config;
  localStorage.setItem("html-vault-ai-config", JSON.stringify(config));

  if (!apiKey) {
    elements.settingsFeedback.textContent = t("settingsSavedStatic");
    return;
  }

  if (!state.agentUrl) {
    elements.settingsFeedback.textContent = t("settingsNeedsAgent");
    elements.apiKey.value = "";
    return;
  }

  try {
    const response = await fetch(`${state.agentUrl.replace(/\/$/, "")}/api/settings/ai-provider`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...config, api_key: apiKey }),
    });
    if (!response.ok) throw new Error(`Agent returned ${response.status}`);
    elements.settingsFeedback.textContent = t("settingsSavedAgent");
  } catch (error) {
    elements.settingsFeedback.textContent = t("settingsAgentFailed");
    console.error(error);
  } finally {
    elements.apiKey.value = "";
  }
}

function testProviderConfig() {
  if (!state.agentUrl) {
    elements.settingsFeedback.textContent = t("settingsNeedsAgent");
    return;
  }
  elements.settingsFeedback.textContent = t("settingsAgentFailed");
}

function focusImportEntry() {
  returnToWorkspace();
  elements.inputType.value = "file";
  elements.newItemInput.focus();
}

function openLuckyItem() {
  const items = filteredItems();
  if (items.length === 0) return;
  const index = Math.floor(Math.random() * items.length);
  openReader(items[index]);
}

function submitAssistantJob(event) {
  event.preventDefault();
  if (window.confirm(t("assistantConfirm"))) {
    elements.assistantFeedback.textContent = t("assistantComingSoon");
  }
}

function t(key, params = {}) {
  const dictionary = i18n[state.language] || i18n.en;
  const fallback = i18n.en[key] || key;
  const template = dictionary[key] || fallback;
  return Object.entries(params).reduce((text, [name, value]) => {
    return text.replaceAll(`{${name}}`, String(value));
  }, template);
}

function applyTranslations() {
  document.documentElement.lang = t("appLanguage");
  elements.languageSelect.value = state.language;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-attr]").forEach((node) => {
    node.dataset.i18nAttr.split(",").forEach((entry) => {
      const [attribute, key] = entry.split(":").map((part) => part.trim());
      node.setAttribute(attribute, t(key));
    });
  });
  renderFeedback();
}

function setFeedback(key, params = {}) {
  state.feedbackKey = key;
  state.feedbackParams = params;
  renderFeedback();
}

function renderFeedback() {
  elements.newFeedback.textContent = state.feedbackKey === "connectAgent" ? "" : t(state.feedbackKey, state.feedbackParams).trim();
}

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value).slice(0, 10);
  return date.toISOString().slice(0, 10);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

elements.searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  renderGrid();
});
elements.brandHome.addEventListener("click", goHome);
elements.luckyButton.addEventListener("click", openLuckyItem);
elements.languageSelect.addEventListener("change", (event) => setLanguage(event.target.value));
elements.themeToggle.addEventListener("click", toggleTheme);
elements.settingsOpen.addEventListener("click", toggleSettings);
elements.settingsBack.addEventListener("click", closeSettings);
elements.settingsTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    setSettingsTab(tab.dataset.settingsTab);
  });
});
elements.aiSettingsForm.addEventListener("submit", saveAiConfig);
elements.aiAssistantForm.addEventListener("submit", submitAssistantJob);
elements.testProvider.addEventListener("click", testProviderConfig);
elements.newItemForm.addEventListener("submit", submitNewItem);
elements.readerClose.addEventListener("click", closeReader);
elements.readerCopy.addEventListener("click", copyReaderLink);
document.querySelector("[data-import-entry]").addEventListener("click", focusImportEntry);
window.addEventListener("hashchange", openFromHash);

boot();
