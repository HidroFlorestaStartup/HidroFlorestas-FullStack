import { defineConfig } from "@playwright/test";
import { join } from "node:path";
import guarded from "../../playwright.config";
const suite = process.env.HF_UI044_SUITE;
if (suite !== "shell" && suite !== "domain") throw new Error("Explicit HF_UI044_SUITE required");
export default defineConfig({ ...guarded,
  testDir: ".", testMatch: `${suite}.spec.ts`, testIgnore: [],
  fullyParallel: false, workers: 1, retries: 0, globalTimeout: 1_440_000,
  outputDir: join(process.cwd(), ".accounts-validation", `ui06-${suite}-output`),
  reporter: "line", use: { ...guarded.use, trace: "off", video: "off", screenshot: "off" },
});
