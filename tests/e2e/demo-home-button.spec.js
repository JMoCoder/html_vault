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
