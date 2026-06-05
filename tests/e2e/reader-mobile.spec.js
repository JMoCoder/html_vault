const { expect, test } = require("@playwright/test");

test("mobile reader uses full viewport and supports original-width mode", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/demo/?lang=zh-CN");

  await page.locator(".item-card [data-read]").first().click();
  const reader = page.locator("#reader");
  const header = page.locator(".reader-header");
  const actions = page.locator(".reader-actions");
  const shell = page.locator(".reader-frame-shell");
  const frame = page.locator("#reader-frame");

  await expect(reader).toBeVisible();
  await expect(page.locator(".sidebar")).toBeHidden();
  await expect(reader).toHaveClass(/reader/);

  await expect
    .poll(async () => {
      const readerBox = await reader.boundingBox();
      const headerBox = await header.boundingBox();
      const actionsBox = await actions.boundingBox();
      const shellBox = await shell.boundingBox();
      if (!readerBox || !headerBox || !actionsBox || !shellBox) return false;
      return (
        Math.round(readerBox.x) === 0 &&
        readerBox.width >= 389 &&
        actionsBox.y >= headerBox.y &&
        actionsBox.y + actionsBox.height <= shellBox.y
      );
    })
    .toBe(true);

  const initial = await frame.boundingBox();
  expect(initial.width).toBeLessThanOrEqual(392);

  await page.locator("#reader-width-toggle").click();
  await expect(reader).toHaveClass(/reader-wide/);
  await expect(page.locator("#reader-width-toggle")).toHaveAttribute("title", /^(Fit width|适配宽度|幅に合わせる)$/);

  await expect
    .poll(async () => {
      const frameBox = await frame.boundingBox();
      const shellBox = await shell.boundingBox();
      const shellSize = await shell.evaluate((node) => ({
        clientWidth: node.clientWidth,
        scrollWidth: node.scrollWidth,
      }));
      if (!frameBox || !shellBox) return false;
      return frameBox.width > shellBox.width && shellSize.scrollWidth > shellSize.clientWidth;
    })
    .toBe(true);
});
