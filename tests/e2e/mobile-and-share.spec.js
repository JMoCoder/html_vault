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

test("static share fallback renders public shared content instead of the workspace shell", async ({ page }) => {
  await page.route("**/share/test-token", async (route) => {
    const html = fs.readFileSync(path.join(__dirname, "../../docs/demo/index.html"), "utf8")
      .replace("<head>", '<head><base href="/demo/">');
    await route.fulfill({ contentType: "text/html", body: html });
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
