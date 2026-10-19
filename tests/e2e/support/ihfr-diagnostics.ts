import { test as base, expect } from "@playwright/test";
import { redactImp006Diagnostics } from "../../../scripts/imp006-gate-diagnostics";

// Observe the existing tests without changing readiness, actions or assertions.
// Headers, cookies, response bodies and traces are deliberately never recorded.
export const test = base.extend<{ ihfrDiagnostics: void }>({
  ihfrDiagnostics: [async ({ page }, use, info) => {
    const navigation: Array<{ path: string; status: number }> = [];
    const errors: string[] = [];
    const assets: Array<{ path: string; status?: number; failure?: string }> = [];
    const path = (value: string) => { const url = new URL(value); return ["http:", "https:"].includes(url.protocol) ? url.pathname : "<non-http>"; };
    const recordError = (message: string) => { if (errors.length < 100) errors.push(redactImp006Diagnostics(message, process.env).slice(0, 2_000)); };
    page.on("response", response => {
      if (response.request().isNavigationRequest() && response.frame() === page.mainFrame()) {
        if (navigation.length < 100) navigation.push({ path: path(response.url()), status: response.status() });
      }
      if (response.request().resourceType() === "script" && response.status() >= 400 && assets.length < 100) assets.push({ path: path(response.url()), status: response.status() });
    });
    page.on("requestfailed", request => {
      if (["script", "document"].includes(request.resourceType()) && assets.length < 100) assets.push({ path: path(request.url()), failure: redactImp006Diagnostics(request.failure()?.errorText ?? "request_failed", process.env) });
    });
    page.on("pageerror", error => recordError(error.message));
    page.on("console", message => { if (["error", "warning"].includes(message.type())) recordError(`console: ${message.text()}`); });
    await use();
    if (info.status === info.expectedStatus) return;
    const state = await page.evaluate(() => ({
      path: location.pathname,
      ready: document.readyState,
      login: !!document.querySelector('input[type="password"]'),
      occurrence: !!document.getElementById("collection-time-zone"),
      regions: Array.from(document.querySelectorAll('section[aria-labelledby], [role="region"]')).slice(0, 20).map(node => {
        const rect = node.getBoundingClientRect(), style = getComputedStyle(node);
        return { name: node.getAttribute("aria-label") ?? node.getAttribute("aria-labelledby")?.split(/\s+/).map(id => document.getElementById(id)?.textContent).join(" "), hiddenAncestor: node.closest('[hidden], [aria-hidden="true"], [inert]')?.id ?? null, display: style.display, visibility: style.visibility, width: rect.width, height: rect.height };
      }),
    })).catch(() => ({ unavailable: true }));
    const safe = redactImp006Diagnostics(JSON.stringify({ test: info.title, status: info.status, navigation, assets, errors, state }), process.env);
    console.log(`IMP-006 browser diagnostic: ${safe}`);
    await info.attach("ihfr-navigation", { body: safe, contentType: "application/json" });
  }, { auto: true }],
});

export { expect };
