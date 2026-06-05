const { expect, test } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

test("mobile sidebar collapses vertically without squeezing the workspace", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/demo/?lang=zh-CN");

  const sidebar = page.locator(".sidebar");
  const workspace = page.locator(".workspace");
  await expect(sidebar).toBeVisible();
  await expect(page.locator("body")).not.toHaveClass(/sidebar-collapsed/);

  await expect
    .poll(async () => {
      const sidebarBox = await sidebar.boundingBox();
      const workspaceBox = await workspace.boundingBox();
      if (!sidebarBox || !workspaceBox) return false;
      return sidebarBox.width >= 380 && workspaceBox.x < 4 && workspaceBox.width >= 380;
    })
    .toBe(true);

  await page.locator("#sidebar-collapse").click();
  await expect(page.locator("body")).toHaveClass(/sidebar-collapsed/);
  await expect(page.locator(".sidebar-main")).toBeHidden();
  await expect(sidebar).toBeVisible();

  await expect
    .poll(async () => {
      const sidebarBox = await sidebar.boundingBox();
      const workspaceBox = await workspace.boundingBox();
      if (!sidebarBox || !workspaceBox) return false;
      return sidebarBox.width >= 380 && sidebarBox.height < 82 && workspaceBox.x < 4;
    })
    .toBe(true);
});

test("mobile reader lets metadata and actions scroll away under the global bar", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => localStorage.clear());
  await page.goto("/demo/?lang=zh-CN", { waitUntil: "domcontentloaded" });

  await page.locator(".item-card", { hasText: "HTMlore README 完整说明" }).getByRole("button", { name: "Read" }).click();

  const sidebar = page.locator(".sidebar");
  const reader = page.locator("#reader");
  const header = page.locator(".reader-header");
  const summary = page.locator("#reader-summary");
  const frame = page.locator("#reader-frame");
  await expect(reader).toBeVisible();
  await expect(header).toBeVisible();
  await expect(summary).toBeVisible();

  await expect
    .poll(async () => {
      const sidebarBox = await sidebar.boundingBox();
      const readerBox = await reader.boundingBox();
      const frameBox = await frame.boundingBox();
      if (!sidebarBox || !readerBox || !frameBox) return false;
      return readerBox.y >= sidebarBox.y + sidebarBox.height - 1 && frameBox.height > 700;
    })
    .toBe(true);

  await reader.evaluate((node) => {
    const header = node.querySelector(".reader-header");
    node.scrollTop = (header?.getBoundingClientRect().height || 0) + 96;
    node.dispatchEvent(new Event("scroll"));
  });

  await expect
    .poll(async () => {
      return reader.evaluate((node) => {
        const header = node.querySelector(".reader-header");
        if (!header) return false;
        const position = getComputedStyle(header).position;
        return node.scrollTop > header.getBoundingClientRect().height && position !== "fixed" && position !== "sticky";
      });
    })
    .toBe(true);
});

test("static share fallback renders public shared content instead of the workspace shell", async ({ page }) => {
  await page.route("**/share/test-token", async (route) => {
    const html = fs.readFileSync(path.join(__dirname, "../../app_static/index.html"), "utf8");
    await route.fulfill({ contentType: "text/html", body: html });
  });
  await page.route("**/config.js", async (route) => {
    await route.fulfill({ contentType: "application/javascript", body: "" });
  });
  await page.route("**/app.js**", async (route) => {
    await route.fulfill({
      contentType: "application/javascript",
      body: fs.readFileSync(path.join(__dirname, "../../app_static/app.js"), "utf8"),
    });
  });
  await page.route("**/style.css**", async (route) => {
    await route.fulfill({
      contentType: "text/css",
      body: fs.readFileSync(path.join(__dirname, "../../app_static/style.css"), "utf8"),
    });
  });
  await page.route("**/assets/html-lore-logo.svg", async (route) => {
    await route.fulfill({
      contentType: "image/svg+xml",
      body: fs.readFileSync(path.join(__dirname, "../../app_static/assets/html-lore-logo.svg"), "utf8"),
    });
  });
  await page.route("**/api/public/shares/test-token", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({
        share: { active: true, expires_at: "" },
        item: { title: "Shared Note", summary: "Public summary" },
        html: "<h1>Rendered shared HTML</h1><p>Only public content.</p>",
        styles: "<style>h1{color:#0f766e}</style>",
      }),
    });
  });

  await page.goto("/share/test-token");

  await expect(page.locator(".share-fallback-shell")).toBeVisible();
  await expect(page.locator(".share-fallback-banner h1")).toHaveText("Shared Note");
  await expect(page.locator(".shell")).toHaveCount(0);
  await expect(page.frameLocator(".share-fallback-frame").locator("h1")).toHaveText("Rendered shared HTML");
});

test("archiving the only note for a tag hides that zero-count tag until restored", async ({ page }) => {
  await page.goto("/demo/");
  await page.evaluate(() => localStorage.clear());
  await page.reload();

  const uniqueTag = page.locator("#tag-nav .tag-filter", { hasText: "#自托管" });
  await expect(uniqueTag).toBeVisible();
  await expect(uniqueTag).toContainText("1");

  page.once("dialog", async (dialog) => dialog.accept());
  await page.locator(".item-card", { hasText: "HTMlore README 完整说明" }).getByTitle("Archive").click();

  await expect(page.locator("#tag-nav .tag-filter", { hasText: "#自托管" })).toHaveCount(0);
  await page.locator("#multi-filter-toggle").click();
  await expect(page.locator("#multi-tag-options .multi-filter-option", { hasText: "#自托管" })).toHaveCount(0);

  await page.locator("#library-nav .nav-item", { hasText: "Archived" }).click();
  await page.locator(".item-card", { hasText: "HTMlore README 完整说明" }).getByTitle("Unarchive").click();

  await expect(page.locator("#tag-nav .tag-filter", { hasText: "#自托管" })).toBeVisible();
  await expect(page.locator("#tag-nav .tag-filter", { hasText: "#自托管" })).toContainText("1");
});
