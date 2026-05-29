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
    localBackupRestore: "Local backup & restore",
    localBackupIntro: "Back up local browser preferences, view state, favorites, archives, and non-sensitive settings.",
    autoBackup: "Enable automatic local backup snapshots",
    backupScopeNote: "Static mode can export browser-side state and the current manifest. Source HTML/YAML files still need filesystem or server-side backup.",
    createBackup: "Create backup",
    restoreBackup: "Restore backup",
    backupCreated: "Backup file created.",
    backupRestored: "Backup restored. Reloading workspace state.",
    backupFailed: "Backup file could not be restored.",
    webdavSettings: "WebDAV",
    webdavIntro: "Prepare remote backup settings for future Agent Server sync.",
    webdavUrl: "WebDAV URL",
    webdavUsername: "Username",
    webdavRemotePath: "Remote path",
    webdavPasswordNote: "Password or app token is not saved in this browser. Future sync should hand credentials to Agent Server over a protected connection.",
    saveWebdav: "Save WebDAV settings",
    webdavSaved: "Saved non-sensitive WebDAV settings.",
    dataExport: "Data export",
    dataExportIntro: "Export manifest data or browser preferences for inspection and migration.",
    exportManifest: "Export manifest",
    exportPreferences: "Export preferences",
    dataExportNote: "Exports are downloaded as JSON files. They do not include API keys.",
    exportCreated: "Export file created.",
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
    aboutVersion: "Current early version: 0.3.0.",
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
    archived: "Archived",
    knowledgeWorkspace: "Knowledge Workspace",
    feelingLucky: "I'm feeling lucky",
    viewStyle: "View style",
    resultFilters: "Result filters",
    cardView: "Card view",
    listView: "List view",
    hideArchived: "Hide archived items",
    showArchived: "Show archived items",
    onlyFavorites: "Only favorites",
    showAllFavorites: "Show all items",
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
    favoriteAction: "Favorite",
    unfavoriteAction: "Remove favorite",
    archiveAction: "Archive",
    unarchiveAction: "Unarchive",
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
    localBackupRestore: "本地备份与恢复",
    localBackupIntro: "备份浏览器本地偏好、视图状态、收藏、归档与非敏感设置。",
    autoBackup: "启用本地自动备份快照",
    backupScopeNote: "静态模式可导出浏览器侧状态和当前 Manifest。源 HTML/YAML 文件仍需要通过文件系统或服务端备份。",
    createBackup: "创建备份",
    restoreBackup: "恢复备份",
    backupCreated: "备份文件已创建。",
    backupRestored: "备份已恢复，工作区状态已重新加载。",
    backupFailed: "无法恢复该备份文件。",
    webdavSettings: "WebDAV 设置",
    webdavIntro: "预留远程备份配置，用于未来 Agent Server 同步。",
    webdavUrl: "WebDAV 地址",
    webdavUsername: "用户名",
    webdavRemotePath: "远程路径",
    webdavPasswordNote: "密码或应用令牌不会保存在浏览器。未来同步应通过受保护连接交给 Agent Server。",
    saveWebdav: "保存 WebDAV 设置",
    webdavSaved: "已保存非敏感 WebDAV 设置。",
    dataExport: "数据导出",
    dataExportIntro: "导出 Manifest 数据或浏览器偏好，便于检查与迁移。",
    exportManifest: "导出 Manifest",
    exportPreferences: "导出偏好",
    dataExportNote: "导出文件为 JSON，不包含 API Key。",
    exportCreated: "导出文件已创建。",
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
    aboutVersion: "当前早期版本：0.3.0。",
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
    archived: "已归档",
    knowledgeWorkspace: "知识工作台",
    feelingLucky: "手气不错",
    viewStyle: "视图样式",
    resultFilters: "结果筛选",
    cardView: "方块视图",
    listView: "横向条目视图",
    hideArchived: "排除已归档",
    showArchived: "显示已归档",
    onlyFavorites: "仅显示收藏",
    showAllFavorites: "显示全部",
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
    favoriteAction: "收藏",
    unfavoriteAction: "取消收藏",
    archiveAction: "归档",
    unarchiveAction: "取消归档",
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
    localBackupRestore: "ローカルバックアップと復元",
    localBackupIntro: "ブラウザー内の設定、表示状態、お気に入り、アーカイブ、非機密設定をバックアップします。",
    autoBackup: "ローカル自動バックアップスナップショットを有効化",
    backupScopeNote: "静的モードではブラウザー側の状態と現在の Manifest をエクスポートできます。元の HTML/YAML ファイルはファイルシステムまたはサーバー側で別途バックアップしてください。",
    createBackup: "バックアップを作成",
    restoreBackup: "バックアップを復元",
    backupCreated: "バックアップファイルを作成しました。",
    backupRestored: "バックアップを復元しました。ワークスペース状態を再読み込みしました。",
    backupFailed: "このバックアップファイルは復元できませんでした。",
    webdavSettings: "WebDAV 設定",
    webdavIntro: "将来の Agent Server 同期向けにリモートバックアップ設定を準備します。",
    webdavUrl: "WebDAV URL",
    webdavUsername: "ユーザー名",
    webdavRemotePath: "リモートパス",
    webdavPasswordNote: "パスワードやアプリトークンはブラウザーに保存しません。将来の同期では保護された接続で Agent Server に渡してください。",
    saveWebdav: "WebDAV 設定を保存",
    webdavSaved: "非機密の WebDAV 設定を保存しました。",
    dataExport: "データエクスポート",
    dataExportIntro: "Manifest データまたはブラウザー設定を検査や移行用にエクスポートします。",
    exportManifest: "Manifest をエクスポート",
    exportPreferences: "設定をエクスポート",
    dataExportNote: "エクスポートは JSON ファイルとしてダウンロードされます。API Key は含みません。",
    exportCreated: "エクスポートファイルを作成しました。",
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
    aboutVersion: "現在の初期バージョン: 0.3.0。",
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
    archived: "アーカイブ済み",
    knowledgeWorkspace: "ナレッジワークスペース",
    feelingLucky: "おまかせ表示",
    viewStyle: "表示形式",
    resultFilters: "結果フィルター",
    cardView: "カード表示",
    listView: "横長リスト表示",
    hideArchived: "アーカイブ済みを非表示",
    showArchived: "アーカイブ済みを表示",
    onlyFavorites: "お気に入りのみ表示",
    showAllFavorites: "すべて表示",
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
    favoriteAction: "お気に入り",
    unfavoriteAction: "お気に入り解除",
    archiveAction: "アーカイブ",
    unarchiveAction: "アーカイブ解除",
    item: "項目",
  },
};

