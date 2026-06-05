const { expect, test } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.clear());
  await page.goto("/demo/", { waitUntil: "domcontentloaded" });
});

test("demo defaults to English without a saved language", async ({ page }) => {
  await page.goto("/demo/");

  await expect(page.locator("#language-select")).toHaveValue("en");
  await expect(page.getByRole("button", { name: /All Items/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Create with AI" })).toBeVisible();
});

test("demo Home button stays outside the AI panel", async ({ page }) => {
  await page.goto("/demo/?lang=zh-CN");

  const homeButton = page.locator(".demo-home-link");
  await expect(homeButton).toBeVisible();

  await page.locator("#ai-panel-open").click();
  const aiPanel = page.locator("#ai-panel");
  await expect(aiPanel).toBeVisible();
  await expect(page.locator("body")).toHaveClass(/ai-panel-open/);

  await expect
    .poll(async () => {
      const homeBox = await homeButton.boundingBox();
      const panelBox = await aiPanel.boundingBox();
      if (!homeBox || !panelBox) return false;
      return homeBox.x + homeBox.width <= panelBox.x - 12;
    })
    .toBe(true);
});

test("workspace logo returns to the workspace home", async ({ page }) => {
  await page.goto("/demo/?lang=zh-CN");

  await page.locator("#library-nav .nav-item", { hasText: "Imported" }).click();
  await expect(page.getByRole("button", { name: /Imported/ })).toHaveClass(/active/);
  await page.locator("#brand-home").click();
  await expect(page).toHaveURL(/\/demo\/\?lang=zh-CN$/);
  await expect(page.getByRole("button", { name: /All Items/ })).toHaveClass(/active/);
  await expect(page.locator(".cover h1")).toHaveCount(0);
});

test("sidebar footer uses settings, homepage, and GitHub actions", async ({ page }) => {
  await expect(page.locator("#profile-status")).toHaveCount(0);
  await expect(page.locator("#settings-open")).toBeVisible();
  await expect(page.locator(".project-link")).toBeVisible();
  await expect(page.locator(".github-link")).toBeVisible();
  await expect(page.locator(".project-link")).toHaveAttribute("href", /html_lore\/$/);
  await expect(page.locator(".github-link")).toHaveAttribute("href", /github\.com\/JMoCoder\/html_lore/);

  await expect
    .poll(async () => {
      const settings = await page.locator("#settings-open").boundingBox();
      const project = await page.locator(".project-link").boundingBox();
      const github = await page.locator(".github-link").boundingBox();
      if (!settings || !project || !github) return false;
      return settings.x < project.x && project.x < github.x;
    })
    .toBe(true);
});

test("card share action opens the same share dialog", async ({ page }) => {
  await page.goto("/demo/?lang=en");

  const firstCard = page.locator(".item-card").first();
  await expect(firstCard.getByTitle("Share")).toBeVisible();
  await firstCard.getByTitle("Share").click();

  await expect(page.locator("#share-dialog")).toBeVisible();
  await expect(page.locator("#share-duration")).toBeVisible();
  await expect(page.locator("#share-feedback")).toContainText("backend server");
  await page.locator("#share-cancel").click();
  await expect(page.locator("#share-dialog")).toBeHidden();
});

test("share dialog and management show expiry and static status", async ({ page }) => {
  let shares = [];
  const share = {
    id: "share-test",
    item_id: "demo-notes/readme.zh-CN.html",
    token: "token-test",
    url_path: "/share/token-test",
    duration: "7d",
    expires_at: "2026-06-12T09:30:00Z",
    revoked: false,
    active: true,
    access_count: 2,
  };
  await page.route("**/demo/config.js", async (route) => {
    await route.fulfill({
      contentType: "application/javascript",
      body: 'window.HTML_LORE_AGENT_URL = "http://127.0.0.1:8090";',
    });
  });
  await page.route("**/api/auth/status", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({ enabled: false, authenticated: true, user: null, data_id: null }),
    });
  });
  await page.route("**/api/shares", async (route) => {
    if (route.request().method() === "POST") {
      shares = [share];
      await route.fulfill({
        contentType: "application/json",
        body: JSON.stringify({ share, token: share.token, url_path: share.url_path }),
      });
      return;
    }
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({ shares, count: shares.length }),
    });
  });

  await page.goto("/demo/?lang=en");
  await page
    .locator(".item-card", { hasText: "HTMlore README 完整说明" })
    .locator("[data-item-action='share']")
    .click();
  await page.locator("#share-duration").selectOption("7d");
  await page.locator("#share-create").click();

  await expect(page.locator("#share-link")).toHaveValue(/\/share\/token-test$/);
  await expect(page.locator("#share-expiry")).toContainText("Valid until:");
  await expect(page.locator("#share-expiry")).toContainText("2026");
  await expect(page.locator("#share-expiry .share-status")).toContainText("Active");
  await expect(page.locator("#share-expiry .share-status")).toHaveClass(/is-active/);

  await page.locator("#share-cancel").click();
  await expect(page.locator("#share-dialog")).toBeHidden();
  await page.locator("#settings-open").click();
  await page.locator("[data-settings-tab='shares']").click();
  const row = page.locator("#share-management-list .share-row").first();
  await expect(row.locator(".share-status")).toContainText("Active");
  await expect(row).toContainText("2026");
  await expect(row).toContainText("2 visits");
});

