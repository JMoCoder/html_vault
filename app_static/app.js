const i18n = {
  en: {
    appLanguage: "en",
    sidebarAria: "Library navigation",
    readerAria: "Reader",
    readerFrameTitle: "HTML knowledge item",
    closeReader: "Close reader",
    home: "Home",
    collapseSidebar: "Collapse sidebar",
    expandSidebar: "Expand sidebar",
    resizeSidebar: "Resize sidebar",
    userMenu: "User menu",
    subscriptionStatus: "Subscription",
    subscriptionSelfHosted: "Self-hosted",
    aiCreditsBalance: "AI credits",
    agentStatus: "Agent status",
    aiReady: "AI ready",
    uploadAvatar: "Upload avatar",
    avatarOptions: "Avatar options",
    importHtmlFile: "Import HTML file",
    collapseNavSection: "Collapse {name}",
    expandNavSection: "Expand {name}",
    language: "Language",
    toggleTheme: "Toggle dark and light mode",
    openGlobalAi: "Open AI assistant",
    closeGlobalAi: "Close AI assistant",
    globalAiPanel: "Global AI assistant",
    resizeAiPanel: "Resize AI panel",
    globalAiAssistant: "Global AI",
    aiConversation: "Knowledge Q&A",
    aiContext: "Context",
    aiContextGlobal: "All notes",
    aiContextLibrary: "Library: {name}",
    aiContextCollection: "Collection: {name}",
    aiContextTag: "Tag: {name}",
    aiContextReader: "Current topic: {title}",
    aiContextSearch: "Search results: {query}",
    aiContextCollections: "Collections: {names}",
    aiContextTags: "Tags ({mode}): {names}",
    aiContextManualItems: "Selected files: {titles}",
    tagMatchModeAnyLabel: "OR",
    tagMatchModeAllLabel: "AND",
    aiContextFavoritesOnly: "Favorites only",
    aiContextArchivedHidden: "Archived excluded",
    aiContextArchivedShown: "Archived included",
    aiWelcome: "This AI panel will answer questions against the current workspace context. Connect Agent Server later to enable real responses.",
    aiUserPlaceholder: "User question",
    aiAssistantPlaceholder: "AI response placeholder. No request was sent.",
    aiReplying: "Replying...",
    aiContentExpansion: "Expand with external sources",
    aiPanelComingSoon: "Conversation and note generation are in development.",
    aiChatPlaceholder: "Ask about the current notes or request a new HTML note...",
    aiProviderUnavailable: "AI provider is not configured on the server.",
    aiMessageFailed: "AI request failed.",
    aiSources: "Sources",
    generateHtmlNote: "Generate note",
    generateNoteDialog: "Generate note",
    generateNoteIntro: "Create an HTML note from the current AI conversation and selected workspace context.",
    generateTheme: "Theme",
    generateTargetUse: "Target use",
    generateStylePreference: "Style preference",
    generateReferenceNote: "Reference style",
    generateReferenceDefault: "Default",
    generateShareSafetyHint: "Share-target notes are reviewed with the public share safety rules. Static, self-contained output is more likely to pass.",
    generateDefault: "Default",
    generateDark: "Dark",
    generateLight: "Light",
    generatePersonal: "Personal",
    generateShare: "Share",
    generateReport: "Report",
    generateWebsite: "Website",
    generatePpt: "PPT",
    generateNoteSubmit: "Generate note",
    generateNoteRunning: "Generating note...",
    generateNoteCreated: "Generated note: {title}",
    generateNoteNeedsAgent: "AI note generation requires the backend server.",
    generateNoteFailed: "Note generation failed.",
    send: "Send",
    settings: "Settings",
    settingsTitle: "Settings",
    closeSettings: "Close settings",
    settingsSections: "Settings sections",
    basicSettings: "Basic settings",
    basicSettingsIntro: "Configure interface preferences stored in this browser.",
    interfaceTheme: "Theme settings",
    themeSettingsComingSoon: "Theme color controls will be added here later.",
    languageSetting: "Language",
    themeSystem: "System",
    themeLight: "Light",
    themeDark: "Dark",
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
    aiRunHistory: "Recent AI runs",
    aiRunHistoryIntro: "Review recent AI generation runs without exposing prompts, source text, or API keys.",
    aiRunHistoryEmpty: "No AI runs yet.",
    aiRunHistoryUnavailable: "AI run history requires the backend server.",
    aiRunHistoryFailed: "AI run history could not be loaded.",
    refreshAiRuns: "Refresh runs",
    aiRunHtmlGeneration: "Generated from conversation",
    aiRunMaterialGeneration: "Generated from uploaded material",
    aiRunKnowledgeQa: "Knowledge Q&A",
    aiRunUnknownKind: "AI run",
    aiRunStatusCompleted: "Completed",
    aiRunStatusFailed: "Failed",
    aiRunStatusRunning: "Running",
    aiRunStatusPending: "Pending",
    aiRunNodeCount: "{count} steps",
    aiRunDuration: "{duration}",
    aiRunCompletedAt: "Completed: {date}",
    aiRunItem: "Item: {id}",
    aiRunError: "Error: {message}",
    aiRunRetryable: "Retryable",
    aiRunNotCancellable: "Not cancellable",
    aiRunDetails: "Details",
    aiRunHideDetails: "Hide",
    aiRunDetailsLoading: "Loading run details...",
    aiRunDetailsFailed: "Run details could not be loaded.",
    aiRunSpec: "Spec",
    aiRunUsage: "Usage",
    aiRunNodes: "Steps",
    aiRunNoDetailData: "No detail data recorded.",
    aiRunInputTokens: "Input tokens: {count}",
    aiRunOutputTokens: "Output tokens: {count}",
    aiRunTotalTokens: "Total tokens: {count}",
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
    shareManagement: "Share links",
    shareManagementIntro: "Review active public note links and revoke access when a note should no longer be shared.",
    shareDialog: "Share note",
    shareSecurityNote: "Shared notes are public read-only pages. HTMlore blocks sharing when a note contains executable HTML, dangerous links, or likely secrets. External links are disabled in the shared page.",
    shareDuration: "Duration",
    shareDuration1h: "1 hour",
    shareDuration1d: "1 day",
    shareDuration7d: "7 days",
    shareDuration30d: "30 days",
    shareDurationForever: "Forever",
    shareLink: "Share link",
    shareValidUntil: "Valid until: {date}",
    shareNoExpiry: "Never expires",
    createShare: "Create share",
    updateShare: "Update share",
    copyShareLink: "Copy share link",
    revokeShare: "Revoke share",
    shareNeedsAgent: "Sharing requires the backend server.",
    shareCreated: "Share link created.",
    shareUpdated: "Share settings updated.",
    shareRevoked: "Share revoked.",
    shareCopied: "Share link copied.",
    shareLinkOneTime: "This older share was created before persistent share links were available. Revoke and create a new share if you need a copyable link.",
    shareBlocked: "This note cannot be shared because it failed the safety checks.",
    shareFailed: "Share operation failed.",
    noShares: "No shared links.",
    shareActive: "Active",
    shareExpired: "Expired",
    shareAccessCount: "{count} visits",
    userProfile: "User profile",
    userProfileIntro: "Profile details for future sync and cloud account features.",
    userProfilePlaceholder: "This area will manage display name, avatar, workspace identity, and plan information after account support is added.",
    accountSecurity: "Account & security",
    accountSecurityIntro: "Security controls for future login, devices, and credential workflows.",
    accountSecurityPlaceholder: "This area will manage password, passkeys, sessions, connected devices, and security events after account support is added.",
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
    termsIntro: "HTMlore is designed for personal and team knowledge assets.",
    termsPrivateUse: "Use it with content you own, have permission to process, or can lawfully store for private use.",
    termsCopyright: "Generated notes should summarize and cite sources instead of copying protected works wholesale.",
    termsSecurity: "You are responsible for protecting deployed Agent APIs, uploads, and model credentials.",
    aboutIntro: "HTMlore turns HTML files into a card-based static knowledge workspace.",
    aboutStaticFirst: "HTML and YAML files remain the knowledge source of truth; the database should only hold optional job state.",
    aboutVersion: "Current version: {version}.",
    updateAvailable: "Update available: {version}.",
    versionCurrent: "You are on the latest checked version.",
    versionCheckUnavailable: "Version check unavailable.",
    updatesIntro: "Project updates are tracked in the repository and local planning docs.",
    updatesChangelog: "Public release notes live in CHANGELOG.md.",
    updatesDocsLocal: "Product planning documents under documents/ are local-only and ignored by Git.",
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
    generatedSource: "Generated",
    importedSource: "Imported",
    archived: "Archived",
    loginEyebrow: "Private workspace",
    loginUsername: "Username",
    loginPassword: "Password",
    loginSubmit: "Sign in",
    loginNoRegister: "Registration is disabled. Use the account configured by the server administrator.",
    loginFailed: "Invalid username or password.",
    loginUnavailable: "Login service is unavailable.",
    logout: "Sign out",
    knowledgeWorkspace: "Knowledge Workspace",
    feelingLucky: "I'm feeling lucky",
    viewStyle: "View style",
    resultFilters: "Result filters",
    advancedFilters: "Tag filters",
    collectionFilters: "Collections",
    tagFilters: "Tags",
    tagFilterSelectedCount: "(Selected: {count})",
    tagMatchMode: "Tag match mode",
    tagMatchAny: "OR",
    tagMatchAll: "AND",
    sort: "Sort",
    sortNewest: "Time: new to old",
    sortOldest: "Time: old to new",
    sortTitleAz: "Title: A-Z",
    sortTitleZa: "Title: Z-A",
    cardView: "Card view",
    listView: "List view",
    hideArchived: "Hide archived items",
    showArchived: "Show archived items",
    onlyFavorites: "Only favorites",
    showAllFavorites: "Show all items",
    search: "Search",
    searchTitle: "Search: {query}",
    searchPlaceholder: "Title, summary, tag, path",
    manifestMissing: "Manifest not found. Run <code>html-lore build</code> first.",
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
    agentNotConfigured: "Agent Server not configured. Set window.HTML_LORE_AGENT_URL before loading the app.",
    submittingJob: "Submitting job...",
    queuedJob: "Queued job {jobId}",
    agentUnavailable: "Agent Server is unavailable.",
    importingHtml: "Importing HTML file...",
    importHtmlDone: "Imported {title}",
    importHtmlFailed: "HTML import failed.",
    generatingMaterialNote: "Generating note from uploaded material...",
    materialNoteDone: "Generated note: {title}",
    materialNoteFailed: "Material note generation failed.",
    noSummary: "No summary yet.",
    read: "Read",
    original: "Original",
    shareAction: "Share",
    editMetadata: "Edit metadata",
    metadataEditor: "Edit note metadata",
    metadataTitle: "Title",
    metadataSummary: "Summary",
    metadataCollection: "Collection",
    metadataTags: "Tags",
    metadataAddCollection: "Add collection...",
    metadataAddTag: "Add tag...",
    metadataStorageNote: "With Agent Server connected, changes are written to YAML metadata. Static mode saves local browser overrides only.",
    save: "Save",
    cancel: "Cancel",
    metadataSaved: "Metadata saved.",
    metadataSaveFailed: "Metadata save failed.",
    stateSaveFailed: "State save failed.",
    navigationSaveFailed: "Navigation settings save failed.",
    favoriteAction: "Favorite",
    unfavoriteAction: "Remove favorite",
    archiveAction: "Archive",
    unarchiveAction: "Unarchive",
    confirmArchive: "Archive this note? Archived notes only appear in the Archived library view until restored.",
    permanentDeleteAction: "Delete permanently",
    confirmPermanentDelete: "Permanently delete this archived note? This removes the HTML file and metadata when Agent Server is connected. This cannot be undone.",
    deleteNeedsAgent: "Agent Server is required to permanently delete archived notes.",
    deleteFailed: "Permanent delete failed.",
    addToAiContext: "Add to Q&A context",
    removeFromAiContext: "Remove from Q&A context",
    item: "Item",
  },
  "zh-CN": {
    appLanguage: "zh-CN",
    sidebarAria: "知识库导航",
    readerAria: "阅读器",
    readerFrameTitle: "HTML 知识条目",
    closeReader: "关闭阅读器",
    home: "回到主页",
    collapseSidebar: "收起侧栏",
    expandSidebar: "展开侧栏",
    resizeSidebar: "调整侧栏宽度",
    userMenu: "用户菜单",
    subscriptionStatus: "订阅状态",
    subscriptionSelfHosted: "自托管",
    aiCreditsBalance: "AI 点数",
    agentStatus: "Agent 状态",
    aiReady: "AI 已就绪",
    uploadAvatar: "上传头像",
    avatarOptions: "头像选项",
    importHtmlFile: "导入HTML文件",
    collapseNavSection: "折叠{name}",
    expandNavSection: "展开{name}",
    language: "语言",
    toggleTheme: "切换暗色与亮色模式",
    openGlobalAi: "打开 AI 助理",
    closeGlobalAi: "关闭 AI 助理",
    globalAiPanel: "全局 AI 助理",
    resizeAiPanel: "调整 AI 面板宽度",
    globalAiAssistant: "全局 AI",
    aiConversation: "知识库问答",
    aiContext: "上下文",
    aiContextGlobal: "全部笔记",
    aiContextLibrary: "资料库：{name}",
    aiContextCollection: "集合：{name}",
    aiContextTag: "标签：{name}",
    aiContextReader: "当前话题：{title}",
    aiContextSearch: "搜索结果：{query}",
    aiContextCollections: "集合：{names}",
    aiContextTags: "标签（{mode}）：{names}",
    aiContextManualItems: "指定文件：{titles}",
    tagMatchModeAnyLabel: "或",
    tagMatchModeAllLabel: "且",
    aiContextFavoritesOnly: "仅收藏",
    aiContextArchivedHidden: "已排除归档",
    aiContextArchivedShown: "包含归档",
    aiWelcome: "这里将针对当前工作区上下文进行 AI 问答。连接 Agent Server 后再启用真实回复。",
    aiUserPlaceholder: "用户问题",
    aiAssistantPlaceholder: "AI 回复占位。当前未发送任何请求。",
    aiReplying: "回复中...",
    aiContentExpansion: "内容拓展",
    aiPanelComingSoon: "对话与生成 HTML 笔记功能开发中。",
    aiChatPlaceholder: "围绕当前笔记提问，或要求生成新的 HTML 笔记...",
    aiProviderUnavailable: "服务端尚未配置 AI 服务商。",
    aiMessageFailed: "AI 请求失败。",
    aiSources: "来源",
    generateHtmlNote: "生成笔记",
    generateNoteDialog: "生成笔记",
    generateNoteIntro: "根据当前 AI 对话和已选择的工作区上下文生成 HTML 笔记。",
    generateTheme: "主题",
    generateTargetUse: "目标用途",
    generateStylePreference: "样式偏好",
    generateReferenceNote: "参考样式",
    generateReferenceDefault: "默认",
    generateShareSafetyHint: "分享用途会按公开分享安全规则预检。静态、无外部依赖的输出更容易通过。",
    generateDefault: "默认",
    generateDark: "暗色",
    generateLight: "亮色",
    generatePersonal: "自用",
    generateShare: "分享",
    generateReport: "报告",
    generateWebsite: "网站",
    generatePpt: "PPT",
    generateNoteSubmit: "生成笔记",
    generateNoteRunning: "正在生成笔记...",
    generateNoteCreated: "已生成笔记：{title}",
    generateNoteNeedsAgent: "生成 AI 笔记需要连接后端服务。",
    generateNoteFailed: "笔记生成失败。",
    send: "发送",
    settings: "设置",
    settingsTitle: "设置",
    closeSettings: "关闭设置",
    settingsSections: "设置分区",
    basicSettings: "基本设置",
    basicSettingsIntro: "配置保存在当前浏览器中的界面偏好。",
    interfaceTheme: "主题设置",
    themeSettingsComingSoon: "后续会在这里加入主题色切换功能。",
    languageSetting: "语言设置",
    themeSystem: "跟随系统",
    themeLight: "亮色模式",
    themeDark: "暗色模式",
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
    aiRunHistory: "最近 AI 运行记录",
    aiRunHistoryIntro: "查看最近的 AI 生成记录，不展示提示词、来源正文或 API Key。",
    aiRunHistoryEmpty: "暂无 AI 运行记录。",
    aiRunHistoryUnavailable: "AI 运行记录需要连接后端服务。",
    aiRunHistoryFailed: "无法加载 AI 运行记录。",
    refreshAiRuns: "刷新运行记录",
    aiRunHtmlGeneration: "根据对话生成",
    aiRunMaterialGeneration: "根据上传资料生成",
    aiRunKnowledgeQa: "知识库问答",
    aiRunUnknownKind: "AI 运行",
    aiRunStatusCompleted: "已完成",
    aiRunStatusFailed: "失败",
    aiRunStatusRunning: "运行中",
    aiRunStatusPending: "等待中",
    aiRunNodeCount: "{count} 个步骤",
    aiRunDuration: "{duration}",
    aiRunCompletedAt: "完成时间：{date}",
    aiRunItem: "条目：{id}",
    aiRunError: "错误：{message}",
    aiRunRetryable: "可重试",
    aiRunNotCancellable: "不可取消",
    aiRunDetails: "详情",
    aiRunHideDetails: "收起",
    aiRunDetailsLoading: "正在加载运行详情...",
    aiRunDetailsFailed: "无法加载运行详情。",
    aiRunSpec: "配置",
    aiRunUsage: "用量",
    aiRunNodes: "步骤",
    aiRunNoDetailData: "暂无详情数据。",
    aiRunInputTokens: "输入 Tokens：{count}",
    aiRunOutputTokens: "输出 Tokens：{count}",
    aiRunTotalTokens: "总 Tokens：{count}",
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
    shareManagement: "分享链接管理",
    shareManagementIntro: "查看当前公开分享链接，并在不再需要公开访问时取消分享。",
    shareDialog: "分享笔记",
    shareSecurityNote: "分享笔记是公开只读页面。若笔记包含可执行 HTML、危险链接或疑似密钥，HTMlore 会禁止分享；分享页中的外部链接会被禁用。",
    shareDuration: "有效期",
    shareDuration1h: "1小时",
    shareDuration1d: "1天",
    shareDuration7d: "7天",
    shareDuration30d: "30天",
    shareDurationForever: "永久",
    shareLink: "分享链接",
    shareValidUntil: "分享有效期至：{date}",
    shareNoExpiry: "永久有效",
    createShare: "创建分享",
    updateShare: "更新分享",
    copyShareLink: "复制分享链接",
    revokeShare: "取消分享",
    shareNeedsAgent: "分享功能需要连接后端服务。",
    shareCreated: "分享链接已创建。",
    shareUpdated: "分享设置已更新。",
    shareRevoked: "分享已取消。",
    shareCopied: "分享链接已复制。",
    shareLinkOneTime: "这条旧分享创建于可持续显示分享链接之前。若需要可复制链接，请取消分享后重新创建。",
    shareBlocked: "该笔记未通过安全检查，不能分享。",
    shareFailed: "分享操作失败。",
    noShares: "暂无分享链接。",
    shareActive: "分享中",
    shareExpired: "已失效",
    shareAccessCount: "{count} 次访问",
    userProfile: "用户资料",
    userProfileIntro: "预留未来同步与云账号能力所需的个人资料设置。",
    userProfilePlaceholder: "账号能力完成后，这里将管理显示名称、头像、工作区身份与套餐信息。",
    accountSecurity: "账户与安全",
    accountSecurityIntro: "预留未来登录、设备与凭据相关的安全控制。",
    accountSecurityPlaceholder: "账号能力完成后，这里将管理密码、通行密钥、会话、已登录设备与安全事件。",
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
    termsIntro: "HTMlore 用于个人与团队知识资产管理。",
    termsPrivateUse: "请仅处理你拥有、被授权处理，或可合法用于私有保存的内容。",
    termsCopyright: "生成笔记应以总结和来源引用为主，不应整段复制受版权保护的作品。",
    termsSecurity: "你需要自行保护部署后的 Agent API、上传文件和模型凭据。",
    aboutIntro: "HTMlore 将 HTML 文件变成卡片式静态知识工作台。",
    aboutStaticFirst: "HTML 与 YAML 文件是知识真源；数据库只应保存可选任务状态。",
    aboutVersion: "当前版本：{version}。",
    updateAvailable: "发现可更新版本：{version}。",
    versionCurrent: "当前已是已检查到的最新版本。",
    versionCheckUnavailable: "版本检查不可用。",
    updatesIntro: "项目更新记录在仓库与本地规划文档中。",
    updatesChangelog: "公开发布记录保存在 CHANGELOG.md。",
    updatesDocsLocal: "documents/ 下的产品规划文档仅保存在本地，并被 Git 忽略。",
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
    generatedSource: "生成",
    importedSource: "导入",
    archived: "已归档",
    loginEyebrow: "私有工作台",
    loginUsername: "用户名",
    loginPassword: "密码",
    loginSubmit: "登录",
    loginNoRegister: "当前不开放注册。请使用服务器管理员配置的账户。",
    loginFailed: "用户名或密码错误。",
    loginUnavailable: "登录服务不可用。",
    logout: "退出登录",
    knowledgeWorkspace: "知识工作台",
    feelingLucky: "手气不错",
    viewStyle: "视图样式",
    resultFilters: "结果筛选",
    advancedFilters: "标签筛选",
    collectionFilters: "集合",
    tagFilters: "标签",
    tagFilterSelectedCount: "（已选择：{count}）",
    tagMatchMode: "标签匹配模式",
    tagMatchAny: "或",
    tagMatchAll: "且",
    sort: "排序",
    sortNewest: "时间：新到旧",
    sortOldest: "时间：旧到新",
    sortTitleAz: "标题：A-Z",
    sortTitleZa: "标题：Z-A",
    cardView: "方块视图",
    listView: "横向条目视图",
    hideArchived: "排除已归档",
    showArchived: "显示已归档",
    onlyFavorites: "仅显示收藏",
    showAllFavorites: "显示全部",
    search: "搜索",
    searchTitle: "搜索：{query}",
    searchPlaceholder: "标题、摘要、标签、路径",
    manifestMissing: "未找到 Manifest。请先运行 <code>html-lore build</code>。",
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
    agentNotConfigured: "尚未配置 Agent Server。请在加载应用前设置 window.HTML_LORE_AGENT_URL。",
    submittingJob: "正在提交任务...",
    queuedJob: "已加入任务队列 {jobId}",
    agentUnavailable: "Agent Server 不可用。",
    importingHtml: "正在导入 HTML 文件...",
    importHtmlDone: "已导入 {title}",
    importHtmlFailed: "HTML 导入失败。",
    generatingMaterialNote: "正在根据上传资料生成笔记...",
    materialNoteDone: "已生成笔记：{title}",
    materialNoteFailed: "资料生成笔记失败。",
    noSummary: "暂无摘要。",
    read: "阅读",
    original: "原文",
    shareAction: "分享",
    editMetadata: "编辑元信息",
    metadataEditor: "编辑笔记元信息",
    metadataTitle: "标题",
    metadataSummary: "摘要",
    metadataCollection: "集合",
    metadataTags: "标签",
    metadataAddCollection: "新增集合...",
    metadataAddTag: "新增标签...",
    metadataStorageNote: "连接 Agent Server 时会写回 YAML 元数据；静态模式仅保存浏览器本地覆盖。",
    save: "保存",
    cancel: "取消",
    metadataSaved: "元信息已保存。",
    metadataSaveFailed: "元信息保存失败。",
    stateSaveFailed: "状态保存失败。",
    navigationSaveFailed: "导航设置保存失败。",
    favoriteAction: "收藏",
    unfavoriteAction: "取消收藏",
    archiveAction: "归档",
    unarchiveAction: "取消归档",
    confirmArchive: "确认归档这篇笔记？归档后只会出现在资料库的“已归档”栏目，取消归档后会回到原集合与标签统计。",
    permanentDeleteAction: "永久删除",
    confirmPermanentDelete: "确认永久删除这篇已归档笔记？连接 Agent Server 时会删除 HTML 文件和元数据，此操作不可撤销。",
    deleteNeedsAgent: "永久删除已归档笔记需要连接 Agent Server。",
    deleteFailed: "永久删除失败。",
    addToAiContext: "加入知识库问答上下文",
    removeFromAiContext: "从知识库问答上下文移除",
    item: "条目",
  },
  ja: {
    appLanguage: "ja",
    sidebarAria: "ナレッジベースナビゲーション",
    readerAria: "リーダー",
    readerFrameTitle: "HTML ナレッジ項目",
    closeReader: "リーダーを閉じる",
    home: "ホームへ戻る",
    collapseSidebar: "サイドバーを折りたたむ",
    expandSidebar: "サイドバーを展開",
    resizeSidebar: "サイドバー幅を調整",
    userMenu: "ユーザーメニュー",
    subscriptionStatus: "サブスクリプション",
    subscriptionSelfHosted: "セルフホスト",
    aiCreditsBalance: "AI クレジット",
    agentStatus: "Agent 状態",
    aiReady: "AI 準備完了",
    uploadAvatar: "アバターをアップロード",
    avatarOptions: "アバター選択",
    importHtmlFile: "HTML ファイルをインポート",
    collapseNavSection: "{name}を折りたたむ",
    expandNavSection: "{name}を展開",
    language: "言語",
    toggleTheme: "ダーク/ライトモードを切り替え",
    openGlobalAi: "AI アシスタントを開く",
    closeGlobalAi: "AI アシスタントを閉じる",
    globalAiPanel: "グローバル AI アシスタント",
    resizeAiPanel: "AI パネル幅を調整",
    globalAiAssistant: "グローバル AI",
    aiConversation: "ナレッジ Q&A",
    aiContext: "コンテキスト",
    aiContextGlobal: "すべてのノート",
    aiContextLibrary: "ライブラリ: {name}",
    aiContextCollection: "コレクション: {name}",
    aiContextTag: "タグ: {name}",
    aiContextReader: "現在のトピック: {title}",
    aiContextSearch: "検索結果: {query}",
    aiContextCollections: "コレクション: {names}",
    aiContextTags: "タグ（{mode}）: {names}",
    aiContextManualItems: "選択ファイル: {titles}",
    tagMatchModeAnyLabel: "OR",
    tagMatchModeAllLabel: "AND",
    aiContextFavoritesOnly: "お気に入りのみ",
    aiContextArchivedHidden: "アーカイブを除外",
    aiContextArchivedShown: "アーカイブを含む",
    aiWelcome: "この AI パネルは現在のワークスペース文脈に対して質問応答する予定です。実際の応答は後で Agent Server 接続後に有効化します。",
    aiUserPlaceholder: "ユーザーの質問",
    aiAssistantPlaceholder: "AI 応答のプレースホルダーです。リクエストは送信されていません。",
    aiReplying: "返信中...",
    aiContentExpansion: "外部情報で拡張",
    aiPanelComingSoon: "会話と HTML ノート生成は開発中です。",
    aiChatPlaceholder: "現在のノートについて質問、または新しい HTML ノート生成を依頼...",
    aiProviderUnavailable: "サーバー側の AI プロバイダーが未設定です。",
    aiMessageFailed: "AI リクエストに失敗しました。",
    aiSources: "出典",
    generateHtmlNote: "ノートを生成",
    generateNoteDialog: "ノートを生成",
    generateNoteIntro: "現在の AI 会話と選択中のワークスペース文脈から HTML ノートを生成します。",
    generateTheme: "テーマ",
    generateTargetUse: "用途",
    generateStylePreference: "スタイル",
    generateReferenceNote: "参照スタイル",
    generateReferenceDefault: "デフォルト",
    generateShareSafetyHint: "共有用途のノートは公開共有の安全ルールで事前確認されます。静的で自己完結した出力ほど通過しやすくなります。",
    generateDefault: "デフォルト",
    generateDark: "ダーク",
    generateLight: "ライト",
    generatePersonal: "自分用",
    generateShare: "共有",
    generateReport: "レポート",
    generateWebsite: "Web サイト",
    generatePpt: "PPT",
    generateNoteSubmit: "ノートを生成",
    generateNoteRunning: "ノートを生成中...",
    generateNoteCreated: "生成済みノート: {title}",
    generateNoteNeedsAgent: "AI ノート生成にはバックエンドサーバーが必要です。",
    generateNoteFailed: "ノート生成に失敗しました。",
    send: "送信",
    settings: "設定",
    settingsTitle: "設定",
    closeSettings: "設定を閉じる",
    settingsSections: "設定セクション",
    basicSettings: "基本設定",
    basicSettingsIntro: "このブラウザーに保存するインターフェース設定です。",
    interfaceTheme: "テーマ設定",
    themeSettingsComingSoon: "今後ここにテーマカラー切り替えを追加します。",
    languageSetting: "言語設定",
    themeSystem: "システム",
    themeLight: "ライト",
    themeDark: "ダーク",
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
    aiRunHistory: "最近の AI 実行",
    aiRunHistoryIntro: "プロンプト、元テキスト、API Key を表示せず、最近の AI 生成実行を確認します。",
    aiRunHistoryEmpty: "AI 実行はまだありません。",
    aiRunHistoryUnavailable: "AI 実行履歴にはバックエンドサーバーが必要です。",
    aiRunHistoryFailed: "AI 実行履歴を読み込めませんでした。",
    refreshAiRuns: "実行履歴を更新",
    aiRunHtmlGeneration: "会話から生成",
    aiRunMaterialGeneration: "アップロード資料から生成",
    aiRunKnowledgeQa: "ナレッジ Q&A",
    aiRunUnknownKind: "AI 実行",
    aiRunStatusCompleted: "完了",
    aiRunStatusFailed: "失敗",
    aiRunStatusRunning: "実行中",
    aiRunStatusPending: "待機中",
    aiRunNodeCount: "{count} ステップ",
    aiRunDuration: "{duration}",
    aiRunCompletedAt: "完了時刻: {date}",
    aiRunItem: "項目: {id}",
    aiRunError: "エラー: {message}",
    aiRunRetryable: "再試行可能",
    aiRunNotCancellable: "キャンセル不可",
    aiRunDetails: "詳細",
    aiRunHideDetails: "閉じる",
    aiRunDetailsLoading: "実行詳細を読み込み中...",
    aiRunDetailsFailed: "実行詳細を読み込めませんでした。",
    aiRunSpec: "設定",
    aiRunUsage: "使用量",
    aiRunNodes: "ステップ",
    aiRunNoDetailData: "詳細データはありません。",
    aiRunInputTokens: "入力トークン: {count}",
    aiRunOutputTokens: "出力トークン: {count}",
    aiRunTotalTokens: "合計トークン: {count}",
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
    shareManagement: "共有リンク管理",
    shareManagementIntro: "公開共有リンクを確認し、不要になったノートの共有を取り消します。",
    shareDialog: "ノートを共有",
    shareSecurityNote: "共有ノートは公開の読み取り専用ページです。実行可能 HTML、危険なリンク、疑わしい secret が含まれる場合、HTMlore は共有を禁止します。共有ページ内の外部リンクは無効化されます。",
    shareDuration: "有効期限",
    shareDuration1h: "1時間",
    shareDuration1d: "1日",
    shareDuration7d: "7日",
    shareDuration30d: "30日",
    shareDurationForever: "無期限",
    shareLink: "共有リンク",
    shareValidUntil: "共有有効期限：{date}",
    shareNoExpiry: "無期限",
    createShare: "共有を作成",
    updateShare: "共有を更新",
    copyShareLink: "共有リンクをコピー",
    revokeShare: "共有を取り消す",
    shareNeedsAgent: "共有にはバックエンドサーバー接続が必要です。",
    shareCreated: "共有リンクを作成しました。",
    shareUpdated: "共有設定を更新しました。",
    shareRevoked: "共有を取り消しました。",
    shareCopied: "共有リンクをコピーしました。",
    shareLinkOneTime: "この古い共有は永続表示リンクに対応する前に作成されています。コピー可能なリンクが必要な場合は共有を取り消して再作成してください。",
    shareBlocked: "このノートは安全チェックに通らないため共有できません。",
    shareFailed: "共有操作に失敗しました。",
    noShares: "共有リンクはありません。",
    shareActive: "共有中",
    shareExpired: "期限切れ",
    shareAccessCount: "{count} 回アクセス",
    userProfile: "ユーザープロフィール",
    userProfileIntro: "将来の同期とクラウドアカウント向けのプロフィール設定です。",
    userProfilePlaceholder: "アカウント対応後、表示名、アバター、ワークスペース ID、プラン情報をここで管理します。",
    accountSecurity: "アカウントとセキュリティ",
    accountSecurityIntro: "将来のログイン、デバイス、認証情報向けのセキュリティ設定です。",
    accountSecurityPlaceholder: "アカウント対応後、パスワード、パスキー、セッション、ログイン済みデバイス、セキュリティイベントをここで管理します。",
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
    termsIntro: "HTMlore は個人およびチームのナレッジ資産管理向けです。",
    termsPrivateUse: "所有している、許可を得ている、または私的保存が合法なコンテンツのみ処理してください。",
    termsCopyright: "生成ノートは保護された著作物を丸ごと複製せず、要約と出典提示を中心にしてください。",
    termsSecurity: "デプロイした Agent API、アップロード、モデル認証情報の保護は利用者の責任です。",
    aboutIntro: "HTMlore は HTML ファイルをカード型の静的ナレッジワークスペースに変換します。",
    aboutStaticFirst: "HTML と YAML ファイルがナレッジの真のソースです。データベースは任意のジョブ状態のみを保持すべきです。",
    aboutVersion: "現在のバージョン: {version}。",
    updateAvailable: "利用可能な更新: {version}。",
    versionCurrent: "確認済みの最新バージョンです。",
    versionCheckUnavailable: "バージョン確認を利用できません。",
    updatesIntro: "プロジェクト更新はリポジトリとローカル計画ドキュメントで管理します。",
    updatesChangelog: "公開リリースノートは CHANGELOG.md にあります。",
    updatesDocsLocal: "documents/ 配下の製品計画ドキュメントはローカル専用で、Git から除外されます。",
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
    generatedSource: "生成",
    importedSource: "インポート",
    archived: "アーカイブ済み",
    loginEyebrow: "プライベートワークスペース",
    loginUsername: "ユーザー名",
    loginPassword: "パスワード",
    loginSubmit: "ログイン",
    loginNoRegister: "登録は無効です。サーバー管理者が設定したアカウントを使用してください。",
    loginFailed: "ユーザー名またはパスワードが正しくありません。",
    loginUnavailable: "ログインサービスを利用できません。",
    logout: "ログアウト",
    knowledgeWorkspace: "ナレッジワークスペース",
    feelingLucky: "おまかせ表示",
    viewStyle: "表示形式",
    resultFilters: "結果フィルター",
    advancedFilters: "タグフィルター",
    collectionFilters: "コレクション",
    tagFilters: "タグ",
    tagFilterSelectedCount: "（選択済み：{count}）",
    tagMatchMode: "タグ一致モード",
    tagMatchAny: "OR",
    tagMatchAll: "AND",
    sort: "並び替え",
    sortNewest: "時間: 新しい順",
    sortOldest: "時間: 古い順",
    sortTitleAz: "タイトル: A-Z",
    sortTitleZa: "タイトル: Z-A",
    cardView: "カード表示",
    listView: "横長リスト表示",
    hideArchived: "アーカイブ済みを非表示",
    showArchived: "アーカイブ済みを表示",
    onlyFavorites: "お気に入りのみ表示",
    showAllFavorites: "すべて表示",
    search: "検索",
    searchTitle: "検索: {query}",
    searchPlaceholder: "タイトル、概要、タグ、パス",
    manifestMissing: "Manifest が見つかりません。先に <code>html-lore build</code> を実行してください。",
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
    agentNotConfigured: "Agent Server が設定されていません。アプリ読み込み前に window.HTML_LORE_AGENT_URL を設定してください。",
    submittingJob: "ジョブを送信中...",
    queuedJob: "ジョブをキューに追加しました {jobId}",
    agentUnavailable: "Agent Server を利用できません。",
    importingHtml: "HTML ファイルをインポート中...",
    importHtmlDone: "{title} をインポートしました",
    importHtmlFailed: "HTML インポートに失敗しました。",
    generatingMaterialNote: "アップロード資料からノートを生成中...",
    materialNoteDone: "生成済みノート: {title}",
    materialNoteFailed: "資料からのノート生成に失敗しました。",
    noSummary: "概要はまだありません。",
    read: "読む",
    original: "原文",
    shareAction: "共有",
    editMetadata: "メタデータを編集",
    metadataEditor: "ノートメタデータを編集",
    metadataTitle: "タイトル",
    metadataSummary: "概要",
    metadataCollection: "コレクション",
    metadataTags: "タグ",
    metadataAddCollection: "コレクションを追加...",
    metadataAddTag: "タグを追加...",
    metadataStorageNote: "Agent Server 接続時は YAML メタデータへ書き戻します。静的モードではブラウザー内のローカル上書きのみ保存します。",
    save: "保存",
    cancel: "キャンセル",
    metadataSaved: "メタデータを保存しました。",
    metadataSaveFailed: "メタデータの保存に失敗しました。",
    stateSaveFailed: "状態の保存に失敗しました。",
    navigationSaveFailed: "ナビゲーション設定の保存に失敗しました。",
    favoriteAction: "お気に入り",
    unfavoriteAction: "お気に入り解除",
    archiveAction: "アーカイブ",
    unarchiveAction: "アーカイブ解除",
    confirmArchive: "このノートをアーカイブしますか？復元するまで、アーカイブ済みライブラリ表示にのみ表示されます。",
    permanentDeleteAction: "完全に削除",
    confirmPermanentDelete: "このアーカイブ済みノートを完全に削除しますか？Agent Server 接続時は HTML ファイルとメタデータを削除します。この操作は元に戻せません。",
    deleteNeedsAgent: "アーカイブ済みノートの完全削除には Agent Server 接続が必要です。",
    deleteFailed: "完全削除に失敗しました。",
    addToAiContext: "Q&A コンテキストに追加",
    removeFromAiContext: "Q&A コンテキストから削除",
    item: "項目",
  },
};

