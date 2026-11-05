import { defineConfig, devices } from "@playwright/test";
import { join } from "node:path";
export default defineConfig({
  testDir: ".", testMatch: "smoke.spec.ts", fullyParallel: false, workers: 1, retries: 0,
  timeout: 30_000, globalTimeout: 120_000, reporter: "line",
  outputDir: join(process.cwd(), ".accounts-validation", "ui06-smoke-output"),
  use: { ...devices["Desktop Chrome"], trace: "off", video: "off", screenshot: "off", launchOptions: process.env.HF_UI044_CHROMIUM ? { executablePath: process.env.HF_UI044_CHROMIUM } : {} },
});