const libraryFilterDefinitions = [
  { value: "all", labelKey: "allItems", test: () => true },
  { value: "inbox", labelKey: "inbox", test: (item) => item.collection === "Inbox" },
  { value: "recent", labelKey: "recent", test: () => true },
  { value: "favorites", labelKey: "favorites", test: (item) => isFavorite(item) },
  { value: "generated", labelKey: "generated", test: (item) => item.agent?.generated || item.source_type === "topic" },
  { value: "imported", labelKey: "imported", test: (item) => item.source_type === "imported" || item.source_type === "html" },
  { value: "needs-review", labelKey: "needsReview", test: (item) => item.review_status === "unreviewed" },
  { value: "archived", labelKey: "archived", test: (item) => isArchived(item) },
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
  dataConfig: loadDataConfig(),
  itemState: loadItemState(),
  navConfig: loadNavConfig(),
  viewMode: getInitialViewMode(),
  hideArchived: getInitialArchiveFilter(),
  onlyFavorites: getInitialFavoriteFilter(),
  currentReaderItemId: "",
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
  viewButtons: document.querySelectorAll("[data-view-mode]"),
  collectionManagement: document.querySelector("#collection-management"),
  libraryManagement: document.querySelector("#library-management"),
  tagManagement: document.querySelector("#tag-management"),
  aiSettingsForm: document.querySelector("#ai-settings-form"),
  aiAssistantForm: document.querySelector("#ai-assistant-form"),
  assistantFeedback: document.querySelector("#assistant-feedback"),
  backupSettingsForm: document.querySelector("#backup-settings-form"),
  autoBackup: document.querySelector("#auto-backup"),
  createBackup: document.querySelector("#create-backup"),
  restoreBackup: document.querySelector("#restore-backup"),
  restoreBackupFile: document.querySelector("#restore-backup-file"),
  backupFeedback: document.querySelector("#backup-feedback"),
  webdavSettingsForm: document.querySelector("#webdav-settings-form"),
  webdavUrl: document.querySelector("#webdav-url"),
  webdavUsername: document.querySelector("#webdav-username"),
  webdavPath: document.querySelector("#webdav-path"),
  testWebdav: document.querySelector("#test-webdav"),
  webdavFeedback: document.querySelector("#webdav-feedback"),
  exportManifest: document.querySelector("#export-manifest"),
  exportPreferences: document.querySelector("#export-preferences"),
  exportFeedback: document.querySelector("#export-feedback"),
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
  favoriteFilter: document.querySelector("#favorite-filter"),
  archiveFilter: document.querySelector("#archive-filter"),
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
  readerFavorite: document.querySelector("#reader-favorite"),
  readerArchive: document.querySelector("#reader-archive"),
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
  applyViewMode();
  applyArchiveFilter();
  applyFavoriteFilter();
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
  renderDataConfig();
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
  return state.items.filter((item) => filter.test(item) && isVisibleInLibraryFilter(item, value, false)).length;
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

  const filterValue = state.filter.type === "library" ? state.filter.value : "";
  items = items.filter((item) => isVisibleInLibraryFilter(item, filterValue, state.hideArchived));

  if (state.onlyFavorites) {
    items = items.filter((item) => isFavorite(item));
  }

  if (query) {
    items = items.filter((item) => searchableText(item).includes(query));
  }

  if (state.filter.value === "recent") {
    return items.sort((a, b) => String(b.updated).localeCompare(String(a.updated)));
  }
  return items.sort((a, b) => Number(b.pinned) - Number(a.pinned) || String(b.updated).localeCompare(String(a.updated)));
}