const libraryFilterDefinitions = [
  { value: "all", labelKey: "allItems", test: () => true },
  { value: "inbox", labelKey: "inbox", test: (item) => getItemCollection(item) === "Inbox" },
  { value: "recent", labelKey: "recent", test: () => true },
  { value: "favorites", labelKey: "favorites", test: (item) => isFavorite(item) },
  { value: "generated", labelKey: "generated", test: (item) => item.agent?.generated || item.source_type === "topic" },
  { value: "imported", labelKey: "imported", test: (item) => item.source_type === "imported" || item.source_type === "html" },
  { value: "archived", labelKey: "archived", test: (item) => isArchived(item) },
];

const STORAGE_PREFIX = "html-lore-";
const LEGACY_STORAGE_PREFIX = "html-vault-";

function getRuntimeConfig(name) {
  return window[`HTML_LORE_${name}`];
}

function hasRuntimeConfig(name) {
  return getRuntimeConfig(name) !== undefined;
}

function storageKey(name) {
  return `${STORAGE_PREFIX}${name}`;
}

function legacyStorageKey(name) {
  return `${LEGACY_STORAGE_PREFIX}${name}`;
}

function getStored(name) {
  const key = storageKey(name);
  const current = localStorage.getItem(key);
  if (current !== null) return current;
  const legacy = localStorage.getItem(legacyStorageKey(name));
  if (legacy !== null) localStorage.setItem(key, legacy);
  return legacy;
}

