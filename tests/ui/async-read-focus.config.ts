import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: ".",
  testMatch: "async-read-focus.spec.ts",
  workers: 1,
  retries: 0,
  timeout: 30_000,
  use: {
    headless: true,
    browserName: "chromium",
    serviceWorkers: "block",
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE }
      : {},
  },
  outputDir: "../../test-results/async-read-focus",
});
