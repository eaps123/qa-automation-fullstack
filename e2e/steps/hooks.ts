import { Before, After, setDefaultTimeout, Status } from '@cucumber/cucumber';
import { chromium, Browser, Page } from '@playwright/test';

let browser: Browser;
let page: Page;

setDefaultTimeout(60 * 1000);

Before(async function () {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    page = await context.newPage();
    this.page = page;
});

After(async function (scenario) {
    if (scenario.result?.status === Status.FAILED) {
        const screenshot = await this.page.screenshot({
            path: `reports/screenshots/${scenario.pickle.name}.png`,
            fullPage: true
        });
        this.attach(screenshot, 'image/png');
    }
    await browser.close();
});