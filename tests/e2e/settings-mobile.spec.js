const { expect, test } = require("@playwright/test");

test("mobile settings uses a compact horizontal tab scroller", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/demo/?lang=zh-CN", { waitUntil: "domcontentloaded" });
  await page.locator("#settings-open").click();

  await expect(page.locator("#settings-page")).toBeVisible();

  const metrics = await page.evaluate(() => {
    const nav = document.querySelector(".settings-nav");
    const firstTab = document.querySelector(".settings-tab");
    const body = document.querySelector(".settings-body");
    if (!nav || !firstTab || !body) return null;
    const navBox = nav.getBoundingClientRect();
    const tabBox = firstTab.getBoundingClientRect();
    return {
      navHeight: Math.round(navBox.height),
      tabHeight: Math.round(tabBox.height),
      scrollWidth: nav.scrollWidth,
      clientWidth: nav.clientWidth,
      rows: getComputedStyle(body).gridTemplateRows,
    };
  });

  expect(metrics).not.toBeNull();
  expect(metrics.navHeight).toBeLessThanOrEqual(72);
  expect(metrics.tabHeight).toBeLessThanOrEqual(42);
  expect(metrics.scrollWidth).toBeGreaterThan(metrics.clientWidth);
  expect(metrics.rows).toMatch(/px/);
});

test("desktop settings keeps the left navigation layout", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/demo/?lang=en", { waitUntil: "domcontentloaded" });
  await page.locator("#settings-open").click();

  await expect(page.locator("#settings-page")).toBeVisible();

  const metrics = await page.evaluate(() => {
    const nav = document.querySelector(".settings-nav");
    const firstTab = document.querySelector(".settings-tab");
    const body = document.querySelector(".settings-body");
    if (!nav || !firstTab || !body) return null;
    const navBox = nav.getBoundingClientRect();
    const tabBox = firstTab.getBoundingClientRect();
    return {
      navWidth: Math.round(navBox.width),
      tabWidth: Math.round(tabBox.width),
      tabHeight: Math.round(tabBox.height),
      columns: getComputedStyle(body).gridTemplateColumns,
    };
  });

  expect(metrics).not.toBeNull();
  expect(metrics.navWidth).toBe(220);
  expect(metrics.tabWidth).toBeGreaterThan(170);
  expect(metrics.tabHeight).toBeGreaterThanOrEqual(38);
  expect(metrics.columns).toContain("220px");
});