function setStored(name, value) {
  localStorage.setItem(storageKey(name), value);
}

function getDefaultAgentUrl() {
  if (hasRuntimeConfig("STATIC_DEMO")) return "";
  const configuredUrl = getRuntimeConfig("AGENT_URL");
  if (configuredUrl) return configuredUrl;
  if (window.location.protocol === "file:") return "";
  const host = window.location.hostname;
  const port = window.location.port;
  const isLocalHost = host === "127.0.0.1" || host === "localhost";
  if (isLocalHost && port && port !== "80" && port !== "443") return "http://127.0.0.1:8787";
  if (host.endsWith("github.io")) return "";
  if (window.location.protocol === "http:" || window.location.protocol === "https:") return window.location.origin;
  return "";
}

function getPagesHomeUrl() {
  if (hasRuntimeConfig("STATIC_DEMO")) return "../";
  return getRuntimeConfig("PAGES_URL") || "https://jmocoder.github.io/html_lore/";
}

function getDefaultAgentToken() {
  return getRuntimeConfig("AGENT_TOKEN") || getStored("agent-token") || "";
}

const state = {
  manifest: null,
  items: [],
  filter: { type: "library", value: "all" },
  query: "",
  agentUrl: getDefaultAgentUrl(),
  agentToken: getDefaultAgentToken(),
  authEnabled: false,
  authenticated: false,
  authChecked: false,
  currentUser: { username: "", dataId: "" },
  profile: loadProfile(),
  loginSubmitting: false,
  currentVersion: "0.8.4",
  latestVersion: "",
  updateAvailable: false,
  versionCheckComplete: false,
  language: getInitialLanguage(),
  themeMode: getInitialThemeMode(),
  feedbackKey: "connectAgent",
  feedbackParams: {},
  feedbackTimer: 0,
  activeSettingsTab: "basic",
  aiConfig: loadAiConfig(),
  aiStatus: null,
  aiRuns: [],
  selectedAiRunId: "",
  aiRunDetails: {},
  aiConversationId: "",
  aiConversationContextKey: "",
  aiContentExpansion: false,
  dataConfig: loadDataConfig(),
  itemState: loadItemState(),
  navConfig: loadNavConfig(),
  navSectionCollapsed: getInitialNavSectionState(),
  sidebarCollapsed: getInitialSidebarState(),
  sidebarWidth: getInitialSidebarWidth(),
  viewMode: getInitialViewMode(),
  aiPanelOpen: false,
  aiPanelWidth: getInitialAiPanelWidth(),
  multiFilterOpen: false,
  sortOpen: false,
  sortMode: getInitialSortMode(),
  tagMatchMode: "any",
  selectedTags: new Set(),
  manualAiContextIds: new Set(),
  onlyFavorites: getInitialFavoriteFilter(),
  currentReaderItemId: "",
  editingItemId: "",
  editingTags: new Set(),
  shares: [],
  sharingItemId: "",
};

const elements = {
  body: document.body,
  loginScreen: document.querySelector("#login-screen"),
  loginForm: document.querySelector("#login-form"),
  loginUsername: document.querySelector("#login-username"),
  loginPassword: document.querySelector("#login-password"),
  loginFeedback: document.querySelector("#login-feedback"),
  logoutButton: document.querySelector("#logout-button"),
  settingsProfileAvatar: document.querySelector("#settings-profile-avatar"),
  settingsProfileName: document.querySelector("#settings-profile-name"),
  settingsProfileId: document.querySelector("#settings-profile-id"),
  avatarUploadTrigger: document.querySelector("#avatar-upload-trigger"),
  avatarUpload: document.querySelector("#avatar-upload"),
  brandHome: document.querySelector("#brand-home"),
  sidebar: document.querySelector(".sidebar"),
  sidebarCollapse: document.querySelector("#sidebar-collapse"),
  sidebarResize: document.querySelector("#sidebar-resize"),
  navSectionToggles: document.querySelectorAll("[data-nav-section-toggle]"),
  navSections: document.querySelectorAll("[data-nav-section]"),
  importEntries: document.querySelectorAll("[data-import-entry]"),
  htmlImportFile: ensureHtmlImportInput(),
  materialGenerateFile: document.querySelector("#material-generate-file"),
  siteTitle: document.querySelector("#site-title"),
  languageSelect: document.querySelector("#language-select"),
  themeModeButtons: document.querySelectorAll("[data-theme-mode]"),
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
  aiRunRefresh: document.querySelector("#ai-run-refresh"),
  aiRunList: document.querySelector("#ai-run-list"),
  aiRunFeedback: document.querySelector("#ai-run-feedback"),
  versionStatus: document.querySelector("#version-status"),
  libraryNav: document.querySelector("#library-nav"),
  collectionNav: document.querySelector("#collection-nav"),
  tagNav: document.querySelector("#tag-nav"),
  multiFilterToggle: document.querySelector("#multi-filter-toggle"),
  multiFilterPopover: document.querySelector("#multi-filter-popover"),
  multiFilterResultCount: document.querySelector("#multi-filter-result-count"),
  multiTagOptions: document.querySelector("#multi-tag-options"),
  tagMatchButtons: document.querySelectorAll("[data-tag-match-mode]"),
  sortToggle: document.querySelector("#sort-toggle"),
  sortPopover: document.querySelector("#sort-popover"),
  sortButtons: document.querySelectorAll("[data-sort-mode]"),
  favoriteFilter: document.querySelector("#favorite-filter"),
  aiPanelOpen: document.querySelector("#ai-panel-open"),
  aiPanel: document.querySelector("#ai-panel"),
  aiPanelClose: document.querySelector("#ai-panel-close"),
  aiPanelResize: document.querySelector("#ai-panel-resize"),
  aiContextLabel: document.querySelector("#ai-context-label"),
  aiChatLog: document.querySelector("#ai-chat-log"),
  aiChatForm: document.querySelector("#ai-chat-form"),
  aiChatInput: document.querySelector("#ai-chat-input"),
  aiContentExpansion: document.querySelector("#ai-content-expansion"),
  aiGenerateNote: document.querySelector("#ai-generate-note"),
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
  readerEdit: document.querySelector("#reader-edit"),
  readerFavorite: document.querySelector("#reader-favorite"),
  readerArchive: document.querySelector("#reader-archive"),
  readerAiPanelOpen: document.querySelector("#reader-ai-panel-open"),
  readerOriginal: document.querySelector("#reader-original"),
  readerShare: document.querySelector("#reader-share"),
  readerFrame: document.querySelector("#reader-frame"),
  shareManagementList: document.querySelector("#share-management-list"),
  shareManagementFeedback: document.querySelector("#share-management-feedback"),
  shareDialog: document.querySelector("#share-dialog"),
  shareForm: document.querySelector("#share-form"),
  shareDuration: document.querySelector("#share-duration"),
  shareLink: document.querySelector("#share-link"),
  shareExpiry: document.querySelector("#share-expiry"),
  shareFeedback: document.querySelector("#share-feedback"),
  shareCreate: document.querySelector("#share-create"),
  shareCopy: document.querySelector("#share-copy"),
  shareRevoke: document.querySelector("#share-revoke"),
  shareCancel: document.querySelector("#share-cancel"),
  shareCancelIcon: document.querySelector("#share-cancel-icon"),
  generateNoteDialog: document.querySelector("#generate-note-dialog"),
  generateNoteForm: document.querySelector("#generate-note-form"),
  generateTheme: document.querySelector("#generate-theme"),
  generateTargetUse: document.querySelector("#generate-target-use"),
  generateShareHint: document.querySelector("#generate-share-hint"),
  generateStylePreference: document.querySelector("#generate-style-preference"),
  generateReferenceNote: document.querySelector("#generate-reference-note"),
  generateNoteFeedback: document.querySelector("#generate-note-feedback"),
  generateNoteSubmit: document.querySelector("#generate-note-submit"),
  generateNoteCancel: document.querySelector("#generate-note-cancel"),
  generateNoteCancelIcon: document.querySelector("#generate-note-cancel-icon"),
  metadataEditor: document.querySelector("#metadata-editor"),
  metadataForm: document.querySelector("#metadata-form"),
  metadataTitle: document.querySelector("#metadata-title"),
  metadataSummary: document.querySelector("#metadata-summary"),
  metadataCollection: document.querySelector("#metadata-collection"),
  metadataTagPicker: document.querySelector("#metadata-tag-picker"),
  metadataCancel: document.querySelector("#metadata-cancel"),
  metadataCancelIcon: document.querySelector("#metadata-cancel-icon"),
};

function ensureHtmlImportInput() {
  const existing = document.querySelector("#html-import-file");
  if (existing) return existing;
  const input = document.createElement("input");
  input.id = "html-import-file";
  input.type = "file";
  input.accept = ".html,.htm,text/html";
  input.hidden = true;
  document.body.append(input);
  return input;
}

async function boot() {
  if (isStaticShareRoute()) {
    await renderStaticShareFallback();
    return;
  }
  applyTheme();
  applyTranslations();
  try {
    await checkAuthStatus();
    if (state.authEnabled && !state.authenticated) {
      showLoginScreen();
      return;
    }
    hideLoginScreen();
    await loadRemoteNavConfig();
    await loadShares();
    state.manifest = await loadManifest();
    state.items = Array.isArray(state.manifest.items) ? state.manifest.items : [];
    renderApp();
    refreshAiStatus();
    checkVersionStatus();
    openFromHash();
  } catch (error) {
    elements.contentGrid.innerHTML = `<div class="empty-state">${t("manifestMissing")}</div>`;
    console.error(error);
  }
}

function isStaticShareRoute() {
  return /^\/share\/[^/]+\/?$/.test(window.location.pathname);
}

async function renderStaticShareFallback() {
  const token = window.location.pathname.split("/").filter(Boolean)[1] || "";
  document.documentElement.lang = "en";
  elements.body.className = "share-fallback-body";
  elements.body.innerHTML = `
    <main class="share-fallback-shell">
      <section class="share-fallback-banner">
        <div class="share-fallback-brand">HTMlore shared note</div>
        <h1>Loading shared note...</h1>
        <p></p>
      </section>
      <iframe class="share-fallback-frame" title="HTMlore shared note" sandbox="allow-scripts"></iframe>
    </main>
  `;
  try {
    const response = await fetch(`/api/public/shares/${encodeURIComponent(token)}`, { cache: "no-store" });
    if (!response.ok) throw new Error(`Share not found: ${response.status}`);
    const data = await response.json();
    const item = data.item || {};
    const title = item.title || "Shared note";
    const summary = item.summary || "";
    const frame = document.querySelector(".share-fallback-frame");
    document.title = `${title} - HTMlore Share`;
    document.querySelector(".share-fallback-banner h1").textContent = title;
    document.querySelector(".share-fallback-banner p").textContent = summary;
    frame.title = title;
    frame.srcdoc = renderShareSrcdoc(data);
    window.addEventListener("message", (event) => {
      if (!frame || event.source !== frame.contentWindow || !event.data) return;
      if (event.data.type === "html-lore-share-height") {
        const height = Number(event.data.height);
        if (Number.isFinite(height) && height > 0) {
          frame.style.height = `${Math.min(Math.max(height, 420), 16000)}px`;
        }
      }
      if (event.data.type === "html-lore-share-anchor") {
        const top = Number(event.data.top);
        if (Number.isFinite(top)) {
          const frameTop = frame.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: Math.max(frameTop + top - 12, 0), behavior: "smooth" });
        }
      }
    });
  } catch (error) {
    console.error(error);
    document.querySelector(".share-fallback-banner h1").textContent = "Share not found";
    document.querySelector(".share-fallback-banner p").textContent = "This shared note is unavailable, expired, or has been revoked.";
    document.querySelector(".share-fallback-frame").remove();
  }
}

function renderShareSrcdoc(data) {
  const body = data.html || "";
  const styles = data.styles || "";
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    :root { color-scheme: light dark; }
    html { min-height: 100%; }
    body { margin: 0; overflow-wrap: anywhere; }
    a:not([href]) { color: inherit; text-decoration: none; pointer-events: none; }
    a[href^="#"] { pointer-events: auto; }
    img, video, svg, canvas { max-width: 100%; height: auto; }
  </style>
  ${styles}
</head>
<body>
  ${body}
  <script>
    function reportHeight() {
      const doc = document.documentElement;
      const height = Math.max(doc.scrollHeight, document.body ? document.body.scrollHeight : 0);
      parent.postMessage({ type: "html-lore-share-height", height }, "*");
    }
    function scrollToFragment(hash) {
      if (!hash || hash === "#") return;
      const id = decodeURIComponent(hash.slice(1));
      const target = document.getElementById(id);
      if (!target) return;
      const top = target.getBoundingClientRect().top;
      parent.postMessage({ type: "html-lore-share-anchor", top }, "*");
      target.scrollIntoView({ block: "start", behavior: "smooth" });
      reportHeight();
    }
    document.addEventListener("click", (event) => {
      const anchor = event.target.closest('a[href^="#"]');
      if (anchor) {
        event.preventDefault();
        scrollToFragment(anchor.getAttribute("href"));
        return;
      }
      const trigger = event.target.closest("[data-share-toggle]");
      if (!trigger) return;
      const target = document.getElementById(trigger.getAttribute("data-share-toggle"));
      if (target) {
        target.classList.toggle("open");
        reportHeight();
      }
    });
    window.addEventListener("load", reportHeight);
    if ("ResizeObserver" in window) new ResizeObserver(reportHeight).observe(document.documentElement);
    reportHeight();
  <\/script>
</body>
</html>`;
}

async function checkAuthStatus() {
  if (!state.agentUrl) {
    state.authEnabled = false;
    state.authenticated = true;
    state.authChecked = true;
    return;
  }
  const response = await apiFetch("/api/auth/status", { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Unable to check auth status: ${response.status}`);
  }
  const data = await response.json();
  state.authEnabled = Boolean(data.enabled);
  state.authenticated = Boolean(data.authenticated);
  state.currentUser = {
    username: data.user || "",
    dataId: data.data_id || "",
  };
  state.authChecked = true;
}

function showLoginScreen(messageKey = "") {
  elements.body.classList.add("auth-required");
  elements.body.classList.remove("auth-session-active");
  elements.loginScreen.hidden = false;
  elements.loginFeedback.textContent = messageKey ? t(messageKey) : "";
  elements.loginUsername.focus();
}

