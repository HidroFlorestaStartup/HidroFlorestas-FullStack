import { defineConfig } from "@playwright/test";
import isolated from "./playwright.imp006.config";

// Fault-injection controls run explicitly; the official six scenarios are unchanged.
export default defineConfig({ ...isolated, testDir: "./tests/experiments", testMatch: "ihfr-initialization-controls.spec.ts" });
