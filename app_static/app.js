const state = {
  manifest: null,
  items: [],
  filter: { type: "library", value: "all", label: "All Items" },
  query: "",
  agentUrl: window.HTML_VAULT_AGENT_URL || "",
};

const libraryFilters = [
  { value: "all", label: "All Items", test: () => true },
  { value: "inbox", label: "Inbox", test: (item) => item.collection === "Inbox" },
  { value: "recent", label: "Recent", test: () => true },
  { value: "favorites", label: "Favorites", test: (item) => item.favorite },
  { value: "generated", label: "Generated", test: (item) => item.agent?.generated || item.source_type === "topic" },
  { value: "imported", label: "Imported", test: (item) => item.source_type === "imported" || item.source_type === "html" },
  { value: "needs-review", label: "Needs Review", test: (item) => item.review_status === "unreviewed" },
];

const elements = {
  siteTitle: document.querySelector("#site-title"),
  itemCount: document.querySelector("#item-count"),
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
  try {
    const response = await fetch("manifest.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`Unable to load manifest: ${response.status}`);
    state.manifest = await response.json();
    state.items = Array.isArray(state.manifest.items) ? state.manifest.items : [];
    renderApp();
    openFromHash();
  } catch (error) {
    elements.contentGrid.innerHTML = `<div class="empty-state">Manifest not found. Run <code>html-vault build</code> first.</div>`;
    console.error(error);
  }
}

function renderApp() {
  elements.siteTitle.textContent = state.manifest.site?.title || "HTML Vault";
  elements.itemCount.textContent = `${state.items.length} items`;
  renderLibraryNav();
  renderCollectionNav();
  renderTagNav();
  renderGrid();
  updateAgentStatus();
}

function renderLibraryNav() {
  elements.libraryNav.replaceChildren(...libraryFilters.map((filter) => {
    const count = countLibraryFilter(filter.value);
    return navButton(filter.label, count, state.filter.type === "library" && state.filter.value === filter.value, () => {
      state.filter = { type: "library", value: filter.value, label: filter.label };
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
  const filter = libraryFilters.find((item) => item.value === value);
  if (!filter) return 0;
  return state.items.filter(filter.test).length;
}

function filteredItems() {
  const query = state.query.trim().toLowerCase();
  let items = [...state.items];

  if (state.filter.type === "library") {
    const filter = libraryFilters.find((item) => item.value === state.filter.value);
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
  elements.activeFilterLabel.textContent = state.filter.label;
  elements.workspaceTitle.textContent = state.query ? `Search: ${state.query}` : "Knowledge Workspace";
  const items = filteredItems();

  if (items.length === 0) {
    elements.contentGrid.innerHTML = `<div class="empty-state">No matching HTML knowledge items.</div>`;
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
    <p>${escapeHtml(item.summary || "No summary yet.")}</p>
    <div class="card-tags">${(item.tags || []).slice(0, 4).map((tag) => `<span>#${escapeHtml(tag)}</span>`).join("")}</div>
    <div class="card-footer">
      <span>${escapeHtml(item.source_type || "html")}</span>
      <div>
        <button type="button" data-read>Read</button>
        <a href="${encodeURI(item.path)}" target="_blank" rel="noreferrer">Original</a>
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
    elements.newFeedback.textContent = "Enter a link, book, file path, or topic first.";
    return;
  }

  if (!state.agentUrl) {
    elements.newFeedback.textContent = "Agent Server not configured. Set window.HTML_VAULT_AGENT_URL before loading the app.";
    return;
  }

  elements.newFeedback.textContent = "Submitting job...";
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
    elements.newFeedback.textContent = `Queued job ${result.job_id || ""}`.trim();
  } catch (error) {
    elements.newFeedback.textContent = "Agent Server is unavailable.";
    console.error(error);
  }
}

function updateAgentStatus() {
  if (state.agentUrl) {
    elements.agentStatus.textContent = "Agent connected";
  } else {
    elements.agentStatus.textContent = "Static mode";
  }
}

function copyReaderLink() {
  const url = window.location.href;
  navigator.clipboard?.writeText(url);
  elements.readerCopy.textContent = "Copied";
  window.setTimeout(() => {
    elements.readerCopy.textContent = "Copy Link";
  }, 1400);
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
elements.newItemForm.addEventListener("submit", submitNewItem);
elements.readerClose.addEventListener("click", closeReader);
elements.readerCopy.addEventListener("click", copyReaderLink);
document.querySelector("[data-focus-new]").addEventListener("click", () => elements.newItemInput.focus());
window.addEventListener("hashchange", openFromHash);

boot();