function hideLoginScreen() {
  elements.body.classList.remove("auth-required");
  elements.body.classList.toggle("auth-session-active", state.authEnabled && state.authenticated);
  elements.loginScreen.hidden = true;
  elements.loginFeedback.textContent = "";
  elements.loginPassword.value = "";
}

async function submitLogout() {
  if (!state.agentUrl || !state.authEnabled) return;
  try {
    await apiFetch("/api/auth/logout", { method: "POST" });
  } catch (error) {
    console.warn("Logout failed.", error);
  }
  state.authenticated = false;
  state.currentUser = { username: "", dataId: "" };
  state.manifest = null;
  state.items = [];
  closeSettings();
  closeAiPanel();
  closeReader();
  showLoginScreen();
}

async function submitLogin(event) {
  event.preventDefault();
  if (!state.agentUrl || state.loginSubmitting) return;
  state.loginSubmitting = true;
  elements.loginFeedback.textContent = "";
  elements.loginForm.querySelector("button[type='submit']").disabled = true;
  try {
    const response = await apiFetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: elements.loginUsername.value,
        password: elements.loginPassword.value,
      }),
    });
    if (!response.ok) {
      showLoginScreen(response.status === 401 ? "loginFailed" : "loginUnavailable");
      return;
    }
    const data = await response.json();
    state.authEnabled = Boolean(data.enabled);
    state.authenticated = Boolean(data.authenticated);
    state.currentUser = {
      username: data.user || elements.loginUsername.value,
      dataId: data.data_id || "",
    };
    if (!state.authenticated) {
      showLoginScreen("loginFailed");
      return;
    }
    hideLoginScreen();
    await boot();
  } catch (error) {
    console.error(error);
    showLoginScreen("loginUnavailable");
  } finally {
    state.loginSubmitting = false;
    elements.loginForm.querySelector("button[type='submit']").disabled = false;
  }
}

async function loadManifest() {
  if (state.agentUrl) {
    try {
      const response = await apiFetch("/api/manifest", { cache: "no-store" });
      if (response.ok) return response.json();
    } catch (error) {
      console.warn("Agent manifest unavailable, falling back to static manifest.", error);
    }
  }
  const response = await fetch("manifest.json", { cache: "no-store" });
  if (!response.ok) throw new Error(`Unable to load manifest: ${response.status}`);
  return response.json();
}

async function refreshManifestAndWorkspace() {
  state.manifest = await loadManifest();
  state.items = Array.isArray(state.manifest.items) ? state.manifest.items : [];
  normalizeVisibleTagFilters();
  renderLibraryNav();
  renderCollectionNav();
  renderTagNav();
  renderMultiFilterOptions();
  renderManagementLists();
  renderGrid();
  renderAiContext();
}

function buildApiUrl(path) {
  if (!state.agentUrl) return path;
  return `${state.agentUrl.replace(/\/$/, "")}${path}`;
}

function getApiHeaders(headers = {}) {
  const result = { ...headers };
  if (state.agentToken) result.Authorization = `Bearer ${state.agentToken}`;
  return result;
}

function apiFetch(path, options = {}) {
  return fetch(buildApiUrl(path), {
    ...options,
    credentials: "same-origin",
    headers: getApiHeaders(options.headers || {}),
  });
}

function withApiAccessToken(url) {
  if (!state.agentToken) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}access_token=${encodeURIComponent(state.agentToken)}`;
}

function renderApp() {
  applySidebarState();
  applySidebarWidth();
  applyNavSectionState();
  applyAiPanelState();
  updateMobileReaderTop();
  applyTheme();
  renderProfile();
  applyViewMode();
  applyFavoriteFilter();
  applyTranslations();
  renderWorkspaceBrand();
  renderFeedback();
  renderLibraryNav();
  renderCollectionNav();
  renderTagNav();
  renderMultiFilterOptions();
  applySortState();
  renderGrid();
  renderAiContext();
  updateAgentStatus();
  renderAiConfig();
  renderDataConfig();
  renderManagementLists();
  renderShareManagement();
  renderVersionStatus();
}

function updateMobileReaderTop() {
  const isMobile = window.matchMedia("(max-width: 900px)").matches;
  const height = isMobile && elements.sidebar ? Math.ceil(elements.sidebar.getBoundingClientRect().height) : 0;
  document.documentElement.style.setProperty("--mobile-reader-top", `${height}px`);
}

function renderWorkspaceBrand() {
  if (!elements.siteTitle) return;
  elements.siteTitle.replaceChildren("HTM");
  const accent = document.createElement("em");
  accent.textContent = "lore";
  elements.siteTitle.append(accent);
}

async function checkVersionStatus() {
  try {
    if (state.agentUrl) {
      const response = await apiFetch("/api/version", { cache: "no-store" });
      if (response.ok) {
        const data = await response.json();
        state.currentVersion = normalizeVersion(data.version) || state.currentVersion;
      }
    }
    const latest = await fetchLatestGithubVersion();
    state.latestVersion = latest;
    state.updateAvailable = isVersionNewer(latest, state.currentVersion);
    state.versionCheckComplete = true;
  } catch (error) {
    state.versionCheckComplete = true;
    console.warn("Version check unavailable.", error);
  }
  renderVersionStatus();
}

async function fetchLatestGithubVersion() {
  const signal = AbortSignal.timeout ? AbortSignal.timeout(4000) : undefined;
  const releaseResponse = await fetch("https://api.github.com/repos/JMoCoder/html_lore/releases/latest", {
    headers: { Accept: "application/vnd.github+json" },
    signal,
  });
  if (releaseResponse.ok) {
    const release = await releaseResponse.json();
    const version = normalizeVersion(release.tag_name || release.name || "");
    if (version) return version;
  }
  const tagsResponse = await fetch("https://api.github.com/repos/JMoCoder/html_lore/tags", {
    headers: { Accept: "application/vnd.github+json" },
    signal,
  });
  if (!tagsResponse.ok) throw new Error(`GitHub tags returned ${tagsResponse.status}`);
  const tags = await tagsResponse.json();
  const versions = Array.isArray(tags) ? tags.map((tag) => normalizeVersion(tag.name)).filter(Boolean) : [];
  versions.sort(compareVersions).reverse();
  return versions[0] || "";
}

function renderVersionStatus() {
  document.querySelectorAll("[data-i18n='aboutVersion']").forEach((node) => {
    node.textContent = t("aboutVersion", { version: state.currentVersion });
  });
  if (!elements.versionStatus) return;
  if (!state.versionCheckComplete) {
    elements.versionStatus.textContent = "";
  } else if (state.updateAvailable) {
    elements.versionStatus.textContent = t("updateAvailable", { version: state.latestVersion });
  } else if (state.latestVersion) {
    elements.versionStatus.textContent = t("versionCurrent");
  } else {
    elements.versionStatus.textContent = t("versionCheckUnavailable");
  }
}

function renderLibraryNav() {
  elements.libraryNav.replaceChildren(...libraryFilterDefinitions.filter((filter) => {
    return isManagedItemVisible("library", filter.value);
  }).map((filter) => {
    const count = countLibraryFilter(filter.value);
    const active = state.filter.type === "library" && state.filter.value === filter.value;
    return navButton(t(filter.labelKey), count, active, () => {
      selectLibraryFilter(filter.value);
    });
  }));
}

function renderCollectionNav() {
  const buttons = getCollectionOptions()
    .filter((collection) => isManagedItemVisible("collections", collection.name))
    .map((collection) => {
    const active = state.filter.type === "collection" && state.filter.value === collection.name;
    return navButton(collection.name, countCollectionItems(collection.name), active, () => {
      selectCollection(collection.name);
    });
  });
  elements.collectionNav.replaceChildren(...buttons);
}

function renderTagNav() {
  const tags = getTagOptions()
    .filter((tag) => isManagedItemVisible("tags", tag.name))
    .map((tag) => ({ ...tag, count: countTagItems(tag.name) }))
    .filter((tag) => tag.count > 0)
    .map((tag) => {
    const active = state.filter.type === "tag" && state.filter.value === tag.name;
    const multiActive = state.selectedTags.has(tag.name);
    return navButton(`#${tag.name}`, tag.count, active || multiActive, () => {
      selectTag(tag.name);
    }, "tag-filter");
  });
  elements.tagNav.replaceChildren(...tags);
}

function navButton(label, count, active, onClick, extraClass = "") {
  const button = document.createElement("button");
  button.className = `nav-item${extraClass ? ` ${extraClass}` : ""}${active ? " active" : ""}`;
  button.type = "button";
  button.innerHTML = `<span>${escapeHtml(label)}</span><span>${count}</span>`;
  button.addEventListener("click", onClick);
  return button;
}

function countLibraryFilter(value) {
  const filter = libraryFilterDefinitions.find((item) => item.value === value);
  if (!filter) return 0;
  return state.items.filter((item) => filter.test(item) && isVisibleInArchiveScope(item, value)).length;
}

function countCollectionItems(name) {
  return state.items.filter((item) => !isArchived(item) && getItemCollection(item) === name).length;
}

function countTagItems(name) {
  return state.items.filter((item) => !isArchived(item) && getItemTags(item).includes(name)).length;
}

function normalizeVisibleTagFilters() {
  if (state.filter.type === "tag" && countTagItems(state.filter.value) === 0) {
    state.filter = { type: "library", value: "all" };
  }
  state.selectedTags.forEach((tag) => {
    if (countTagItems(tag) === 0) state.selectedTags.delete(tag);
  });
}

function filteredItems() {
  return sortItems(applySelectedTagFilters(baseItemsForTagFilters()));
}

function baseItemsForTagFilters() {
  const query = state.query.trim().toLowerCase();
  let items = [...state.items];

  if (state.filter.type === "library") {
    const filter = libraryFilterDefinitions.find((item) => item.value === state.filter.value);
    items = filter ? items.filter(filter.test) : items;
  } else if (state.filter.type === "collection") {
    items = items.filter((item) => getItemCollection(item) === state.filter.value);
  } else if (state.filter.type === "tag") {
    items = items.filter((item) => getItemTags(item).includes(state.filter.value));
  }

  const filterValue = state.filter.type === "library" ? state.filter.value : "";
  items = items.filter((item) => isVisibleInArchiveScope(item, filterValue));

  if (state.onlyFavorites) {
    items = items.filter((item) => isFavorite(item));
  }

  if (query) {
    items = items.filter((item) => searchableText(item).includes(query));
  }

  return items;
}

function applySelectedTagFilters(items, selectedTags = state.selectedTags, mode = state.tagMatchMode) {
  if (selectedTags.size === 0) return [...items];
  return items.filter((item) => {
    const tags = getItemTags(item);
    if (mode === "all") {
      return [...selectedTags].every((tag) => tags.includes(tag));
    }
    return tags.some((tag) => selectedTags.has(tag));
  });
}

function isVisibleInArchiveScope(item, value) {
  if (value === "archived") return isArchived(item);
  return !isArchived(item);
}

function searchableText(item) {
  return [
    getItemTitle(item),
    getItemSummary(item),
    item.path,
    getItemCollection(item),
    item.source_type,
    ...getItemTags(item),
  ].filter(Boolean).join(" ").toLowerCase();
}

function sortItems(items) {
  const sorted = [...items];
  const byNewest = (a, b) => String(b.updated).localeCompare(String(a.updated));
  const byOldest = (a, b) => String(a.updated).localeCompare(String(b.updated));
  const byTitleAz = (a, b) => String(getItemTitle(a) || "").localeCompare(String(getItemTitle(b) || ""), undefined, { sensitivity: "base" });
  const byTitleZa = (a, b) => byTitleAz(b, a);

  const comparator = {
    newest: (a, b) => byNewest(a, b) || byTitleAz(a, b),
    oldest: (a, b) => byOldest(a, b) || byTitleAz(a, b),
    "title-az": (a, b) => byTitleAz(a, b) || byNewest(a, b),
    "title-za": (a, b) => byTitleZa(a, b) || byNewest(a, b),
  }[state.sortMode] || ((a, b) => byNewest(a, b) || byTitleAz(a, b));

  return sorted.sort(comparator);
}

function renderGrid() {
  renderMultiFilterOptions();
  const items = filteredItems();
  elements.contentGrid.classList.remove("list-view");

  if (items.length === 0) {
    elements.contentGrid.innerHTML = `<div class="empty-state">${t("noMatches")}</div>`;
    return;
  }

  elements.contentGrid.replaceChildren(...items.map(renderCard));
}

function getWorkspaceTitle() {
  if (state.query) return t("searchTitle", { query: state.query });
  if (state.filter.type === "library") {
    const filter = libraryFilterDefinitions.find((item) => item.value === state.filter.value);
    return filter ? t(filter.labelKey) : t("knowledgeWorkspace");
  }
  if (state.filter.type === "collection") return state.filter.value;
  if (state.filter.type === "tag") return `#${state.filter.value}`;
  return t("knowledgeWorkspace");
}

function renderCard(item) {
  const card = document.createElement("article");
  card.className = "item-card";
  const sourceLabel = getSourceLabel(item);
  const collectionLabel = getItemCollection(item);
  const title = getItemTitle(item);
  const summary = getItemSummary(item);
  const tags = getItemTags(item);
  card.innerHTML = `
    <div class="card-topline">
      <span class="source-type">${escapeHtml(collectionLabel)} / ${escapeHtml(sourceLabel)}</span>
      <div class="item-actions">
        ${isArchived(item) ? "" : itemActionButton("edit", item)}
        ${itemActionButton("favorite", item)}
        ${itemActionButton("archive", item)}
        ${isArchived(item) ? "" : itemActionButton("share", item)}
        ${itemActionButton(isArchived(item) ? "delete" : "ai-context", item)}
      </div>
    </div>
    <h3>${escapeHtml(title)}</h3>
    <p>${escapeHtml(summary || t("noSummary"))}</p>
    <div class="card-tags">${tags.slice(0, 4).map((tag) => `<span>#${escapeHtml(tag)}</span>`).join("")}</div>
    <div class="card-footer">
      <span class="card-date">${escapeHtml(formatDate(getItemDisplayDate(item)))}</span>
      <div class="card-links">
        <button type="button" data-read>${escapeHtml(t("read"))}</button>
        <a href="${escapeHtml(getReaderRawUrl(item))}" target="_blank" rel="noreferrer">${escapeHtml(t("original"))}</a>
      </div>
    </div>
  `;
  card.querySelector("[data-read]").addEventListener("click", () => openReader(item));
  card.querySelector("[data-item-action='edit']")?.addEventListener("click", (event) => {
    event.stopPropagation();
    openMetadataEditor(item.id);
  });
  card.querySelector("[data-item-action='favorite']").addEventListener("click", (event) => {
    event.stopPropagation();
    toggleFavorite(item.id);
  });
  card.querySelector("[data-item-action='archive']").addEventListener("click", (event) => {
    event.stopPropagation();
    toggleArchive(item.id);
  });
  card.querySelector("[data-item-action='share']")?.addEventListener("click", (event) => {
    event.stopPropagation();
    openShareDialog(item.id);
  });
  card.querySelector("[data-item-action='ai-context']")?.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleManualAiContext(item.id);
  });
  card.querySelector("[data-item-action='delete']")?.addEventListener("click", (event) => {
    event.stopPropagation();
    permanentlyDeleteItem(item.id);
  });
  card.addEventListener("dblclick", () => openReader(item));
  return card;
}

function getSourceLabel(item) {
  if (item.agent?.generated || item.source_type === "topic") return t("generatedSource");
  return t("importedSource");
}

function itemActionButton(action, item) {
  const active = action === "favorite" ? isFavorite(item)
    : action === "archive" ? isArchived(item)
      : action === "share" ? Boolean(getActiveShareForItem(item.id))
        : action === "ai-context" ? state.manualAiContextIds.has(item.id)
          : false;
  const label = {
    edit: t("editMetadata"),
    favorite: t(active ? "unfavoriteAction" : "favoriteAction"),
    archive: t(active ? "unarchiveAction" : "archiveAction"),
    share: t("shareAction"),
    "ai-context": t(active ? "removeFromAiContext" : "addToAiContext"),
    delete: t("permanentDeleteAction"),
  }[action];
  return `
    <button class="item-icon-button${active ? " active" : ""}" type="button" data-item-action="${action}" aria-label="${escapeHtml(label)}" title="${escapeHtml(label)}">
      ${action === "edit" ? editIcon() : action === "favorite" ? starIcon(active) : action === "archive" ? archiveIcon() : action === "share" ? shareIcon() : action === "delete" ? trashIcon() : contextToggleIcon(active)}
    </button>
  `;
}

function openReader(item) {
  state.currentReaderItemId = item.id;
  elements.reader.hidden = false;
  elements.reader.classList.remove("compact-reader-header");
  elements.body.classList.add("reader-open");
  requestAnimationFrame(updateMobileReaderTop);
  renderReaderMetadata(item);
  elements.readerFrame.src = getReaderContentUrl(item);
  renderReaderActions(item);
  renderAiContext();
  window.location.hash = `/${item.id}`;
}

function renderReaderMetadata(item) {
  elements.readerTitle.textContent = getItemTitle(item);
  elements.readerSummary.textContent = getItemSummary(item) || "";
  elements.readerSource.textContent = `${getItemCollection(item)} / ${getSourceLabel(item)}`;
  elements.readerOriginal.href = getReaderRawUrl(item);
  elements.readerTags.replaceChildren(...getItemTags(item).map((tag) => {
    const span = document.createElement("span");
    span.textContent = `#${tag}`;
    return span;
  }));
}

function getReaderContentUrl(item) {
  if (!state.agentUrl) return item.path;
  return withApiAccessToken(buildApiUrl(`/api/items/${encodeURIComponent(item.id)}/content`));
}

function getReaderRawUrl(item) {
  if (!state.agentUrl) return item.path;
  return withApiAccessToken(buildApiUrl(`/api/items/${encodeURIComponent(item.id)}/raw`));
}