function isVisibleInLibraryFilter(item, value, hideArchived) {
  if (value === "archived") return isArchived(item);
  return hideArchived ? !isArchived(item) : true;
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
  elements.contentGrid.classList.toggle("list-view", state.viewMode === "list");

  if (items.length === 0) {
    elements.contentGrid.innerHTML = `<div class="empty-state">${t("noMatches")}</div>`;
    return;
  }

  elements.contentGrid.replaceChildren(...items.map(renderCard));
}

function renderCard(item) {
  const card = document.createElement("article");
  card.className = "item-card";
  const sourceType = item.source_type || "html";
  card.innerHTML = `
    <div class="card-topline">
      <span>${escapeHtml(item.collection || "Inbox")}</span>
      <div class="item-actions">
        ${itemActionButton("favorite", item)}
        ${itemActionButton("archive", item)}
        <span>${formatDate(item.updated)}</span>
      </div>
    </div>
    <h3>${escapeHtml(item.title)}</h3>
    <p>${escapeHtml(item.summary || t("noSummary"))}</p>
    <div class="card-tags">${(item.tags || []).slice(0, 4).map((tag) => `<span>#${escapeHtml(tag)}</span>`).join("")}</div>
    <div class="card-footer">
      <span class="source-type">${escapeHtml(sourceType)}</span>
      <div>
        <button type="button" data-read>${escapeHtml(t("read"))}</button>
        <a href="${encodeURI(item.path)}" target="_blank" rel="noreferrer">${escapeHtml(t("original"))}</a>
      </div>
    </div>
  `;
  card.querySelector("[data-read]").addEventListener("click", () => openReader(item));
  card.querySelector("[data-item-action='favorite']").addEventListener("click", (event) => {
    event.stopPropagation();
    toggleFavorite(item.id);
  });
  card.querySelector("[data-item-action='archive']").addEventListener("click", (event) => {
    event.stopPropagation();
    toggleArchive(item.id);
  });
  card.addEventListener("dblclick", () => openReader(item));
  return card;
}

function itemActionButton(action, item) {
  const active = action === "favorite" ? isFavorite(item) : isArchived(item);
  const label = action === "favorite"
    ? t(active ? "unfavoriteAction" : "favoriteAction")
    : t(active ? "unarchiveAction" : "archiveAction");
  return `
    <button class="item-icon-button${active ? " active" : ""}" type="button" data-item-action="${action}" aria-label="${escapeHtml(label)}" title="${escapeHtml(label)}">
      ${action === "favorite" ? starIcon(active) : archiveIcon()}
    </button>
  `;
}

function openReader(item) {
  state.currentReaderItemId = item.id;
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
  renderReaderActions(item);
  window.location.hash = `/${item.id}`;
}

function closeReader() {
  state.currentReaderItemId = "";
  elements.reader.hidden = true;
  elements.readerFrame.removeAttribute("src");
  if (window.location.hash) {
    history.pushState("", document.title, window.location.pathname + window.location.search);
  }
}

function returnToWorkspace() {
  state.currentReaderItemId = "";
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

function renderReaderActions(item) {
  const favorite = isFavorite(item);
  const archived = isArchived(item);
  const favoriteLabel = t(favorite ? "unfavoriteAction" : "favoriteAction");
  const archiveLabel = t(archived ? "unarchiveAction" : "archiveAction");
  elements.readerFavorite.classList.toggle("active", favorite);
  elements.readerFavorite.innerHTML = starIcon(favorite);
  elements.readerFavorite.setAttribute("aria-label", favoriteLabel);
  elements.readerFavorite.setAttribute("title", favoriteLabel);
  elements.readerArchive.classList.toggle("active", archived);
  elements.readerArchive.innerHTML = archiveIcon();
  elements.readerArchive.setAttribute("aria-label", archiveLabel);
  elements.readerArchive.setAttribute("title", archiveLabel);
}

function getItemById(id) {
  return state.items.find((item) => item.id === id);
}

function itemOverride(id) {
  state.itemState[id] ||= {};
  return state.itemState[id];
}

function isFavorite(item) {
  const override = state.itemState[item.id];
  return typeof override?.favorite === "boolean" ? override.favorite : Boolean(item.favorite);
}

function isArchived(item) {
  const override = state.itemState[item.id];
  return typeof override?.archived === "boolean" ? override.archived : Boolean(item.archived);
}

function toggleFavorite(id) {
  const item = getItemById(id);
  if (!item) return;
  itemOverride(id).favorite = !isFavorite(item);
  saveItemState();
  renderAfterItemStateChange(item);
}

function toggleArchive(id) {
  const item = getItemById(id);
  if (!item) return;
  itemOverride(id).archived = !isArchived(item);
  saveItemState();
  renderAfterItemStateChange(item);
}

function renderAfterItemStateChange(item) {
  renderLibraryNav();
  renderManagementLists();
  renderGrid();
  if (!elements.reader.hidden && state.currentReaderItemId === item.id) {
    renderReaderActions(item);
  }
  maybeAutoBackup();
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

function getInitialViewMode() {
  const saved = localStorage.getItem("html-vault-view-mode");
  return saved === "list" ? "list" : "cards";
}

function getInitialArchiveFilter() {
  return localStorage.getItem("html-vault-hide-archived") !== "false";
}

function getInitialFavoriteFilter() {
  return localStorage.getItem("html-vault-only-favorites") === "true";
}

function setViewMode(mode) {
  if (mode !== "cards" && mode !== "list") return;
  state.viewMode = mode;
  localStorage.setItem("html-vault-view-mode", mode);
  applyViewMode();
  renderGrid();
}

function toggleArchiveFilter() {
  state.hideArchived = !state.hideArchived;
  localStorage.setItem("html-vault-hide-archived", String(state.hideArchived));
  applyArchiveFilter();
  renderGrid();
}

function toggleFavoriteFilter() {
  state.onlyFavorites = !state.onlyFavorites;
  localStorage.setItem("html-vault-only-favorites", String(state.onlyFavorites));
  applyFavoriteFilter();
  renderGrid();
}

function applyArchiveFilter() {
  elements.archiveFilter.classList.toggle("active", state.hideArchived);
  const label = t(state.hideArchived ? "showArchived" : "hideArchived");
  elements.archiveFilter.setAttribute("aria-label", label);
  elements.archiveFilter.setAttribute("title", label);
}

function applyFavoriteFilter() {
  elements.favoriteFilter.classList.toggle("active", state.onlyFavorites);
  const label = t(state.onlyFavorites ? "showAllFavorites" : "onlyFavorites");
  elements.favoriteFilter.setAttribute("aria-label", label);
  elements.favoriteFilter.setAttribute("title", label);
}

function applyViewMode() {
  elements.contentGrid.classList.toggle("list-view", state.viewMode === "list");
  elements.viewButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.viewMode === state.viewMode);
  });
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

function loadDataConfig() {
  try {
    return JSON.parse(localStorage.getItem("html-vault-data-config") || "{}");
  } catch {
    return {};
  }
}

function loadItemState() {
  try {
    return JSON.parse(localStorage.getItem("html-vault-item-state") || "{}");
  } catch {
    return {};
  }
}

function saveItemState() {
  localStorage.setItem("html-vault-item-state", JSON.stringify(state.itemState));
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

function renderDataConfig() {
  const config = state.dataConfig || {};
  elements.autoBackup.checked = Boolean(config.autoBackup);
  elements.webdavUrl.value = config.webdav?.url || "";
  elements.webdavUsername.value = config.webdav?.username || "";
  elements.webdavPath.value = config.webdav?.path || "";
}

function saveDataConfig() {
  localStorage.setItem("html-vault-data-config", JSON.stringify(state.dataConfig));
}

function setAutoBackup(enabled) {
  state.dataConfig.autoBackup = enabled;
  saveDataConfig();
  if (enabled) {
    maybeAutoBackup(true);
  }
}

function saveWebdavSettings(event) {
  event.preventDefault();
  state.dataConfig.webdav = {
    url: elements.webdavUrl.value.trim(),
    username: elements.webdavUsername.value.trim(),
    path: elements.webdavPath.value.trim(),
  };
  saveDataConfig();
  elements.webdavFeedback.textContent = t("webdavSaved");
  maybeAutoBackup();
}

function testWebdavSettings() {
  elements.webdavFeedback.textContent = state.agentUrl ? t("settingsAgentFailed") : t("settingsNeedsAgent");
}

function createBackup() {
  downloadJson(`html-vault-backup-${dateStamp()}.json`, buildBackupPayload());
  state.dataConfig.lastBackupAt = new Date().toISOString();
  saveDataConfig();
  elements.backupFeedback.textContent = t("backupCreated");
}

function buildBackupPayload() {
  return {
    type: "html-vault-backup",
    version: 1,
    createdAt: new Date().toISOString(),
    manifestVersion: state.manifest?.version,
    preferences: getPreferencePayload(),
    manifest: state.manifest,
  };
}

function getPreferencePayload() {
  return {
    language: state.language,
    theme: state.theme,
    viewMode: state.viewMode,
    hideArchived: state.hideArchived,
    onlyFavorites: state.onlyFavorites,
    aiConfig: state.aiConfig,
    dataConfig: getExportableDataConfig(),
    navConfig: state.navConfig,
    itemState: state.itemState,
  };
}

function getExportableDataConfig() {
  const { lastBackupSnapshot, ...config } = state.dataConfig || {};
  return config;
}

function restoreBackupFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const backup = JSON.parse(String(reader.result || "{}"));
      if (backup.type !== "html-vault-backup" || !backup.preferences) {
        throw new Error("Invalid backup file");
      }
      restorePreferences(backup.preferences);
      elements.backupFeedback.textContent = t("backupRestored");
      renderApp();
    } catch (error) {
      elements.backupFeedback.textContent = t("backupFailed");
      console.error(error);
    } finally {
      elements.restoreBackupFile.value = "";
    }
  });
  reader.readAsText(file);
}

function restorePreferences(preferences) {
  if (preferences.language && i18n[preferences.language]) {
    state.language = preferences.language;
    localStorage.setItem("html-vault-language", state.language);
  }
  if (preferences.theme === "dark" || preferences.theme === "light") {
    state.theme = preferences.theme;
    localStorage.setItem("html-vault-theme", state.theme);
  }
  if (preferences.viewMode === "cards" || preferences.viewMode === "list") {
    state.viewMode = preferences.viewMode;
    localStorage.setItem("html-vault-view-mode", state.viewMode);
  }
  state.hideArchived = Boolean(preferences.hideArchived);
  localStorage.setItem("html-vault-hide-archived", String(state.hideArchived));
  state.onlyFavorites = Boolean(preferences.onlyFavorites);
  localStorage.setItem("html-vault-only-favorites", String(state.onlyFavorites));
  state.aiConfig = preferences.aiConfig || {};
  state.dataConfig = preferences.dataConfig || {};
  state.navConfig = preferences.navConfig || { library: {}, collections: {}, tags: {} };
  state.itemState = preferences.itemState || {};
  localStorage.setItem("html-vault-ai-config", JSON.stringify(state.aiConfig));
  localStorage.setItem("html-vault-data-config", JSON.stringify(state.dataConfig));
  localStorage.setItem("html-vault-nav-config", JSON.stringify(state.navConfig));
  saveItemState();
}

function maybeAutoBackup(force = false) {
  if (!state.dataConfig.autoBackup) return;
  state.dataConfig.lastBackupAt = new Date().toISOString();
  state.dataConfig.lastBackupSnapshot = buildBackupPayload();
  saveDataConfig();
  if (force) {
    elements.backupFeedback.textContent = t("backupCreated");
  }
}

function exportManifestData() {
  downloadJson(`html-vault-manifest-${dateStamp()}.json`, state.manifest || {});
  elements.exportFeedback.textContent = t("exportCreated");
}

function exportPreferencesData() {
  downloadJson(`html-vault-preferences-${dateStamp()}.json`, getPreferencePayload());
  elements.exportFeedback.textContent = t("exportCreated");
}

function downloadJson(filename, payload) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

function dateStamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
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

function starIcon(filled = false) {
  return `
    <svg class="button-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path ${filled ? 'fill="currentColor"' : ""} d="m12 3 2.82 5.72 6.31.92-4.57 4.45 1.08 6.28L12 17.4l-5.64 2.97 1.08-6.28-4.57-4.45 6.31-.92L12 3Z"></path>
    </svg>
  `;
}

function archiveIcon() {
  return `
    <svg class="button-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 7h18"></path>
      <path d="M5 7v12h14V7"></path>
      <path d="M8 7V4h8v3"></path>
      <path d="M9 12h6"></path>
    </svg>
  `;
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch((error) => {
      console.warn("Service worker registration failed", error);
    });
  });
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
  applyArchiveFilter();
  applyFavoriteFilter();
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
elements.favoriteFilter.addEventListener("click", toggleFavoriteFilter);
elements.archiveFilter.addEventListener("click", toggleArchiveFilter);
elements.viewButtons.forEach((button) => {
  button.addEventListener("click", () => setViewMode(button.dataset.viewMode));
});
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
elements.autoBackup.addEventListener("change", (event) => setAutoBackup(event.target.checked));
elements.createBackup.addEventListener("click", createBackup);
elements.restoreBackup.addEventListener("click", () => elements.restoreBackupFile.click());
elements.restoreBackupFile.addEventListener("change", (event) => restoreBackupFile(event.target.files?.[0]));
elements.webdavSettingsForm.addEventListener("submit", saveWebdavSettings);
elements.testWebdav.addEventListener("click", testWebdavSettings);
elements.exportManifest.addEventListener("click", exportManifestData);
elements.exportPreferences.addEventListener("click", exportPreferencesData);
elements.testProvider.addEventListener("click", testProviderConfig);
elements.newItemForm.addEventListener("submit", submitNewItem);
elements.readerClose.addEventListener("click", closeReader);
elements.readerFavorite.addEventListener("click", () => {
  if (state.currentReaderItemId) toggleFavorite(state.currentReaderItemId);
});
elements.readerArchive.addEventListener("click", () => {
  if (state.currentReaderItemId) toggleArchive(state.currentReaderItemId);
});
elements.readerCopy.addEventListener("click", copyReaderLink);
document.querySelector("[data-import-entry]").addEventListener("click", focusImportEntry);
window.addEventListener("hashchange", openFromHash);

boot();
registerServiceWorker();
