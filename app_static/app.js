const i18n = {
  en: {
    appLanguage: "en",
    sidebarAria: "Vault navigation",
    readerAria: "Reader",
    readerFrameTitle: "HTML knowledge item",
    closeReader: "Close reader",
    language: "Language",
    toggleTheme: "Toggle dark and light mode",
    loading: "Loading",
    items: "{count} items",
    library: "Library",
    collections: "Collections",
    tags: "Tags",
    newButton: "+ New",
    allItems: "All Items",
    inbox: "Inbox",
    recent: "Recent",
    favorites: "Favorites",
    generated: "Generated",
    imported: "Imported",
    needsReview: "Needs Review",
    knowledgeWorkspace: "Knowledge Workspace",
    search: "Search",
    searchTitle: "Search: {query}",
    searchPlaceholder: "Title, summary, tag, path",
    manifestMissing: "Manifest not found. Run <code>html-vault build</code> first.",
    noMatches: "No matching HTML knowledge items.",
    newKnowledgeItem: "New Knowledge Item",
    createHtmlNote: "Create an HTML note",
    staticMode: "Static mode",
    agentConnected: "Agent connected",
    connectAgent: "Connect an Agent Server to create notes from this entry.",
    inputType: "Input type",
    inputAuto: "Auto",
    inputLink: "Link",
    inputFile: "File",
    inputBook: "Book",
    inputTopic: "Topic",
    newItemPlaceholder: "Paste a link, enter a book, or describe a topic",
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
    language: "语言",
    toggleTheme: "切换暗色与亮色模式",
    loading: "加载中",
    items: "{count} 个条目",
    library: "资料库",
    collections: "集合",
    tags: "标签",
    newButton: "+ 新建",
    allItems: "全部条目",
    inbox: "收件箱",
    recent: "最近更新",
    favorites: "收藏",
    generated: "生成内容",
    imported: "导入内容",
    needsReview: "待审核",
    knowledgeWorkspace: "知识工作台",
    search: "搜索",
    searchTitle: "搜索：{query}",
    searchPlaceholder: "标题、摘要、标签、路径",
    manifestMissing: "未找到 Manifest。请先运行 <code>html-vault build</code>。",
    noMatches: "没有匹配的 HTML 知识条目。",
    newKnowledgeItem: "新知识条目",
    createHtmlNote: "创建 HTML 笔记",
    staticMode: "静态模式",
    agentConnected: "Agent 已连接",
    connectAgent: "连接 Agent Server 后，可从这里创建笔记。",
    inputType: "输入类型",
    inputAuto: "自动",
    inputLink: "链接",
    inputFile: "文件",
    inputBook: "书籍",
    inputTopic: "主题",
    newItemPlaceholder: "粘贴链接、输入书名，或描述一个主题",
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
};

const elements = {
  siteTitle: document.querySelector("#site-title"),
  itemCount: document.querySelector("#item-count"),
  languageSelect: document.querySelector("#language-select"),
  themeToggle: document.querySelector("#theme-toggle"),
  themeIcon: document.querySelector("#theme-icon"),
  libraryNav: document.querySelector("#library-nav"),
  collectionNav: document.querySelector("#collection-nav"),
  tagNav: document.querySelector("#tag-nav"),
  activeFilterLabel: document.querySelector("#active-filter-label"),
  workspaceTitle: document.querySelector("#workspace-title"),
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
}

function renderLibraryNav() {
  elements.libraryNav.replaceChildren(...libraryFilterDefinitions.map((filter) => {
    const count = countLibraryFilter(filter.value);
    return navButton(t(filter.labelKey), count, state.filter.type === "library" && state.filter.value === filter.value, () => {
      state.filter = { type: "library", value: filter.value };
      renderApp();
    });
  }));
}

function renderCollectionNav() {
  const buttons = (state.manifest.collections || []).map((collection) => {
    return navButton(collection.name, collection.count, state.filter.type === "collection" && state.filter.value === collection.name, () => {
      state.filter = { type: "collection", value: collection.name, label: collection.name };
      renderApp();
    });
  });
  elements.collectionNav.replaceChildren(...buttons);
}

function renderTagNav() {
  const tags = (state.manifest.tags || []).map((tag) => {
    const button = document.createElement("button");
    button.className = `tag-filter${state.filter.type === "tag" && state.filter.value === tag.name ? " active" : ""}`;
    button.type = "button";
    button.textContent = `#${tag.name} ${tag.count}`;
    button.addEventListener("click", () => {
      state.filter = { type: "tag", value: tag.name, label: `#${tag.name}` };
      renderApp();
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
  elements.activeFilterLabel.textContent = getActiveFilterLabel();
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

function openFromHash() {
  const id = decodeURIComponent(window.location.hash.replace(/^#\/?/, ""));
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
  const browserLanguage = navigator.language === "zh-CN" || navigator.language.startsWith("zh") ? "zh-CN" : "en";
  return browserLanguage;
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
  elements.newFeedback.textContent = t(state.feedbackKey, state.feedbackParams).trim();
}

function getActiveFilterLabel() {
  if (state.filter.type === "library") {
    const filter = libraryFilterDefinitions.find((item) => item.value === state.filter.value);
    return filter ? t(filter.labelKey) : t("allItems");
  }
  if (state.filter.type === "collection") {
    return state.filter.value;
  }
  if (state.filter.type === "tag") {
    return `#${state.filter.value}`;
  }
  return t("allItems");
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
elements.languageSelect.addEventListener("change", (event) => setLanguage(event.target.value));
elements.themeToggle.addEventListener("click", toggleTheme);
elements.newItemForm.addEventListener("submit", submitNewItem);
elements.readerClose.addEventListener("click", closeReader);
elements.readerCopy.addEventListener("click", copyReaderLink);
document.querySelector("[data-focus-new]").addEventListener("click", () => elements.newItemInput.focus());
window.addEventListener("hashchange", openFromHash);

boot();