function bindReaderFrameScroll() {
  elements.reader.classList.remove("compact-reader-header");
  try {
    const readerWindow = elements.readerFrame.contentWindow;
    const readerDocument = elements.readerFrame.contentDocument;
    if (!readerWindow || !readerDocument) return;
    const updateMobileFrameHeight = () => {
      if (!window.matchMedia("(max-width: 900px)").matches) {
        elements.readerFrame.style.height = "";
        return;
      }
      const doc = readerDocument.documentElement;
      const body = readerDocument.body;
      const height = Math.max(doc?.scrollHeight || 0, body?.scrollHeight || 0, window.innerHeight);
      elements.readerFrame.style.height = `${Math.ceil(height)}px`;
    };
    const update = () => {
      updateMobileFrameHeight();
      if (window.matchMedia("(max-width: 900px)").matches) {
        elements.reader.classList.remove("compact-reader-header");
        return;
      }
      const scrollTop = readerWindow.scrollY || readerDocument.documentElement.scrollTop || readerDocument.body.scrollTop || 0;
      elements.reader.classList.toggle("compact-reader-header", scrollTop > 24);
    };
    readerWindow.addEventListener("scroll", update, { passive: true });
    readerWindow.addEventListener("resize", update);
    setTimeout(update, 250);
    setTimeout(update, 900);
    update();
  } catch {
    elements.reader.classList.remove("compact-reader-header");
  }
}

function closeReader() {
  state.currentReaderItemId = "";
  elements.reader.hidden = true;
  elements.reader.classList.remove("compact-reader-header");
  elements.body.classList.remove("reader-open");
  elements.readerFrame.style.height = "";
  elements.readerFrame.removeAttribute("src");
  if (window.location.hash) {
    history.pushState("", document.title, window.location.pathname + window.location.search);
  }
  renderAiContext();
}

function returnToWorkspace() {
  clearFeedback();
  state.currentReaderItemId = "";
  elements.reader.hidden = true;
  elements.reader.classList.remove("compact-reader-header");
  elements.body.classList.remove("reader-open");
  elements.readerFrame.style.height = "";
  elements.readerFrame.removeAttribute("src");
  elements.settingsPage.hidden = true;
  if (window.location.hash) {
    history.pushState("", document.title, window.location.pathname + window.location.search);
  }
  renderAiContext();
}

function goHome() {
  state.filter = { type: "library", value: "all" };
  state.query = "";
  elements.searchInput.value = "";
  clearMultiFilters(false);
  returnToWorkspace();
  renderApp();
}

function openPagesHome() {
  window.location.href = getPagesHomeUrl();
}

function openWorkspaceHome() {
  selectLibraryFilter("all");
}

function selectLibraryFilter(value) {
  state.filter = { type: "library", value };
  clearMultiFilters(false);
  returnToWorkspace();
  renderApp();
}

function selectCollection(name) {
  state.filter = { type: "collection", value: name };
  syncSingleSelectionToMultiFilter("collection", name);
  returnToWorkspace();
  renderApp();
}

function selectTag(name) {
  state.filter = { type: "tag", value: name };
  syncSingleSelectionToMultiFilter("tag", name);
  returnToWorkspace();
  renderApp();
}

function syncSingleSelectionToMultiFilter(type, value) {
  if (state.selectedTags.size === 0) return;
  if (type === "tag") {
    state.selectedTags.clear();
    state.selectedTags.add(value);
  }
}

