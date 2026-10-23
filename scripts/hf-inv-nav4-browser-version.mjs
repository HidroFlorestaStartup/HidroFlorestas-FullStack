import { chromium } from '@playwright/test';
import { writeFile, readFile } from 'node:fs/promises';

// Metadata only: no page, server, session or database is opened.
const browser = await chromium.launch();
try {
  const playwright = JSON.parse(await readFile('node_modules/@playwright/test/package.json', 'utf8'));
  await writeFile('docs/releases/2026-10-23-hf-inv-local01/nav4/browser-version.json', JSON.stringify({
    observedUtc: new Date().toISOString(), playwright: playwright.version,
    chromium: browser.version(), launchedHeadless: true, applicationPagesOpened: 0,
  }, null, 2) + '\n');
} finally { await browser.close(); }
