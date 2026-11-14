import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: ".", testMatch: "ui-presentation.spec.ts", workers: 1, retries: 0,
  timeout: 30_000,
  use: {
    headless: true, browserName: "chromium", locale: "pt-BR", timezoneId: "America/Fortaleza",
    serviceWorkers: "block",
    screenshot: "only-on-failure",
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE } : {},
  },
  outputDir: "../../test-results/ui-presentation",
});