function openSettings(tab = "basic", updateHash = true) {
  clearFeedback();
  setSettingsTab(tab, false);
  elements.settingsPage.hidden = false;
  maybeRefreshAiRuns();
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
  state.activeSettingsTab = validTabs.has(tab) ? tab : "basic";
  renderSettingsTabs();
  if (!elements.settingsPage.hidden) {
    maybeRefreshAiRuns();
  }
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
  if (elements.inputType.value === "file") {
    openMaterialGeneratePicker();
    return;
  }

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
    const response = await apiFetch("/api/jobs", {
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

function openHtmlImportPicker() {
  elements.htmlImportFile.value = "";
  elements.htmlImportFile.click();
}

function openMaterialGeneratePicker() {
  if (!state.agentUrl) {
    setFeedback("agentNotConfigured");
    return;
  }
  elements.materialGenerateFile.value = "";
  elements.materialGenerateFile.click();
}

async function generateNoteFromMaterialFile(file) {
  if (!file) return;
  if (!state.agentUrl) {
    setFeedback("agentNotConfigured");
    return;
  }
  setFeedback("generatingMaterialNote");
  const formData = new FormData();
  formData.append("file", file);
  formData.append("instruction", elements.newItemInput.value.trim());
  formData.append("theme", "default");
  formData.append("target_use", "default");
  formData.append("style_preference", "default");
  formData.append("reference_style", "default");

  try {
    const response = await apiFetch("/api/ai/material-runs", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) throw new Error(`Agent returned ${response.status}`);
    const result = await response.json();
    await refreshManifestAndWorkspace();
    await loadAiRuns();
    elements.newItemInput.value = "";
    setFeedback("materialNoteDone", { title: result.item?.title || file.name });
  } catch (error) {
    await loadAiRuns();
    setFeedback("materialNoteFailed");
    console.error(error);
  }
}

async function importHtmlFile(file) {
  if (!file) return;
  if (!state.agentUrl) {
    setFeedback("agentNotConfigured");
    return;
  }
  setFeedback("importingHtml");
  const formData = new FormData();
  formData.append("file", file);
  try {
    const response = await apiFetch("/api/uploads/html", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) throw new Error(`Agent returned ${response.status}`);
    const result = await response.json();
    if (result.item) {
      const index = state.items.findIndex((item) => item.id === result.item.id);
      if (index >= 0) state.items[index] = result.item;
      else state.items.unshift(result.item);
    }
    renderLibraryNav();
    renderCollectionNav();
    renderTagNav();
    renderMultiFilterOptions();
    renderManagementLists();
    renderGrid();
    renderAiContext();
    setFeedback("importHtmlDone", { title: result.item?.title || file.name });
  } catch (error) {
    setFeedback("importHtmlFailed");
    console.error(error);
  }
}

function updateAgentStatus() {
  if (!elements.agentStatus) return;
  const connected = Boolean(state.agentUrl);
  const aiReady = Boolean(state.aiStatus?.available);
  elements.agentStatus.textContent = aiReady ? t("aiReady") : t(connected ? "agentConnected" : "staticMode");
  elements.agentStatus.classList.toggle("connected", connected || aiReady);
}

async function refreshAiStatus() {
  try {
    const response = await apiFetch("/api/ai/status", { cache: "no-store" });
    if (!response.ok) throw new Error(`Agent returned ${response.status}`);
    state.aiStatus = await response.json();
    syncAiConfigFromServer(state.aiStatus.provider);
  } catch (error) {
    state.aiStatus = null;
  }
  renderAiConfig();
  updateAgentStatus();
}

function openReaderAiPanel() {
  const item = getItemById(state.currentReaderItemId);
  if (item && isArchived(item)) {
    permanentlyDeleteItem(item.id);
    return;
  }
  if (state.aiPanelOpen) {
    closeAiPanel();
    return;
  }
  state.manualAiContextIds.clear();
  renderGrid();
  renderAiContext();
  openAiPanel();
}

async function loadShares() {
  if (!state.agentUrl) {
    state.shares = [];
    return;
  }
  try {
    const response = await apiFetch("/api/shares", { cache: "no-store" });
    if (!response.ok) throw new Error(`Agent returned ${response.status}`);
    const data = await response.json();
    state.shares = Array.isArray(data.shares) ? data.shares : [];
  } catch (error) {
    state.shares = [];
    console.warn("Share list unavailable.", error);
  }
}

function getActiveShareForItem(itemId) {
  return state.shares.find((share) => share.item_id === itemId && share.active && !share.revoked);
}

function getShareUrl(share) {
  return share?.url_path ? new URL(share.url_path, window.location.origin).href : "";
}

function openShareDialog(itemId) {
  const item = getItemById(itemId);
  if (!item) return;
  state.sharingItemId = itemId;
  const activeShare = getActiveShareForItem(itemId);
  elements.shareDuration.value = activeShare?.duration || "1d";
  elements.shareLink.value = activeShare ? getShareUrl(activeShare) : "";
  elements.shareCreate.textContent = t(activeShare ? "updateShare" : "createShare");
  elements.shareCopy.hidden = !elements.shareLink.value;
  elements.shareRevoke.hidden = !activeShare;
  renderShareExpiry(activeShare);
  elements.shareFeedback.textContent = state.agentUrl ? (activeShare && !elements.shareLink.value ? t("shareLinkOneTime") : "") : t("shareNeedsAgent");
  elements.shareDialog.hidden = false;
  elements.shareDuration.focus();
}

function closeShareDialog() {
  state.sharingItemId = "";
  elements.shareDialog.hidden = true;
  elements.shareFeedback.textContent = "";
  elements.shareLink.value = "";
  renderShareExpiry(null);
}

async function submitShareDialog(event) {
  event.preventDefault();
  if (!state.agentUrl) {
    elements.shareFeedback.textContent = t("shareNeedsAgent");
    return;
  }
  const itemId = state.sharingItemId;
  const activeShare = getActiveShareForItem(itemId);
  try {
    let share;
    if (activeShare) {
      const response = await apiFetch(`/api/shares/${encodeURIComponent(activeShare.id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ duration: elements.shareDuration.value }),
      });
      if (!response.ok) throw await buildShareError(response);
      const updated = await response.json();
      share = { ...updated, url_path: updated.url_path || activeShare.url_path };
      replaceShare(share);
      elements.shareLink.value = getShareUrl(share);
      elements.shareFeedback.textContent = t("shareUpdated");
    } else {
      const response = await apiFetch("/api/shares", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item_id: itemId, duration: elements.shareDuration.value }),
      });
      if (!response.ok) throw await buildShareError(response);
      const data = await response.json();
      share = { ...data.share, url_path: data.url_path };
      replaceShare(share);
      elements.shareLink.value = new URL(data.url_path, window.location.origin).href;
      elements.shareFeedback.textContent = t("shareCreated");
    }
    renderReaderShareState();
    renderGrid();
    renderShareManagement();
    renderShareExpiry(share);
    elements.shareCreate.textContent = t("updateShare");
    elements.shareCopy.hidden = !elements.shareLink.value;
    elements.shareRevoke.hidden = false;
  } catch (error) {
    elements.shareFeedback.textContent = error?.code === "safety" ? t("shareBlocked") : t("shareFailed");
    console.error(error);
  }
}

async function buildShareError(response) {
  try {
    const data = await response.json();
    if (data?.detail?.safety) return { code: "safety", detail: data.detail };
    return { code: "error", detail: data.detail || response.status };
  } catch {
    return { code: "error", detail: response.status };
  }
}

function replaceShare(share) {
  const index = state.shares.findIndex((item) => item.id === share.id);
  if (index >= 0) state.shares[index] = share;
  else state.shares.unshift(share);
}

async function copyCurrentShareLink() {
  const value = elements.shareLink.value.trim();
  if (!value) return;
  await navigator.clipboard?.writeText(value);
  elements.shareFeedback.textContent = t("shareCopied");
}

async function revokeCurrentShare() {
  const share = getActiveShareForItem(state.sharingItemId);
  if (!share || !state.agentUrl) return;
  try {
    const response = await apiFetch(`/api/shares/${encodeURIComponent(share.id)}`, { method: "DELETE" });
    if (!response.ok) throw new Error(`Agent returned ${response.status}`);
    replaceShare(await response.json());
    elements.shareFeedback.textContent = t("shareRevoked");
    renderReaderShareState();
    renderGrid();
    renderShareManagement();
    openShareDialog(state.sharingItemId);
  } catch (error) {
    elements.shareFeedback.textContent = t("shareFailed");
    console.error(error);
  }
}

function renderReaderShareState() {
  const item = getItemById(state.currentReaderItemId);
  const archived = item ? isArchived(item) : false;
  const active = !archived && Boolean(getActiveShareForItem(state.currentReaderItemId));
  elements.readerShare.hidden = archived;
  elements.readerShare.classList.toggle("active", active);
  elements.readerShare.innerHTML = shareIcon();
  setIconButtonLabel(elements.readerShare, "shareAction");
}

function renderShareManagement() {
  if (!elements.shareManagementList) return;
  const activeShares = state.shares.filter((share) => !share.revoked);
  if (activeShares.length === 0) {
    elements.shareManagementList.innerHTML = `<div class="empty-state">${escapeHtml(t("noShares"))}</div>`;
    return;
  }
  elements.shareManagementList.replaceChildren(...activeShares.map(renderShareManagementRow));
}

function renderShareManagementRow(share) {
  const item = getItemById(share.item_id);
  const status = getShareStatus(share);
  const row = document.createElement("div");
  row.className = "management-row share-row";
  row.innerHTML = `
    <div class="management-name">
      <strong>${escapeHtml(item ? getItemTitle(item) : share.item_id)}</strong>
      <span class="share-row-meta">
        ${shareStatusMarkup(status)}
        <span>${escapeHtml(formatShareExpiry(share))}</span>
        <span>${escapeHtml(t("shareAccessCount", { count: share.access_count || 0 }))}</span>
      </span>
    </div>
    <div class="management-actions">
      <button type="button" data-share-revoke>${escapeHtml(t("revokeShare"))}</button>
      <button type="button" data-share-open>${escapeHtml(t("shareAction"))}</button>
    </div>
  `;
  row.querySelector("[data-share-open]").addEventListener("click", () => openShareDialog(share.item_id));
  row.querySelector("[data-share-revoke]").addEventListener("click", async () => {
    try {
      const response = await apiFetch(`/api/shares/${encodeURIComponent(share.id)}`, { method: "DELETE" });
      if (!response.ok) throw new Error(`Agent returned ${response.status}`);
      replaceShare(await response.json());
      elements.shareManagementFeedback.textContent = t("shareRevoked");
      renderShareManagement();
      renderReaderShareState();
      renderGrid();
    } catch (error) {
      elements.shareManagementFeedback.textContent = t("shareFailed");
      console.error(error);
    }
  });
  return row;
}

function formatShareExpiry(share) {
  return share?.expires_at ? formatDateTime(share.expires_at) : t("shareNoExpiry");
}

function getShareStatus(share) {
  return {
    active: Boolean(share?.active && !share?.revoked),
    label: t(share?.active && !share?.revoked ? "shareActive" : "shareExpired"),
  };
}

function shareStatusMarkup(status) {
  return `<span class="share-status ${status.active ? "is-active" : "is-expired"}"><span class="share-status-dot" aria-hidden="true"></span>${escapeHtml(status.label)}</span>`;
}

function renderShareExpiry(share) {
  if (!elements.shareExpiry) return;
  if (!share) {
    elements.shareExpiry.hidden = true;
    elements.shareExpiry.replaceChildren();
    return;
  }
  const status = getShareStatus(share);
  const label = share.expires_at ? t("shareValidUntil", { date: formatDateTime(share.expires_at) }) : t("shareNoExpiry");
  elements.shareExpiry.hidden = false;
  elements.shareExpiry.innerHTML = `
    <span>${escapeHtml(label)}</span>
    ${shareStatusMarkup(status)}
  `;
}

function toggleManualAiContext(id) {
  if (state.manualAiContextIds.has(id)) {
    state.manualAiContextIds.delete(id);
  } else {
    state.manualAiContextIds.add(id);
  }
  renderGrid();
  const item = getItemById(id);
  if (item && state.currentReaderItemId === id && !elements.reader.hidden) {
    renderReaderActions(item);
  }
  renderAiContext();
}

function renderReaderActions(item) {
  const favorite = isFavorite(item);
  const archived = isArchived(item);
  const favoriteLabel = t(favorite ? "unfavoriteAction" : "favoriteAction");
  const archiveLabel = t(archived ? "unarchiveAction" : "archiveAction");
  elements.readerEdit.hidden = archived;
  if (!archived) {
    elements.readerEdit.innerHTML = editIcon();
    setIconButtonLabel(elements.readerEdit, "editMetadata");
  }
  elements.readerFavorite.classList.toggle("active", favorite);
  elements.readerFavorite.innerHTML = starIcon(favorite);
  elements.readerFavorite.setAttribute("aria-label", favoriteLabel);
  elements.readerFavorite.setAttribute("title", favoriteLabel);
  elements.readerArchive.classList.toggle("active", archived);
  elements.readerArchive.innerHTML = archiveIcon();
  elements.readerArchive.setAttribute("aria-label", archiveLabel);
  elements.readerArchive.setAttribute("title", archiveLabel);
  elements.readerAiPanelOpen.innerHTML = archived ? trashIcon() : aiSparkIcon();
  setIconButtonLabel(elements.readerAiPanelOpen, archived ? "permanentDeleteAction" : "openGlobalAi");
  elements.readerAiPanelOpen.classList.toggle("danger", archived);
  renderReaderShareState();
}

function getItemById(id) {
  return state.items.find((item) => item.id === id);
}

function getItemMetadata(item) {
  return state.itemState[item.id]?.metadata || {};
}

function getItemTitle(item) {
  const title = getItemMetadata(item).title;
  return typeof title === "string" && title.trim() ? title.trim() : item.title || t("item");
}

function getItemSummary(item) {
  const summary = getItemMetadata(item).summary;
  return typeof summary === "string" ? summary : item.summary || "";
}

function getItemCollection(item) {
  const collection = getItemMetadata(item).collection;
  return typeof collection === "string" && collection.trim() ? collection.trim() : item.collection || "Inbox";
}

function getItemDisplayDate(item) {
  return item.created || item.updated || "";
}

function getItemTags(item) {
  const tags = getItemMetadata(item).tags;
  if (Array.isArray(tags)) return normalizeTags(tags);
  return normalizeTags(item.tags || []);
}

function normalizeTags(tags) {
  return [...new Set(tags.map((tag) => String(tag || "").trim().replace(/^#/, "")).filter(Boolean))];
}

function parseTagInput(value) {
  return normalizeTags(String(value || "").split(/[,，]/));
}

function getCollectionOptions() {
  return mergeManifestAndItemNames("collections", (item) => getItemCollection(item));
}

function getTagOptions() {
  return mergeManifestAndItemNames("tags", (item) => getItemTags(item));
}

function mergeManifestAndItemNames(type, extractor) {
  const manifestNames = (state.manifest?.[type] || []).map((item) => item.name).filter(Boolean);
  const names = new Set(manifestNames);
  const dynamicNames = [];
  state.items.forEach((item) => {
    const value = extractor(item);
    const values = Array.isArray(value) ? value : [value];
    values.filter(Boolean).forEach((name) => {
      if (names.has(name)) return;
      names.add(name);
      dynamicNames.push(name);
    });
  });
  dynamicNames.sort((a, b) => String(a).localeCompare(String(b), undefined, { sensitivity: "base" }));
  return [...manifestNames, ...dynamicNames].map((name) => ({ name }));
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

async function toggleFavorite(id) {
  const item = getItemById(id);
  if (!item) return;
  await updateItemState(item, { favorite: !isFavorite(item) });
}

async function toggleArchive(id) {
  const item = getItemById(id);
  if (!item) return;
  if (!isArchived(item) && !window.confirm(t("confirmArchive"))) return;
  await updateItemState(item, { archived: !isArchived(item) });
}

async function updateItemState(item, values) {
  if (state.agentUrl) {
    try {
      const response = await apiFetch(`/api/items/${encodeURIComponent(item.id)}/state`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error(`Agent returned ${response.status}`);
      const updated = await response.json();
      const index = state.items.findIndex((candidate) => candidate.id === item.id);
      if (index >= 0) state.items[index] = updated;
      const override = state.itemState[item.id];
      if (override) {
        if ("favorite" in values) delete override.favorite;
        if ("archived" in values) delete override.archived;
        if (!Object.keys(override).length) delete state.itemState[item.id];
        saveItemState();
      }
      clearFeedback();
      renderAfterItemStateChange(updated);
      return;
    } catch (error) {
      setFeedback("stateSaveFailed");
      console.error(error);
      return;
    }
  }

  const override = itemOverride(item.id);
  if ("favorite" in values) override.favorite = values.favorite;
  if ("archived" in values) override.archived = values.archived;
  saveItemState();
  clearFeedback();
  renderAfterItemStateChange(item);
}

async function permanentlyDeleteItem(id) {
  const item = getItemById(id);
  if (!item || !isArchived(item)) return;
  if (!state.agentUrl) {
    setFeedback("deleteNeedsAgent");
    return;
  }
  if (!window.confirm(t("confirmPermanentDelete"))) return;

  try {
    const response = await apiFetch(`/api/items/${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error(`Agent returned ${response.status}`);
    removeItemLocally(id);
  } catch (error) {
    setFeedback("deleteFailed");
    console.error(error);
  }
}

function removeItemLocally(id) {
  state.items = state.items.filter((item) => item.id !== id);
  state.manualAiContextIds.delete(id);
  delete state.itemState[id];
  saveItemState();
  if (state.currentReaderItemId === id) {
    closeReader();
  }
  renderLibraryNav();
  renderCollectionNav();
  renderTagNav();
  renderMultiFilterOptions();
  renderManagementLists();
  renderGrid();
  renderAiContext();
  maybeAutoBackup();
}

function openMetadataEditor(id) {
  const item = getItemById(id);
  if (!item) return;
  if (isArchived(item)) return;
  state.editingItemId = id;
  state.editingTags = new Set(getItemTags(item));
  elements.metadataTitle.value = getItemTitle(item);
  elements.metadataSummary.value = getItemSummary(item);
  renderMetadataCollectionOptions(getItemCollection(item));
  renderMetadataTagPicker();
  elements.metadataEditor.hidden = false;
  elements.metadataTitle.focus();
  elements.metadataTitle.select();
}

function closeMetadataEditor() {
  state.editingItemId = "";
  state.editingTags = new Set();
  elements.metadataEditor.hidden = true;
}

function renderMetadataCollectionOptions(selectedCollection) {
  const names = new Set(getCollectionOptions().map((collection) => collection.name));
  names.add(selectedCollection || "Inbox");
  elements.metadataCollection.replaceChildren();
  const addOption = document.createElement("option");
  addOption.value = "__add__";
  addOption.textContent = t("metadataAddCollection");
  elements.metadataCollection.append(addOption);
  [...names].filter(Boolean).sort((a, b) => a.localeCompare(b)).forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    elements.metadataCollection.append(option);
  });
  elements.metadataCollection.value = selectedCollection || "Inbox";
}

function renderMetadataTagPicker() {
  elements.metadataTagPicker.replaceChildren();
  const addButton = document.createElement("button");
  addButton.type = "button";
  addButton.className = "metadata-chip add-chip";
  addButton.textContent = `+ ${t("metadataAddTag")}`;
  addButton.addEventListener("click", addMetadataTag);
  elements.metadataTagPicker.append(addButton);
  const names = new Set(getTagOptions().map((tag) => tag.name));
  state.editingTags.forEach((tag) => names.add(tag));
  [...names].filter(Boolean).sort((a, b) => a.localeCompare(b)).forEach((name) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "metadata-chip";
    button.classList.toggle("active", state.editingTags.has(name));
    button.textContent = `#${name}`;
    button.addEventListener("click", () => {
      if (state.editingTags.has(name)) state.editingTags.delete(name);
      else state.editingTags.add(name);
      renderMetadataTagPicker();
    });
    elements.metadataTagPicker.append(button);
  });
}

function addMetadataCollection() {
  const name = window.prompt(t("addCollection"));
  const cleaned = String(name || "").trim();
  if (!cleaned) {
    elements.metadataCollection.value = getCurrentMetadataCollectionFallback();
    return;
  }
  renderMetadataCollectionOptions(cleaned);
  elements.metadataCollection.value = cleaned;
}

function addMetadataTag() {
  const name = window.prompt(t("addTag"));
  const cleaned = String(name || "").trim().replace(/^#/, "");
  if (!cleaned) return;
  state.editingTags.add(cleaned);
  renderMetadataTagPicker();
}

function getCurrentMetadataCollectionFallback() {
  const item = getItemById(state.editingItemId);
  return item ? getItemCollection(item) : "Inbox";
}

async function saveMetadataEditor(event) {
  event.preventDefault();
  const item = getItemById(state.editingItemId);
  if (!item) {
    closeMetadataEditor();
    return;
  }
  const metadata = {
    title: elements.metadataTitle.value.trim() || item.title || t("item"),
    summary: elements.metadataSummary.value.trim(),
    collection: elements.metadataCollection.value.trim() || "Inbox",
    tags: [...state.editingTags],
  };

  if (state.agentUrl) {
    try {
      const response = await apiFetch(`/api/items/${encodeURIComponent(item.id)}/metadata`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(metadata),
      });
      if (!response.ok) throw new Error(`Agent returned ${response.status}`);
      const updated = await response.json();
      const index = state.items.findIndex((candidate) => candidate.id === item.id);
      if (index >= 0) state.items[index] = updated;
      delete state.itemState[item.id]?.metadata;
      saveItemState();
    } catch (error) {
      setFeedback("metadataSaveFailed");
      console.error(error);
      return;
    }
  } else {
    itemOverride(item.id).metadata = metadata;
    saveItemState();
  }
  closeMetadataEditor();
  renderAfterItemStateChange(getItemById(item.id) || item);
  setFeedback("metadataSaved");
}

function renderAfterItemStateChange(item) {
  normalizeVisibleTagFilters();
  renderLibraryNav();
  renderCollectionNav();
  renderTagNav();
  renderMultiFilterOptions();
  renderManagementLists();
  renderGrid();
  if (!elements.reader.hidden && state.currentReaderItemId === item.id) {
    renderReaderMetadata(item);
    renderReaderActions(item);
  }
  renderAiContext();
  maybeAutoBackup();
}

function getInitialLanguage() {
  const saved = getStored("language");
  if (saved && i18n[saved]) return saved;
  return "en";
}

function setLanguage(language) {
  if (!i18n[language]) return;
  state.language = language;
  setStored("language", language);
  renderApp();
}

function getInitialThemeMode() {
  const saved = getStored("theme");
  if (saved === "system" || saved === "dark" || saved === "light") return saved;
  return "system";
}

function getInitialViewMode() {
  return "cards";
}

function getInitialSortMode() {
  const saved = getStored("sort-mode");
  return ["newest", "oldest", "title-az", "title-za"].includes(saved) ? saved : "newest";
}

function getInitialAiPanelWidth() {
  const saved = Number(getStored("ai-panel-width"));
  if (Number.isFinite(saved) && saved >= 320 && saved <= 720) return saved;
  return 420;
}

function getInitialSidebarWidth() {
  const saved = Number(getStored("sidebar-width"));
  if (Number.isFinite(saved) && saved >= 240 && saved <= 420) return saved;
  return 280;
}

function clampAiPanelWidth(width) {
  const viewportLimit = Math.max(320, window.innerWidth - 120);
  return Math.min(720, Math.max(320, Math.min(width, viewportLimit)));
}

function clampSidebarWidth(width) {
  const viewportLimit = Math.max(240, window.innerWidth - state.aiPanelWidth - 360);
  return Math.min(420, Math.max(240, Math.min(width, viewportLimit)));
}

function getInitialSidebarState() {
  return getStored("sidebar-collapsed") === "true";
}

function getInitialNavSectionState() {
  try {
    return JSON.parse(getStored("nav-section-collapsed") || "{}");
  } catch {
    return {};
  }
}

function toggleNavSection(section) {
  state.navSectionCollapsed[section] = !state.navSectionCollapsed[section];
  setStored("nav-section-collapsed", JSON.stringify(state.navSectionCollapsed));
  applyNavSectionState();
}

function applyNavSectionState() {
  elements.navSections.forEach((section) => {
    const key = section.dataset.navSection;
    section.classList.toggle("collapsed", Boolean(state.navSectionCollapsed[key]));
  });
  elements.navSectionToggles.forEach((button) => {
    const key = button.dataset.navSectionToggle;
    const sectionName = t(key);
    const label = t(state.navSectionCollapsed[key] ? "expandNavSection" : "collapseNavSection", { name: sectionName });
    button.setAttribute("aria-label", label);
    button.setAttribute("title", label);
  });
}

function toggleSidebar() {
  state.sidebarCollapsed = !state.sidebarCollapsed;
  setStored("sidebar-collapsed", String(state.sidebarCollapsed));
  applySidebarState();
}

function applySidebarState() {
  elements.body.classList.toggle("sidebar-collapsed", state.sidebarCollapsed);
  const label = t(state.sidebarCollapsed ? "expandSidebar" : "collapseSidebar");
  elements.sidebarCollapse.setAttribute("aria-label", label);
  elements.sidebarCollapse.setAttribute("title", label);
  requestAnimationFrame(updateMobileReaderTop);
}

function applySidebarWidth() {
  if (!state.sidebarCollapsed) {
    state.sidebarWidth = clampSidebarWidth(state.sidebarWidth);
  }
  elements.body.style.setProperty("--sidebar-width", `${state.sidebarWidth}px`);
}

function startSidebarResize(event) {
  if (state.sidebarCollapsed) return;
  event.preventDefault();
  elements.body.classList.add("sidebar-resizing");
  const startX = event.clientX;
  const startWidth = state.sidebarWidth;
  const onMove = (moveEvent) => {
    state.sidebarWidth = clampSidebarWidth(startWidth + moveEvent.clientX - startX);
    applySidebarWidth();
  };
  const onUp = () => {
    elements.body.classList.remove("sidebar-resizing");
    setStored("sidebar-width", String(state.sidebarWidth));
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
  };
  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp);
}

function getInitialFavoriteFilter() {
  return getStored("only-favorites") === "true";
}

function setViewMode(mode) {
  if (mode !== "cards" && mode !== "list") return;
  state.viewMode = mode;
  setStored("view-mode", mode);
  applyViewMode();
  renderGrid();
}

function openAiPanel() {
  state.aiPanelOpen = true;
  applyAiPanelState();
  renderAiContext();
  renderInitialAiMessage();
  elements.aiChatInput.focus();
}

function closeAiPanel() {
  state.aiPanelOpen = false;
  applyAiPanelState();
}

function toggleAiPanel() {
  if (state.aiPanelOpen) {
    closeAiPanel();
  } else {
    openAiPanel();
  }
}

function applyAiPanelState() {
  state.aiPanelWidth = clampAiPanelWidth(state.aiPanelWidth);
  elements.aiPanel.hidden = false;
  elements.aiPanel.setAttribute("aria-hidden", String(!state.aiPanelOpen));
  elements.aiPanel.style.width = `${state.aiPanelWidth}px`;
  elements.body.style.setProperty("--ai-panel-width", `${state.aiPanelWidth}px`);
  elements.body.classList.toggle("ai-panel-open", state.aiPanelOpen);
  elements.aiPanelOpen.classList.toggle("active", state.aiPanelOpen);
  elements.readerAiPanelOpen.classList.toggle("active", state.aiPanelOpen);
  applySidebarWidth();
}

function renderAiContext() {
  if (!elements.aiContextLabel) return;
  elements.aiContextLabel.textContent = getAiContextLabel();
}

function getAiContextLabel() {
  const manualItems = [...state.manualAiContextIds].map(getItemById).filter(Boolean);
  if (manualItems.length > 0) {
    return t("aiContextManualItems", { titles: manualItems.map((item) => getItemTitle(item)).join(", ") });
  }

  const parts = [];
  let primaryCollection = "";
  let primaryTag = "";
  if (!elements.reader.hidden && state.currentReaderItemId) {
    const item = getItemById(state.currentReaderItemId);
    parts.push(t("aiContextReader", { title: item ? getItemTitle(item) : t("item") }));
  } else if (state.query.trim()) {
    parts.push(t("aiContextSearch", { query: state.query.trim() }));
  } else if (state.filter.type === "library") {
    const filter = libraryFilterDefinitions.find((item) => item.value === state.filter.value);
    parts.push(state.filter.value === "all" ? t("aiContextGlobal") : t("aiContextLibrary", { name: filter ? t(filter.labelKey) : state.filter.value }));
  } else if (state.filter.type === "collection") {
    primaryCollection = state.filter.value;
    parts.push(t("aiContextCollection", { name: state.filter.value }));
  } else if (state.filter.type === "tag") {
    primaryTag = state.filter.value;
    parts.push(t("aiContextTag", { name: state.filter.value }));
  } else {
    parts.push(t("aiContextGlobal"));
  }

  const extraTags = [...state.selectedTags].filter((name) => name !== primaryTag);
  if (extraTags.length > 0) {
    const mode = t(state.tagMatchMode === "all" ? "tagMatchModeAllLabel" : "tagMatchModeAnyLabel");
    parts.push(t("aiContextTags", { mode, names: extraTags.map((tag) => `#${tag}`).join(", ") }));
  }

  if (state.onlyFavorites) {
    parts.push(t("aiContextFavoritesOnly"));
  }
  return parts.join(" · ");
}

function renderInitialAiMessage() {
  if (elements.aiChatLog.children.length > 0) return;
  appendAiMessage("assistant", t("aiWelcome"));
}

function appendAiMessage(role, text, sources = [], options = {}) {
  const message = document.createElement("article");
  message.className = `ai-message ${role}${options.pending ? " pending" : ""}`;
  message.innerHTML = aiMessageMarkup(role, text, sources);
  elements.aiChatLog.append(message);
  scrollAiChatToBottom();
  return message;
}

function updateAiMessage(message, role, text, sources = []) {
  message.className = `ai-message ${role}`;
  message.innerHTML = aiMessageMarkup(role, text, sources);
  scrollAiChatToBottom();
}

function aiMessageMarkup(role, text, sources = []) {
  const sourceMarkup = role === "assistant" && sources.length > 0
    ? `<div class="ai-message-sources"><span>${escapeHtml(t("aiSources"))}</span>${sources.slice(0, 4).map((source) => `<em>${escapeHtml(source.title || source.item_id || "")}</em>`).join("")}</div>`
    : "";
  return `
    <strong>${escapeHtml(role === "user" ? t("aiUserPlaceholder") : t("globalAiAssistant"))}</strong>
    <p>${escapeHtml(text)}</p>
    ${sourceMarkup}
  `;
}

function scrollAiChatToBottom() {
  elements.aiChatLog.scrollTop = elements.aiChatLog.scrollHeight;
}

async function submitAiMessage(event) {
  event.preventDefault();
  const text = elements.aiChatInput.value.trim();
  if (!text) return;
  appendAiMessage("user", text);
  elements.aiChatInput.value = "";
  const pendingMessage = appendAiMessage("assistant", t("aiReplying"), [], { pending: true });
  try {
    const conversationId = await ensureAiConversation();
    const response = await apiFetch(`/api/ai/conversations/${encodeURIComponent(conversationId)}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: text }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.detail || `Agent returned ${response.status}`);
    updateAiMessage(pendingMessage, "assistant", data.message?.content || t("aiAssistantPlaceholder"), data.sources || []);
    await loadAiRuns();
  } catch (error) {
    updateAiMessage(pendingMessage, "assistant", error?.message || t("aiMessageFailed"));
    await loadAiRuns();
    console.error(error);
  }
}

function handleAiChatInputKeydown(event) {
  if (event.key !== "Enter" || event.shiftKey || !state.aiPanelOpen) return;
  event.preventDefault();
  elements.aiChatForm.requestSubmit();
}

async function ensureAiConversation() {
  const payload = buildAiContextPayload();
  const contextKey = JSON.stringify({ source_mode: payload.source_mode, context: payload.context });
  if (state.aiConversationId && state.aiConversationContextKey === contextKey) {
    return state.aiConversationId;
  }
  const response = await apiFetch("/api/ai/conversations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.detail || `Agent returned ${response.status}`);
  state.aiConversationId = data.conversation?.id || "";
  state.aiConversationContextKey = contextKey;
  if (!state.aiConversationId) throw new Error(t("aiMessageFailed"));
  return state.aiConversationId;
}

function buildAiContextPayload() {
  const manualItemIds = [...state.manualAiContextIds];
  const context = {
    include_archived: false,
    favorite: state.onlyFavorites ? true : null,
    tags: [...state.selectedTags],
    tag_match: state.tagMatchMode,
    q: state.query.trim(),
    sort: state.sortMode,
  };
  if (manualItemIds.length > 0) {
    context.manual_item_ids = manualItemIds;
  } else if (!elements.reader.hidden && state.currentReaderItemId) {
    context.item_id = state.currentReaderItemId;
  } else if (state.filter.type === "library") {
    context.scope = state.filter.value === "all" ? "global" : "library";
    context.library = state.filter.value;
  } else if (state.filter.type === "collection") {
    context.scope = "collection";
    context.collection = state.filter.value;
  } else if (state.filter.type === "tag") {
    context.scope = "tag";
    context.tags = [...new Set([state.filter.value, ...context.tags])];
  } else {
    context.scope = "global";
    context.library = "all";
  }
  return {
    source_mode: state.aiContentExpansion ? "local_plus_external" : "local_only",
    context,
  };
}

function setAiContentExpansion(enabled) {
  state.aiContentExpansion = Boolean(enabled);
  state.aiConversationId = "";
  state.aiConversationContextKey = "";
}

function openGenerateNoteDialog() {
  elements.generateTheme.value = "default";
  elements.generateTargetUse.value = "default";
  elements.generateStylePreference.value = "default";
  renderGenerateReferenceOptions();
  syncGenerateTargetUseHint();
  elements.generateNoteFeedback.textContent = state.agentUrl ? "" : t("generateNoteNeedsAgent");
  elements.generateNoteDialog.hidden = false;
  elements.generateTheme.focus();
}

function syncGenerateTargetUseHint() {
  if (!elements.generateShareHint) return;
  elements.generateShareHint.hidden = elements.generateTargetUse.value !== "share";
}

function renderGenerateReferenceOptions() {
  if (!elements.generateReferenceNote) return;
  elements.generateReferenceNote.replaceChildren();
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = t("generateReferenceDefault");
  elements.generateReferenceNote.append(defaultOption);
  state.items
    .filter((item) => item?.id && !isArchived(item))
    .slice()
    .sort((a, b) => getItemTitle(a).localeCompare(getItemTitle(b)))
    .forEach((item) => {
      const option = document.createElement("option");
      option.value = item.id;
      option.textContent = getItemTitle(item);
      elements.generateReferenceNote.append(option);
    });
  elements.generateReferenceNote.value = "";
}

function closeGenerateNoteDialog() {
  elements.generateNoteDialog.hidden = true;
  elements.generateNoteFeedback.textContent = "";
  elements.generateNoteSubmit.disabled = false;
}

async function submitGenerateNoteDialog(event) {
  event.preventDefault();
  if (!state.agentUrl) {
    elements.generateNoteFeedback.textContent = t("generateNoteNeedsAgent");
    return;
  }
  elements.generateNoteSubmit.disabled = true;
  elements.generateNoteFeedback.textContent = t("generateNoteRunning");
  try {
    const conversationId = await ensureAiConversation();
    const response = await apiFetch(`/api/ai/conversations/${encodeURIComponent(conversationId)}/generate-note`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        theme: elements.generateTheme.value,
        target_use: elements.generateTargetUse.value,
        style_preference: elements.generateStylePreference.value,
        reference_style: elements.generateReferenceNote.value ? "note" : "default",
        reference_note_id: elements.generateReferenceNote.value,
      }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.detail || `Agent returned ${response.status}`);
    await refreshManifestAndWorkspace();
    await loadAiRuns();
    const title = data.item?.title || data.item?.id || t("item");
    elements.generateNoteFeedback.textContent = t("generateNoteCreated", { title });
    appendAiMessage("assistant", t("generateNoteCreated", { title }), data.item ? [{ title, item_id: data.item.id }] : []);
  } catch (error) {
    await loadAiRuns();
    elements.generateNoteFeedback.textContent = error?.message || t("generateNoteFailed");
    console.error(error);
  } finally {
    elements.generateNoteSubmit.disabled = false;
  }
}

function toggleMultiFilterPopover() {
  state.multiFilterOpen = !state.multiFilterOpen;
  applyMultiFilterState();
}

function closeMultiFilterPopover() {
  state.multiFilterOpen = false;
  applyMultiFilterState();
}

function toggleSortPopover() {
  state.sortOpen = !state.sortOpen;
  applySortState();
}

function closeSortPopover() {
  state.sortOpen = false;
  applySortState();
}

function uploadAvatar(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    state.profile.avatarType = "image";
    state.profile.avatarImage = String(reader.result || "");
    saveProfile();
    renderProfile();
  });
  reader.readAsDataURL(file);
}

function applyMultiFilterState() {
  elements.multiFilterPopover.hidden = !state.multiFilterOpen;
  elements.multiFilterToggle.classList.toggle("open", state.multiFilterOpen);
  elements.multiFilterToggle.classList.toggle("active", hasMultiFilters());
  elements.tagMatchButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.tagMatchMode === state.tagMatchMode);
  });
}

function applySortState() {
  elements.sortPopover.hidden = !state.sortOpen;
  elements.sortToggle.classList.toggle("active", state.sortOpen || state.sortMode !== "newest");
  elements.sortButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.sortMode === state.sortMode);
  });
}

function setSortMode(mode) {
  if (!["newest", "oldest", "title-az", "title-za"].includes(mode)) return;
  state.sortMode = mode;
  state.sortOpen = false;
  setStored("sort-mode", mode);
  applySortState();
  renderGrid();
}

function hasMultiFilters() {
  return state.selectedTags.size > 0;
}

function setTagMatchMode(mode) {
  if (mode !== "any" && mode !== "all") return;
  state.tagMatchMode = mode;
  applyMultiFilterState();
  renderMultiFilterOptions();
  renderGrid();
  renderAiContext();
}

function renderMultiFilterOptions() {
  const baseItems = baseItemsForTagFilters();
  const resultItems = applySelectedTagFilters(baseItems);
  if (elements.multiFilterResultCount) {
    elements.multiFilterResultCount.textContent = t("tagFilterSelectedCount", { count: resultItems.length });
  }
  elements.multiTagOptions.replaceChildren(...getTagOptions()
    .filter((tag) => isManagedItemVisible("tags", tag.name))
    .map((tag) => ({
      ...tag,
      baseCount: countTagItemsInScope(tag.name, baseItems),
      count: countMultiFilterTagItems(tag.name, baseItems, resultItems),
    }))
    .filter((tag) => tag.baseCount > 0)
    .map((tag) => multiFilterOption(tag.name, tag.count)));
  applyMultiFilterState();
}

function countMultiFilterTagItems(name, baseItems, resultItems) {
  const scope = state.tagMatchMode === "all" && state.selectedTags.size > 0 ? resultItems : baseItems;
  return countTagItemsInScope(name, scope);
}

function countTagItemsInScope(name, items) {
  return items.filter((item) => getItemTags(item).includes(name)).length;
}

function multiFilterOption(name, count) {
  const selected = state.selectedTags.has(name);
  const label = document.createElement("label");
  label.className = "multi-filter-option";
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = selected;
  checkbox.addEventListener("change", () => {
    toggleMultiFilterValue(name);
  });
  const text = document.createElement("span");
  text.textContent = `#${name}`;
  const badge = document.createElement("span");
  badge.className = "multi-filter-count";
  badge.textContent = count;
  label.append(checkbox, text, badge);
  return label;
}

function toggleMultiFilterValue(name) {
  if (state.selectedTags.has(name)) {
    state.selectedTags.delete(name);
  } else {
    state.selectedTags.add(name);
  }
  renderCollectionNav();
  renderTagNav();
  renderMultiFilterOptions();
  renderGrid();
  renderAiContext();
}

function clearMultiFilters(shouldRender = true) {
  state.selectedTags.clear();
  if (!shouldRender) return;
  renderCollectionNav();
  renderTagNav();
  renderMultiFilterOptions();
  renderGrid();
  renderAiContext();
}

function startAiPanelResize(event) {
  event.preventDefault();
  elements.body.classList.add("ai-panel-resizing");
  const panelBox = elements.aiPanel.getBoundingClientRect();
  const pointerOffset = event.clientX - panelBox.left;
  const startWidth = panelBox.width;
  const onMove = (moveEvent) => {
    state.aiPanelWidth = clampAiPanelWidth(startWidth + panelBox.left - moveEvent.clientX + pointerOffset);
    applyAiPanelState();
  };
  const onUp = () => {
    elements.body.classList.remove("ai-panel-resizing");
    setStored("ai-panel-width", String(state.aiPanelWidth));
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
  };
  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp);
}

function toggleFavoriteFilter() {
  state.onlyFavorites = !state.onlyFavorites;
  setStored("only-favorites", String(state.onlyFavorites));
  applyFavoriteFilter();
  renderGrid();
  renderAiContext();
}

function applyFavoriteFilter() {
  elements.favoriteFilter.classList.toggle("active", state.onlyFavorites);
  const label = t(state.onlyFavorites ? "showAllFavorites" : "onlyFavorites");
  elements.favoriteFilter.setAttribute("aria-label", label);
  elements.favoriteFilter.setAttribute("title", label);
}

function applyViewMode() {
  state.viewMode = "cards";
  elements.contentGrid.classList.remove("list-view");
}

function setThemeMode(mode) {
  if (!["system", "light", "dark"].includes(mode)) return;
  state.themeMode = mode;
  setStored("theme", mode);
  applyTheme();
}

function applyTheme() {
  const resolvedTheme = getResolvedTheme();
  document.documentElement.dataset.theme = resolvedTheme;
  document.documentElement.dataset.themeMode = state.themeMode;
  elements.themeModeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.themeMode === state.themeMode);
  });
  updateThemeMetaColor(resolvedTheme);
}

