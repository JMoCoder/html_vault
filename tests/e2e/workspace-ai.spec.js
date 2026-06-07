const { expect, test } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

function appStaticFile(name) {
  return path.join(__dirname, "../../app_static", name);
}

async function routeWorkspace(page) {
  await page.route("**/workspace/", async (route) => {
    await route.fulfill({
      contentType: "text/html",
      body: fs.readFileSync(appStaticFile("index.html"), "utf8"),
    });
  });
  await page.route("**/config.js", async (route) => {
    await route.fulfill({
      contentType: "application/javascript",
      body: 'window.HTML_LORE_AGENT_URL = "http://127.0.0.1:8090";',
    });
  });
  await page.route("**/app.js**", async (route) => {
    await route.fulfill({
      contentType: "application/javascript",
      body: fs.readFileSync(appStaticFile("app.js"), "utf8"),
    });
  });
  await page.route("**/style.css**", async (route) => {
    await route.fulfill({
      contentType: "text/css",
      body: fs.readFileSync(appStaticFile("style.css"), "utf8"),
    });
  });
  await page.route("**/assets/html-lore-logo.svg", async (route) => {
    await route.fulfill({
      contentType: "image/svg+xml",
      body: fs.readFileSync(appStaticFile("assets/html-lore-logo.svg"), "utf8"),
    });
  });
  await page.route("**/manifest.webmanifest", async (route) => {
    await route.fulfill({ contentType: "application/manifest+json", body: "{}" });
  });
}

test("workspace file create mode uploads material to the AI generation endpoint", async ({ page }) => {
  await page.addInitScript(() => localStorage.clear());
  await routeWorkspace(page);

  let materialRequest = null;
  let uploadHtmlCalled = false;
  let legacyJobCalled = false;
  let manifestCalls = 0;
  const generatedRun = {
    id: "run-material-test",
    kind: "material_html_generation",
    status: "completed",
    started_at: "2026-06-07T02:00:00.000Z",
    completed_at: "2026-06-07T02:00:01.250Z",
    duration_ms: 1250,
    retryable: false,
    cancellable: false,
    item_id: "generated/2026/06/material-note.html",
    node_trace: [
      { node: "MaterialParseNode", status: "ok" },
      { node: "ContentBriefNode", status: "ok" },
      { node: "ReviewerNode", status: "ok" },
    ],
    material: { title: "material", material_type: "markdown", text_chars: 36 },
  };
  const refreshedRun = {
    id: "run-qa-refresh-test",
    kind: "knowledge_qa",
    status: "completed",
    started_at: "2026-06-07T02:05:00.000Z",
    completed_at: "2026-06-07T02:05:00.640Z",
    duration_ms: 640,
    retryable: false,
    cancellable: false,
    source_mode: "local_only",
    local_sources: { count: 1 },
    external_sources: { count: 0, enabled: false, status: "skipped" },
    node_trace: [
      { node: "RetrieverNode", status: "ok" },
      { node: "AnswerAgentNode", status: "ok" },
    ],
    spec: { source_mode: "local_only" },
    usage: { input_tokens: 120, output_tokens: 80, total_tokens: 200 },
  };
  const manifestBefore = {
    version: 2,
    title: "HTMlore Workspace",
    items: [],
  };
  const manifestAfter = {
    version: 2,
    title: "HTMlore Workspace",
    items: [
      {
        id: "generated/2026/06/material-note.html",
        title: "Generated Material Note",
        summary: "Generated from uploaded material.",
        collection: "Generated",
        tags: ["AI"],
        source: "generated",
        created: "2026-06-07T00:00:00Z",
        updated: "2026-06-07T00:00:00Z",
        path: "content/generated/2026/06/material-note.html",
      },
    ],
  };
  let runsRequested = 0;
  let showRefreshedRun = false;

  await page.route("**/api/auth/status", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({ enabled: false, authenticated: true, user: null, data_id: null }),
    });
  });
  await page.route("**/api/ai/status", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({ available: false, provider: "", model: "", external_search: false }),
    });
  });
  await page.route("**/api/version", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({ version: "0.8.4", latest_version: "0.8.4", update_available: false }),
    });
  });
  await page.route("**/api/shares", async (route) => {
    await route.fulfill({ contentType: "application/json", body: JSON.stringify({ shares: [], count: 0 }) });
  });
  await page.route("**/api/ai/runs**", async (route) => {
    const pathname = new URL(route.request().url()).pathname;
    if (pathname.endsWith(`/api/ai/runs/${refreshedRun.id}`)) {
      await route.fulfill({
        contentType: "application/json",
        body: JSON.stringify({
          run: {
            ...refreshedRun,
            unsafe_private_prompt: "Important uploaded source should stay hidden",
          },
        }),
      });
      return;
    }
    runsRequested += 1;
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({
        runs: showRefreshedRun ? [refreshedRun, generatedRun] : [generatedRun],
        count: showRefreshedRun ? 2 : 1,
      }),
    });
  });
  await page.route("**/api/manifest", async (route) => {
    manifestCalls += 1;
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify(manifestCalls > 1 ? manifestAfter : manifestBefore),
    });
  });
  await page.route("**/api/uploads/html", async (route) => {
    uploadHtmlCalled = true;
    await route.abort();
  });
  await page.route("**/api/jobs", async (route) => {
    legacyJobCalled = true;
    await route.abort();
  });
  await page.route("**/api/ai/material-runs", async (route) => {
    materialRequest = {
      method: route.request().method(),
      postData: route.request().postData() || "",
    };
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({
        run_id: generatedRun.id,
        run: generatedRun,
        item: manifestAfter.items[0],
        graph: { kind: "material_html_generation" },
      }),
    });
  });

  await page.goto("/workspace/", { waitUntil: "domcontentloaded" });
  await page.locator("#input-type").selectOption("file");
  await page.locator("#new-item-input").fill("Turn this material into a concise study note.");

  const fileChooserPromise = page.waitForEvent("filechooser");
  await page.locator("#new-item-form button[type='submit']").click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles({
    name: "material.md",
    mimeType: "text/markdown",
    buffer: Buffer.from("# Material\n\nImportant uploaded source.", "utf8"),
  });

  await expect(page.locator("#new-feedback")).toContainText("Generated note: Generated Material Note");
  await expect(page.locator(".item-card", { hasText: "Generated Material Note" })).toBeVisible();
  expect(uploadHtmlCalled).toBe(false);
  expect(legacyJobCalled).toBe(false);
  expect(materialRequest).not.toBeNull();
  expect(materialRequest.method).toBe("POST");
  expect(materialRequest.postData).toContain("material.md");
  expect(materialRequest.postData).toContain("Turn this material into a concise study note.");

  await page.locator("#settings-open").click();
  await page.locator("[data-settings-tab='ai']").click();
  await expect(page.locator("#ai-run-list")).toContainText("Generated from uploaded material");
  await expect(page.locator("#ai-run-list")).toContainText("Completed");
  await expect(page.locator("#ai-run-list")).toContainText("1.3s");
  await expect(page.locator("#ai-run-list")).toContainText("Completed:");
  await expect(page.locator("#ai-run-list")).toContainText("3 steps");
  await expect(page.locator("#ai-run-list")).toContainText("Not cancellable");
  await expect(page.locator("#ai-run-list")).not.toContainText("Important uploaded source");

  const requestsBeforeRefresh = runsRequested;
  showRefreshedRun = true;
  await page.locator("#ai-run-refresh").click();
  await expect.poll(() => runsRequested).toBeGreaterThan(requestsBeforeRefresh);
  await expect(page.locator("#ai-run-list")).toContainText("Knowledge Q&A");

  await page.locator("#ai-run-list .ai-run-row", { hasText: "Knowledge Q&A" }).getByRole("button", { name: "Details" }).click();
  await expect(page.locator("#ai-run-list")).toContainText("Spec");
  await expect(page.locator("#ai-run-list")).toContainText("source_mode");
  await expect(page.locator("#ai-run-list")).toContainText("Input tokens: 120");
  await expect(page.locator("#ai-run-list")).toContainText("RetrieverNode");
  await expect(page.locator("#ai-run-list")).not.toContainText("Important uploaded source should stay hidden");
});

