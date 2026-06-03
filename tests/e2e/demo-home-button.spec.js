const { expect, test } = require("@playwright/test");

test("demo Home button stays outside the AI panel", async ({ page }) => {
  await page.goto("/demo/?lang=zh-CN");

  const homeButton = page.locator(".demo-home-link");
  await expect(homeButton).toBeVisible();

  await page.locator("#ai-panel-open").click();
  const aiPanel = page.locator("#ai-panel");
  await expect(aiPanel).toBeVisible();
  await expect(page.locator("body")).toHaveClass(/ai-panel-open/);

  const homeBox = await homeButton.boundingBox();
  const panelBox = await aiPanel.boundingBox();
  expect(homeBox).not.toBeNull();
  expect(panelBox).not.toBeNull();
  const homeRight = homeBox.x + homeBox.width;
  expect(homeRight).toBeLessThanOrEqual(panelBox.x - 12);
});

test("demo workspace logo opens the Pages homepage", async ({ page }) => {
  await page.goto("/demo/?lang=zh-CN");

  await page.locator("#brand-home").click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator(".hero h1")).toBeVisible();
});