function getResolvedTheme() {
  return state.themeMode === "system" ? getSystemTheme() : state.themeMode;
}

function getSystemTheme() {
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function updateThemeMetaColor(resolvedTheme) {
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", resolvedTheme === "dark" ? "#111827" : "#0f766e");
}

function loadAiConfig() {
  try {
    return JSON.parse(getStored("ai-config") || "{}");
  } catch {
    return {};
  }
}

function loadDataConfig() {
  try {
    return JSON.parse(getStored("data-config") || "{}");
  } catch {
    return {};
  }
}

function loadProfile() {
  try {
    return {
      avatarType: "brand",
      avatarImage: "",
      ...JSON.parse(getStored("profile") || "{}"),
    };
  } catch {
    return { avatarType: "brand", avatarImage: "" };
  }
}

function saveProfile() {
  setStored("profile", JSON.stringify(state.profile));
}

function renderProfile() {
  const username = state.currentUser.username || "Guest";
  const dataId = state.currentUser.dataId || "static";
  renderAvatar(elements.settingsProfileAvatar, true);
  if (elements.settingsProfileName) elements.settingsProfileName.textContent = username;
  if (elements.settingsProfileId) elements.settingsProfileId.textContent = `ID: ${dataId}`;
}

function renderAvatar(target, large) {
  if (!target) return;
  if (state.profile.avatarType === "image" && state.profile.avatarImage) {
    target.innerHTML = `<img src="${escapeHtml(state.profile.avatarImage)}" alt="">`;
    return;
  }
  target.innerHTML = `<img src="assets/html-lore-logo.svg" alt="">`;
}

function loadItemState() {
  try {
    return JSON.parse(getStored("item-state") || "{}");
  } catch {
    return {};
  }
}

function saveItemState() {
  setStored("item-state", JSON.stringify(state.itemState));
}

function loadNavConfig() {
  try {
    return JSON.parse(getStored("nav-config") || '{"library":{},"collections":{},"tags":{}}');
  } catch {
    return { library: {}, collections: {}, tags: {} };
  }
}

async function loadRemoteNavConfig() {
  if (!state.agentUrl) return;
  try {
    const response = await apiFetch("/api/navigation", { cache: "no-store" });
    if (!response.ok) throw new Error(`Agent returned ${response.status}`);
    state.navConfig = normalizeNavConfig(await response.json());
    saveNavConfig();
  } catch (error) {
    console.error(error);
  }
}

function saveNavConfig() {
  setStored("nav-config", JSON.stringify(state.navConfig));
}

async function persistNavConfig() {
  saveNavConfig();
  if (!state.agentUrl) return;
  try {
    const response = await apiFetch("/api/navigation", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(normalizeNavConfig(state.navConfig)),
    });
    if (!response.ok) throw new Error(`Agent returned ${response.status}`);
    state.navConfig = normalizeNavConfig(await response.json());
    saveNavConfig();
  } catch (error) {
    setFeedback("navigationSaveFailed");
    console.error(error);
  }
}

function normalizeNavConfig(config) {
  return {
    library: config?.library || {},
    collections: config?.collections || {},
    tags: config?.tags || {},
  };
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
  renderManagementList("collections", getCollectionOptions(), elements.collectionManagement);
  renderManagementList("tags", getTagOptions(), elements.tagManagement);
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
  const rows = items.map((item) => {
    const count = type === "collections" ? countCollectionItems(item.name) : type === "tags" ? countTagItems(item.name) : item.count;
    return renderManagementRow(type, item.name, count);
  });
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
  row.querySelector("[data-management-visible]").addEventListener("change", async (event) => {
    getManagedItemConfig(type, name).visible = event.target.checked;
    await persistNavConfig();
    renderLibraryNav();
    renderCollectionNav();
    renderTagNav();
  });
  return row;
}

function renderAiConfig() {
  const config = state.aiConfig || {};
  elements.aiProvider.value = config.provider || "openai-compatible";
  elements.currentModel.value = config.currentModel || config.model || "";
  elements.apiBaseUrl.value = config.apiBaseUrl || config.base_url || "";
  elements.newModel.value = config.newModel || "";
  elements.modelTemperature.value = config.temperature || "0.7";
  elements.modelMaxTokens.value = config.maxTokens || "4096";
  elements.apiKey.value = "";
}

function maybeRefreshAiRuns() {
  if (state.activeSettingsTab !== "ai") return;
  loadAiRuns();
}

async function loadAiRuns() {
  if (!elements.aiRunList) return;
  if (elements.aiRunRefresh) elements.aiRunRefresh.disabled = true;
  if (!state.agentUrl) {
    state.aiRuns = [];
    renderAiRuns();
    elements.aiRunFeedback.textContent = t("aiRunHistoryUnavailable");
    if (elements.aiRunRefresh) elements.aiRunRefresh.disabled = false;
    return;
  }
  try {
    const response = await apiFetch("/api/ai/runs?limit=20", { cache: "no-store" });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.detail || `Agent returned ${response.status}`);
    state.aiRuns = Array.isArray(data.runs) ? data.runs : [];
    renderAiRuns();
    elements.aiRunFeedback.textContent = "";
  } catch (error) {
    state.aiRuns = [];
    renderAiRuns();
    elements.aiRunFeedback.textContent = t("aiRunHistoryFailed");
    console.error(error);
  } finally {
    if (elements.aiRunRefresh) elements.aiRunRefresh.disabled = false;
  }
}

function renderAiRuns() {
  if (!elements.aiRunList) return;
  if (state.aiRuns.length === 0) {
    elements.aiRunList.innerHTML = `<div class="empty-state">${escapeHtml(t("aiRunHistoryEmpty"))}</div>`;
    return;
  }
  elements.aiRunList.replaceChildren(...state.aiRuns.map(renderAiRunRow));
}

function renderAiRunRow(run) {
  const row = document.createElement("div");
  row.className = "management-row ai-run-row";
  const runId = String(run.id || "");
  const selected = runId && state.selectedAiRunId === runId;
  const details = selected ? state.aiRunDetails[runId] : null;
  const kindLabel = getAiRunKindLabel(run);
  const statusLabel = getAiRunStatusLabel(run.status);
  const statusClass = `status-${String(run.status || "pending").toLowerCase().replace(/[^a-z0-9-]/g, "") || "pending"}`;
  const nodeCount = Array.isArray(run.node_trace) ? run.node_trace.length : 0;
  const itemMeta = run.item_id ? `<span>${escapeHtml(t("aiRunItem", { id: run.item_id }))}</span>` : "";
  const duration = formatDuration(run.duration_ms);
  const durationMeta = duration ? `<span>${escapeHtml(t("aiRunDuration", { duration }))}</span>` : "";
  const completedMeta = run.completed_at ? `<span>${escapeHtml(t("aiRunCompletedAt", { date: formatDateTime(run.completed_at) }))}</span>` : "";
  const errorMessage = run.error?.message ? `<span class="ai-run-error">${escapeHtml(t("aiRunError", { message: run.error.message }))}</span>` : "";
  const capabilityMeta = [
    run.retryable ? `<span class="ai-run-capability">${escapeHtml(t("aiRunRetryable"))}</span>` : "",
    run.cancellable ? "" : `<span class="ai-run-capability muted">${escapeHtml(t("aiRunNotCancellable"))}</span>`,
  ].join("");
  row.innerHTML = `
    <div class="management-name">
      <strong>${escapeHtml(kindLabel)}</strong>
      <span class="ai-run-meta">
        <em class="ai-run-status ${statusClass}">${escapeHtml(statusLabel)}</em>
        ${itemMeta}
        ${durationMeta}
        ${completedMeta}
        <span>${escapeHtml(t("aiRunNodeCount", { count: nodeCount }))}</span>
        ${errorMessage}
        ${capabilityMeta}
      </span>
    </div>
    <div class="ai-run-actions-inline">
      <button type="button" class="secondary-button" data-ai-run-details="${escapeHtml(runId)}">${escapeHtml(t(selected ? "aiRunHideDetails" : "aiRunDetails"))}</button>
      <code>${escapeHtml(runId.slice(0, 12))}</code>
    </div>
    ${selected ? renderAiRunDetails(details) : ""}
  `;
  row.querySelector("[data-ai-run-details]")?.addEventListener("click", () => toggleAiRunDetails(runId));
  return row;
}

