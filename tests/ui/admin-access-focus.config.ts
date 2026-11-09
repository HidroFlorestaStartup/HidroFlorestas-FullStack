import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: ".",
  testMatch: "admin-access-focus.spec.ts",
  workers: 1,
  retries: 0,
  timeout: 30_000,
  use: {
    browserName: "chromium",
    headless: true,
    serviceWorkers: "block",
    trace: "off",
    screenshot: "off",
    video: "off",
  },
  outputDir: "../../test-results/admin-access-focus",
});
