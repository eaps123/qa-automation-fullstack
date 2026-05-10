import { expect, Page } from '@playwright/test';

export async function waitForInventoryPage(page: Page) {
  await expect(page).toHaveURL(/inventory/);
}

export async function takeScreenshot(page: Page, fileName: string) {
  await page.screenshot({
    path: `reports/screenshots/${fileName}.png`,
    fullPage: true
  });
}