function renderAiRunDetails(run) {
  if (!run) {
    return `<div class="ai-run-detail-panel">${escapeHtml(t("aiRunDetailsLoading"))}</div>`;
  }
  if (run.error_loading) {
    return `<div class="ai-run-detail-panel ai-run-error">${escapeHtml(t("aiRunDetailsFailed"))}</div>`;
  }
  const specItems = renderKeyValueList(run.spec || {});
  const usageItems = renderAiRunUsage(run.usage || {});
  const nodeItems = Array.isArray(run.node_trace) && run.node_trace.length > 0
    ? `<ol>${run.node_trace.map((node) => `<li>${escapeHtml(node.node || node.name || t("aiRunNodes"))} <em>${escapeHtml(node.status || "")}</em></li>`).join("")}</ol>`
    : `<p>${escapeHtml(t("aiRunNodeCount", { count: 0 }))}</p>`;
  const errorMessage = run.error?.message ? `<p class="ai-run-error">${escapeHtml(t("aiRunError", { message: run.error.message }))}</p>` : "";
  return `
    <div class="ai-run-detail-panel">
      <section>
        <h4>${escapeHtml(t("aiRunSpec"))}</h4>
        ${specItems || `<p>${escapeHtml(t("aiRunNoDetailData"))}</p>`}
      </section>
      <section>
        <h4>${escapeHtml(t("aiRunUsage"))}</h4>
        ${usageItems || `<p>${escapeHtml(t("aiRunNoDetailData"))}</p>`}
      </section>
      <section>
        <h4>${escapeHtml(t("aiRunNodes"))}</h4>
        ${nodeItems}
      </section>
      ${errorMessage}
    </div>
  `;
}

function renderKeyValueList(values) {
  const entries = Object.entries(values || {}).filter(([, value]) => value !== "" && value !== null && value !== undefined);
  if (entries.length === 0) return "";
  return `<dl>${entries.map(([key, value]) => `<div><dt>${escapeHtml(key)}</dt><dd>${escapeHtml(formatAiRunValue(value))}</dd></div>`).join("")}</dl>`;
}

function renderAiRunUsage(usage) {
  const rows = [];
  if (usage.input_tokens) rows.push(t("aiRunInputTokens", { count: usage.input_tokens }));
  if (usage.output_tokens) rows.push(t("aiRunOutputTokens", { count: usage.output_tokens }));
  if (usage.total_tokens) rows.push(t("aiRunTotalTokens", { count: usage.total_tokens }));
  return rows.length > 0 ? `<ul>${rows.map((row) => `<li>${escapeHtml(row)}</li>`).join("")}</ul>` : "";
}

function formatAiRunValue(value) {
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object" && value !== null) return JSON.stringify(value);
  return String(value);
}

async function toggleAiRunDetails(runId) {
  if (!runId) return;
  if (state.selectedAiRunId === runId) {
    state.selectedAiRunId = "";
    renderAiRuns();
    return;
  }
  state.selectedAiRunId = runId;
  renderAiRuns();
  if (!state.aiRunDetails[runId]) {
    await loadAiRunDetails(runId);
  }
}

async function loadAiRunDetails(runId) {
  if (!state.agentUrl) return;
  try {
    const response = await apiFetch(`/api/ai/runs/${encodeURIComponent(runId)}`, { cache: "no-store" });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.detail || `Agent returned ${response.status}`);
    state.aiRunDetails[runId] = data.run || {};
  } catch (error) {
    state.aiRunDetails[runId] = { error_loading: true };
    console.error(error);
  }
  renderAiRuns();
}

function getAiRunKindLabel(run) {
  const kind = String(run?.kind || "");
  if (kind === "html_generation") return t("aiRunHtmlGeneration");
  if (kind === "material_html_generation") return t("aiRunMaterialGeneration");
  if (kind === "knowledge_qa") return t("aiRunKnowledgeQa");
  return t("aiRunUnknownKind");
}

function getAiRunStatusLabel(status) {
  const key = {
    completed: "aiRunStatusCompleted",
    failed: "aiRunStatusFailed",
    running: "aiRunStatusRunning",
    pending: "aiRunStatusPending",
  }[String(status || "").toLowerCase()];
  return key ? t(key) : String(status || t("aiRunStatusPending"));
}

function syncAiConfigFromServer(provider) {
  if (!provider) return;
  state.aiConfig = {
    ...state.aiConfig,
    provider: provider.provider || state.aiConfig?.provider || "openai-compatible",
    currentModel: provider.model || state.aiConfig?.currentModel || "gpt-5.5",
    apiBaseUrl: provider.base_url || state.aiConfig?.apiBaseUrl || "",
  };
  setStored("ai-config", JSON.stringify(state.aiConfig));
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
  setStored("ai-config", JSON.stringify(config));

  if (apiKey) {
    elements.settingsFeedback.textContent = t("settingsNeedsAgent");
    elements.apiKey.value = "";
    return;
  }

  try {
    const response = await apiFetch("/api/ai/providers", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        provider: config.provider,
        base_url: config.apiBaseUrl,
        model: config.currentModel || "gpt-5.5",
        enabled: true,
      }),
    });
    if (!response.ok) throw new Error(`Agent returned ${response.status}`);
    const data = await response.json();
    syncAiConfigFromServer(data.provider);
    await refreshAiStatus();
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
  setStored("data-config", JSON.stringify(state.dataConfig));
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
  downloadJson(`html-lore-backup-${dateStamp()}.json`, buildBackupPayload());
  state.dataConfig.lastBackupAt = new Date().toISOString();
  saveDataConfig();
  elements.backupFeedback.textContent = t("backupCreated");
}

function buildBackupPayload() {
  return {
    type: "html-lore-backup",
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
    theme: state.themeMode,
    viewMode: state.viewMode,
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
      const validTypes = new Set(["html-lore-backup", "html-vault-backup"]);
      if (!validTypes.has(backup.type) || !backup.preferences) {
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
    setStored("language", state.language);
  }
  if (preferences.theme === "system" || preferences.theme === "dark" || preferences.theme === "light") {
    state.themeMode = preferences.theme;
    setStored("theme", state.themeMode);
  }
  state.viewMode = "cards";
  setStored("view-mode", state.viewMode);
  state.onlyFavorites = Boolean(preferences.onlyFavorites);
  setStored("only-favorites", String(state.onlyFavorites));
  state.aiConfig = preferences.aiConfig || {};
  state.dataConfig = preferences.dataConfig || {};
  state.navConfig = preferences.navConfig || { library: {}, collections: {}, tags: {} };
  state.itemState = preferences.itemState || {};
  setStored("ai-config", JSON.stringify(state.aiConfig));
  setStored("data-config", JSON.stringify(state.dataConfig));
  setStored("nav-config", JSON.stringify(state.navConfig));
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
  downloadJson(`html-lore-manifest-${dateStamp()}.json`, state.manifest || {});
  elements.exportFeedback.textContent = t("exportCreated");
}

function exportPreferencesData() {
  downloadJson(`html-lore-preferences-${dateStamp()}.json`, getPreferencePayload());
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

async function testProviderConfig() {
  try {
    const response = await apiFetch("/api/ai/test-provider", { method: "POST" });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.ok) throw new Error(data.message || data.detail || `Agent returned ${response.status}`);
    elements.settingsFeedback.textContent = t("settingsSavedAgent");
    await refreshAiStatus();
  } catch (error) {
    elements.settingsFeedback.textContent = t("settingsAgentFailed");
    console.error(error);
  }
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

function contextToggleIcon(active) {
  return `
    <svg class="button-icon" viewBox="0 0 24 24" aria-hidden="true">
      ${active ? "" : '<path d="M12 5v14"></path>'}
      <path d="M5 12h14"></path>
    </svg>
  `;
}

function aiSparkIcon() {
  return `
    <svg class="button-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3l1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7L12 3Z"></path>
      <path d="M19 14l.9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14Z"></path>
      <path d="M5 13l.8 1.8L8 16l-2.2.8L5 19l-.8-2.2L2 16l2.2-1.2L5 13Z"></path>
    </svg>
  `;
}

function trashIcon() {
  return `
    <svg class="button-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 6h18"></path>
      <path d="M8 6V4h8v2"></path>
      <path d="M6 6l1 15h10l1-15"></path>
      <path d="M10 11v6"></path>
      <path d="M14 11v6"></path>
    </svg>
  `;
}

function editIcon() {
  return `
    <svg class="button-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 20h9"></path>
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"></path>
    </svg>
  `;
}

function shareIcon() {
  return `
    <svg class="button-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7"></path>
      <path d="m16 6-4-4-4 4"></path>
      <path d="M12 2v14"></path>
    </svg>
  `;
}

function moonIcon() {
  return `
    <svg class="button-icon moon-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14.3 3.1A8.9 8.9 0 1 0 21 14.8a7.4 7.4 0 0 1-4.2 1.3 7.6 7.6 0 0 1-7.6-7.6 7.4 7.4 0 0 1 5.1-5.4Z"></path>
      <path d="m18.3 3.2.5 1.4 1.4.5-1.4.5-.5 1.4-.5-1.4-1.4-.5 1.4-.5.5-1.4Z"></path>
      <circle cx="20" cy="8.5" r="1"></circle>
    </svg>
  `;
}

function sunIcon() {
  return `
    <svg class="button-icon" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2"></path>
      <path d="M12 20v2"></path>
      <path d="m4.93 4.93 1.41 1.41"></path>
      <path d="m17.66 17.66 1.41 1.41"></path>
      <path d="M2 12h2"></path>
      <path d="M20 12h2"></path>
      <path d="m6.34 17.66-1.41 1.41"></path>
      <path d="m19.07 4.93-1.41 1.41"></path>
    </svg>
  `;
}

function normalizeVersion(value) {
  const match = String(value || "").trim().match(/^v?(\d+(?:\.\d+){0,2})/i);
  return match ? match[1] : "";
}

function compareVersions(left, right) {
  const a = normalizeVersion(left).split(".").map((part) => Number(part || 0));
  const b = normalizeVersion(right).split(".").map((part) => Number(part || 0));
  const length = Math.max(a.length, b.length, 3);
  for (let index = 0; index < length; index += 1) {
    const diff = (a[index] || 0) - (b[index] || 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

function isVersionNewer(candidate, current) {
  if (!candidate || !current) return false;
  return compareVersions(candidate, current) > 0;
}

function setIconButtonLabel(button, key) {
  const label = t(key);
  button.setAttribute("aria-label", label);
  button.setAttribute("title", label);
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => {
    const swPath = hasRuntimeConfig("STATIC_DEMO") ? "sw.js?v=0.8.4-demo" : "sw.js";
    navigator.serviceWorker.register(swPath).catch((error) => {
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
  applyNavSectionState();
  applyFavoriteFilter();
  applyMultiFilterState();
  applySortState();
  updateThemeMetaColor(getResolvedTheme());
  renderVersionStatus();
}

function setFeedback(key, params = {}) {
  window.clearTimeout(state.feedbackTimer);
  state.feedbackKey = key;
  state.feedbackParams = params;
  renderFeedback();
  if (isTransientFeedback(key)) {
    state.feedbackTimer = window.setTimeout(clearFeedback, 4200);
  }
}

function clearFeedback() {
  window.clearTimeout(state.feedbackTimer);
  state.feedbackTimer = 0;
  state.feedbackKey = "connectAgent";
  state.feedbackParams = {};
  renderFeedback();
}

function isTransientFeedback(key) {
  return new Set([
    "emptyInput",
    "agentNotConfigured",
    "agentUnavailable",
    "importHtmlDone",
    "importHtmlFailed",
    "stateSaveFailed",
    "deleteNeedsAgent",
    "deleteFailed",
    "metadataSaved",
    "metadataSaveFailed",
    "navigationSaveFailed",
  ]).has(key);
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

function formatDateTime(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  const formatter = new Intl.DateTimeFormat(state.language || "en", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
  return formatter.format(date);
}

function formatDuration(value) {
  const milliseconds = Number(value || 0);
  if (!Number.isFinite(milliseconds) || milliseconds <= 0) return "";
  if (milliseconds < 1000) return `${Math.round(milliseconds)}ms`;
  return `${(milliseconds / 1000).toFixed(milliseconds < 10_000 ? 1 : 0)}s`;
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
  renderAiContext();
});
elements.brandHome.addEventListener("click", openWorkspaceHome);
elements.sidebarCollapse.addEventListener("click", toggleSidebar);
elements.sidebarResize.addEventListener("pointerdown", startSidebarResize);
elements.navSectionToggles.forEach((button) => {
  button.addEventListener("click", () => toggleNavSection(button.dataset.navSectionToggle));
});
elements.aiPanelOpen.addEventListener("click", toggleAiPanel);
elements.aiPanelClose.addEventListener("click", closeAiPanel);
elements.aiPanelResize.addEventListener("pointerdown", startAiPanelResize);
elements.aiChatForm.addEventListener("submit", submitAiMessage);
elements.aiChatInput.addEventListener("keydown", handleAiChatInputKeydown);
elements.aiContentExpansion.addEventListener("change", (event) => setAiContentExpansion(event.target.checked));
elements.aiGenerateNote.addEventListener("click", openGenerateNoteDialog);
elements.luckyButton.addEventListener("click", openLuckyItem);
elements.multiFilterToggle.addEventListener("click", toggleMultiFilterPopover);
elements.tagMatchButtons.forEach((button) => {
  button.addEventListener("click", () => setTagMatchMode(button.dataset.tagMatchMode));
});
elements.sortToggle.addEventListener("click", toggleSortPopover);
elements.sortButtons.forEach((button) => {
  button.addEventListener("click", () => setSortMode(button.dataset.sortMode));
});
elements.favoriteFilter.addEventListener("click", toggleFavoriteFilter);
document.addEventListener("click", (event) => {
  if (!state.multiFilterOpen) return;
  if (elements.multiFilterPopover.contains(event.target) || elements.multiFilterToggle.contains(event.target)) return;
  closeMultiFilterPopover();
});
document.addEventListener("click", (event) => {
  if (!state.sortOpen) return;
  if (elements.sortPopover.contains(event.target) || elements.sortToggle.contains(event.target)) return;
  closeSortPopover();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !elements.metadataEditor.hidden) {
    closeMetadataEditor();
  }
  if (event.key === "Escape" && !elements.shareDialog.hidden) {
    closeShareDialog();
  }
});
elements.languageSelect.addEventListener("change", (event) => setLanguage(event.target.value));
elements.themeModeButtons.forEach((button) => {
  button.addEventListener("click", () => setThemeMode(button.dataset.themeMode));
});
elements.avatarUploadTrigger.addEventListener("click", () => elements.avatarUpload.click());
elements.avatarUpload.addEventListener("change", (event) => uploadAvatar(event.target.files?.[0]));
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
elements.aiRunRefresh?.addEventListener("click", loadAiRuns);
elements.newItemForm.addEventListener("submit", submitNewItem);
elements.readerClose.addEventListener("click", closeReader);
elements.readerEdit.addEventListener("click", () => {
  if (state.currentReaderItemId) openMetadataEditor(state.currentReaderItemId);
});
elements.readerFavorite.addEventListener("click", () => {
  if (state.currentReaderItemId) toggleFavorite(state.currentReaderItemId);
});
elements.readerArchive.addEventListener("click", () => {
  if (state.currentReaderItemId) toggleArchive(state.currentReaderItemId);
});
elements.readerShare.addEventListener("click", () => {
  if (state.currentReaderItemId) openShareDialog(state.currentReaderItemId);
});
elements.readerAiPanelOpen.addEventListener("click", () => {
  if (state.currentReaderItemId) openReaderAiPanel();
  else openAiPanel();
});
elements.readerFrame.addEventListener("load", bindReaderFrameScroll);
elements.shareForm.addEventListener("submit", submitShareDialog);
elements.shareCopy.addEventListener("click", copyCurrentShareLink);
elements.shareRevoke.addEventListener("click", revokeCurrentShare);
elements.shareCancel.addEventListener("click", closeShareDialog);
elements.shareCancelIcon.addEventListener("click", closeShareDialog);
elements.shareDialog.addEventListener("click", (event) => {
  if (event.target === elements.shareDialog) closeShareDialog();
});
elements.generateNoteForm.addEventListener("submit", submitGenerateNoteDialog);
elements.generateTargetUse.addEventListener("change", syncGenerateTargetUseHint);
elements.generateNoteCancel.addEventListener("click", closeGenerateNoteDialog);
elements.generateNoteCancelIcon.addEventListener("click", closeGenerateNoteDialog);
elements.generateNoteDialog.addEventListener("click", (event) => {
  if (event.target === elements.generateNoteDialog) closeGenerateNoteDialog();
});
elements.metadataForm.addEventListener("submit", saveMetadataEditor);
elements.metadataCancel.addEventListener("click", closeMetadataEditor);
elements.metadataCancelIcon.addEventListener("click", closeMetadataEditor);
elements.metadataEditor.addEventListener("click", (event) => {
  if (event.target === elements.metadataEditor) closeMetadataEditor();
});
elements.metadataCollection.addEventListener("change", () => {
  if (elements.metadataCollection.value === "__add__") addMetadataCollection();
});
elements.importEntries.forEach((button) => {
  button.addEventListener("click", openHtmlImportPicker);
});
elements.htmlImportFile.addEventListener("change", (event) => importHtmlFile(event.target.files?.[0]));
elements.materialGenerateFile.addEventListener("change", (event) => generateNoteFromMaterialFile(event.target.files?.[0]));
window.addEventListener("hashchange", openFromHash);
window.matchMedia?.("(prefers-color-scheme: dark)").addEventListener("change", () => {
  if (state.themeMode === "system") applyTheme();
});
elements.loginForm.addEventListener("submit", submitLogin);
elements.logoutButton?.addEventListener("click", submitLogout);

boot();
registerServiceWorker();