test("tag filter counts follow OR and AND selection semantics", async ({ page }) => {
  const items = [
    {
      id: "notes/a.html",
      title: "Alpha",
      summary: "A only",
      collection: "Test",
      tags: ["A"],
      source: "imported",
      updated: "2026-06-04T00:00:00Z",
      path: "content/a.html",
    },
    {
      id: "notes/ab.html",
      title: "Alpha Beta",
      summary: "A and B",
      collection: "Test",
      tags: ["A", "B"],
      source: "imported",
      updated: "2026-06-03T00:00:00Z",
      path: "content/ab.html",
    },
    {
      id: "notes/c.html",
      title: "Gamma",
      summary: "C only",
      collection: "Test",
      tags: ["C"],
      source: "imported",
      updated: "2026-06-02T00:00:00Z",
      path: "content/c.html",
    },
  ];
  await page.route("**/demo/config.js", async (route) => {
    await route.fulfill({
      contentType: "application/javascript",
      body: 'window.HTML_LORE_AGENT_URL = "http://127.0.0.1:8090";',
    });
  });
  await page.route("**/api/auth/status", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({ enabled: false, authenticated: true, user: null, data_id: null }),
    });
  });
  await page.route("**/api/manifest", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({ version: 2, title: "Filter Test", items }),
    });
  });
  await page.route("**/api/shares", async (route) => {
    await route.fulfill({ contentType: "application/json", body: JSON.stringify({ shares: [], count: 0 }) });
  });

  await page.goto("/demo/?lang=en");
  await page.locator("#multi-filter-toggle").click();
  await expect(page.locator("#multi-filter-result-count")).toHaveText("(Selected: 3)");
  await expect(page.locator("#multi-tag-options .multi-filter-option", { hasText: "#A" }).locator(".multi-filter-count")).toHaveText("2");
  await expect(page.locator("#multi-tag-options .multi-filter-option", { hasText: "#B" }).locator(".multi-filter-count")).toHaveText("1");
  await expect(page.locator("#multi-tag-options .multi-filter-option", { hasText: "#C" }).locator(".multi-filter-count")).toHaveText("1");

  await page.locator("#multi-tag-options .multi-filter-option", { hasText: "#A" }).click();
  await expect(page.locator("#multi-filter-result-count")).toHaveText("(Selected: 2)");
  await expect(page.locator("#multi-tag-options .multi-filter-option", { hasText: "#B" }).locator(".multi-filter-count")).toHaveText("1");
  await expect(page.locator("#multi-tag-options .multi-filter-option", { hasText: "#C" }).locator(".multi-filter-count")).toHaveText("1");

  await page.locator("[data-tag-match-mode='all']").click();
  await expect(page.locator("#multi-filter-result-count")).toHaveText("(Selected: 2)");
  await expect(page.locator("#multi-tag-options .multi-filter-option", { hasText: "#A" }).locator(".multi-filter-count")).toHaveText("2");
  await expect(page.locator("#multi-tag-options .multi-filter-option", { hasText: "#B" }).locator(".multi-filter-count")).toHaveText("1");
  await expect(page.locator("#multi-tag-options .multi-filter-option", { hasText: "#C" }).locator(".multi-filter-count")).toHaveText("0");

  await page.locator("#multi-tag-options .multi-filter-option", { hasText: "#B" }).click();
  await expect(page.locator("#multi-filter-result-count")).toHaveText("(Selected: 1)");
  await expect(page.locator("#multi-tag-options .multi-filter-option", { hasText: "#A" }).locator(".multi-filter-count")).toHaveText("1");
  await expect(page.locator("#multi-tag-options .multi-filter-option", { hasText: "#B" }).locator(".multi-filter-count")).toHaveText("1");
  await expect(page.locator("#multi-tag-options .multi-filter-option", { hasText: "#C" }).locator(".multi-filter-count")).toHaveText("0");
});