test("workspace material generation failure refreshes AI run history", async ({ page }) => {
  await page.addInitScript(() => localStorage.clear());
  await routeWorkspace(page);

  const failedRun = {
    id: "run-material-failed",
    kind: "material_html_generation",
    status: "failed",
    started_at: "2026-06-07T03:00:00.000Z",
    completed_at: "2026-06-07T03:00:00.080Z",
    duration_ms: 80,
    retryable: true,
    cancellable: false,
    item_id: "",
    node_trace: [{ node: "MaterialParseNode", status: "failed" }],
    error: { code: "material_parse_failed", message: "Only HTML, Markdown, and plain text materials are supported in this beta." },
    material: { title: "private source", material_type: "unknown", text_chars: 0 },
  };
  let runsRequested = 0;

  await page.route("**/api/auth/status", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({ enabled: false, authenticated: true, user: null, data_id: null }),
    });
  });
  await page.route("**/api/ai/status", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({ available: false, provider: "", model: "", external_search: false }),
    });
  });
  await page.route("**/api/version", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({ version: "0.8.4", latest_version: "0.8.4", update_available: false }),
    });
  });
  await page.route("**/api/shares", async (route) => {
    await route.fulfill({ contentType: "application/json", body: JSON.stringify({ shares: [], count: 0 }) });
  });
  await page.route("**/api/manifest", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({ version: 2, title: "HTMlore Workspace", items: [] }),
    });
  });
  await page.route("**/api/ai/runs**", async (route) => {
    runsRequested += 1;
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({ runs: [failedRun], count: 1 }),
    });
  });
  await page.route("**/api/ai/material-runs", async (route) => {
    await route.fulfill({
      status: 400,
      contentType: "application/json",
      body: JSON.stringify({ detail: "Only HTML, Markdown, and plain text materials are supported in this beta." }),
    });
  });

  await page.goto("/workspace/", { waitUntil: "domcontentloaded" });
  await page.locator("#input-type").selectOption("file");
  await page.locator("#new-item-input").fill("Turn this private source into a note.");

  const fileChooserPromise = page.waitForEvent("filechooser");
  await page.locator("#new-item-form button[type='submit']").click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles({
    name: "private-source.pdf",
    mimeType: "application/pdf",
    buffer: Buffer.from("%PDF private uploaded source text", "utf8"),
  });

  await expect(page.locator("#new-feedback")).toContainText("Material note generation failed.");
  await expect.poll(() => runsRequested).toBeGreaterThan(0);

  await page.locator("#settings-open").click();
  await page.locator("[data-settings-tab='ai']").click();
  await expect(page.locator("#ai-run-list")).toContainText("Generated from uploaded material");
  await expect(page.locator("#ai-run-list")).toContainText("Failed");
  await expect(page.locator("#ai-run-list")).toContainText("Error:");
  await expect(page.locator("#ai-run-list")).toContainText("Retryable");
  await expect(page.locator("#ai-run-list")).toContainText("Not cancellable");
  await expect(page.locator("#ai-run-list")).toContainText("80ms");
  await expect(page.locator("#ai-run-list")).not.toContainText("private uploaded source text");
});

