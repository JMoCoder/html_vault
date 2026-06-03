const { expect, test } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto("/demo/");
  await page.evaluate(() => localStorage.clear());
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

test("demo workspace logo opens the Pages homepage", async ({ page }) => {
  await page.goto("/demo/?lang=zh-CN");

  await page.locator("#brand-home").click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator(".cover h1")).toBeVisible();
});
