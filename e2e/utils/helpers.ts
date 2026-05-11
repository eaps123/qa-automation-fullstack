import { expect, Page } from '@playwright/test';
import fs from 'fs';

export async function waitForInventoryPage(page: Page) {
  await expect(page).toHaveURL(/inventory/);
}

export async function takeScreenshot(
  page: Page,
  fileName: string
) {
  await page.screenshot({
    path: `reports/screenshots/${fileName}.png`,
    fullPage: true
  });
}

export function ensureReportsFolders() {

  fs.mkdirSync(
    'reports/screenshots',
    { recursive: true }
  );

  fs.mkdirSync(
    'reports/videos',
    { recursive: true }
  );
}