test("workspace note generation can select an existing note as reference style", async ({ page }) => {
  await page.addInitScript(() => localStorage.clear());
  await routeWorkspace(page);

  let conversationRequest = null;
  let generationRequest = null;
  const manifest = {
    version: 2,
    title: "HTMlore Workspace",
    items: [
      {
        id: "mcp.html",
        title: "MCP Security",
        summary: "Context note.",
        collection: "AI",
        tags: ["MCP"],
        source: "imported",
        created: "2026-06-07T00:00:00Z",
        updated: "2026-06-07T00:00:00Z",
        path: "content/mcp.html",
      },
      {
        id: "style.html",
        title: "Style Reference",
        summary: "Reference style note.",
        collection: "Design",
        tags: ["Style"],
        source: "imported",
        created: "2026-06-07T00:00:00Z",
        updated: "2026-06-07T00:00:00Z",
        path: "content/style.html",
      },
      {
        id: "archived-style.html",
        title: "Archived Style",
        summary: "Should not be offered.",
        collection: "Archive",
        tags: ["Style"],
        source: "imported",
        archived: true,
        created: "2026-06-07T00:00:00Z",
        updated: "2026-06-07T00:00:00Z",
        path: "content/archived-style.html",
      },
    ],
  };

  await page.route("**/api/auth/status", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({ enabled: false, authenticated: true, user: null, data_id: null }),
    });
  });
  await page.route("**/api/ai/status", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({ available: true, provider: "", model: "fake", external_search: false }),
    });
  });
  await page.route("**/api/version", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({ version: "0.8.4", latest_version: "0.8.4", update_available: false }),
    });
  });
  await page.route("**/api/shares", async (route) => {
    await route.fulfill({ contentType: "application/json", body: JSON.stringify({ shares: [], count: 0 }) });
  });
  await page.route("**/api/manifest", async (route) => {
    await route.fulfill({ contentType: "application/json", body: JSON.stringify(manifest) });
  });
  await page.route("**/api/ai/runs**", async (route) => {
    await route.fulfill({ contentType: "application/json", body: JSON.stringify({ runs: [], count: 0 }) });
  });
  await page.route("**/api/ai/conversations", async (route) => {
    conversationRequest = JSON.parse(route.request().postData() || "{}");
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({ conversation: { id: "conversation-reference-test", context_snapshot: conversationRequest.context, messages: [] } }),
    });
  });
  await page.route("**/api/ai/conversations/*/generate-note", async (route) => {
    generationRequest = JSON.parse(route.request().postData() || "{}");
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({
        run: { id: "run-reference-test", kind: "html_generation", status: "completed" },
        item: { id: "generated/reference-note.html", title: "Generated Reference Note" },
      }),
    });
  });

  await page.goto("/workspace/", { waitUntil: "domcontentloaded" });
  await page.locator("#ai-panel-open").click();
  await page.locator("#ai-generate-note").click();
  await expect(page.locator("#generate-reference-note")).toContainText("Style Reference");
  await expect(page.locator("#generate-reference-note")).not.toContainText("Archived Style");
  await expect(page.locator("#generate-share-hint")).toBeHidden();
  await page.locator("#generate-target-use").selectOption("share");
  await expect(page.locator("#generate-share-hint")).toBeVisible();
  await page.locator("#generate-reference-note").selectOption("style.html");
  await page.locator("#generate-note-submit").click();

  await expect(page.locator("#generate-note-feedback")).toContainText("Generated note: Generated Reference Note");
  expect(conversationRequest).not.toBeNull();
  expect(generationRequest).toMatchObject({
    target_use: "share",
    reference_style: "note",
    reference_note_id: "style.html",
  });
});