test("card date uses the stable created date instead of state update time", async ({ page }) => {
  await page.route("**/demo/config.js", async (route) => {
    await route.fulfill({
      contentType: "application/javascript",
      body: 'window.HTML_LORE_AGENT_URL = "http://127.0.0.1:8090";',
    });
  });
  await page.route("**/api/auth/status", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({ enabled: false, authenticated: true, user: null, data_id: null }),
    });
  });
  await page.route("**/api/manifest", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({
        version: 2,
        title: "Date Test",
        items: [
          {
            id: "notes/stable-date.html",
            title: "Stable Date",
            summary: "Created date should remain visible after state changes.",
            collection: "Test",
            tags: ["Date"],
            source: "imported",
            created: "2026-05-01T08:00:00Z",
            updated: "2026-06-05T08:00:00Z",
            path: "content/stable-date.html",
          },
        ],
      }),
    });
  });
  await page.route("**/api/shares", async (route) => {
    await route.fulfill({ contentType: "application/json", body: JSON.stringify({ shares: [], count: 0 }) });
  });

  await page.goto("/demo/?lang=en");
  const card = page.locator(".item-card", { hasText: "Stable Date" });
  await expect(card.locator(".card-date")).toHaveText("2026-05-01");
});

test("card original links use raw API in same-origin app mode", async ({ page }) => {
  await page.route("**/demo/config.js", async (route) => {
    await route.fulfill({
      contentType: "application/javascript",
      body: 'window.HTML_LORE_AGENT_URL = "http://127.0.0.1:8090";',
    });
  });
  await page.route("**/api/auth/status", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({ enabled: false, authenticated: true, user: null, data_id: null }),
    });
  });
  await page.route("**/api/manifest", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({
        version: 2,
        title: "HTMlore Test",
        items: [
          {
            id: "imported/2026/06/imported-note-6.html",
            title: "Imported Note",
            summary: "Imported note summary",
            collection: "Inbox",
            tags: ["HTML"],
            source: "imported",
            updated: "2026-06-04T00:00:00Z",
            path: "content/imported/2026/06/imported-note-6.html",
          },
        ],
      }),
    });
  });
  await page.goto("/demo/?lang=en");

  const original = page.locator(".item-card .card-links a").first();
  await expect(original).toBeVisible();
  await expect(original).toHaveAttribute("href", /\/api\/items\/.+\/raw$/);
});

test("card original links keep static content paths in demo mode", async ({ page }) => {
  await page.goto("/demo/?lang=en");

  const original = page.locator(".item-card .card-links a").first();
  await expect(original).toBeVisible();
  await expect(original).toHaveAttribute("href", /^content\/.+\.html$/);
});
