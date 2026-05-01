import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';

let browser: Browser;
let context: BrowserContext;
let page: Page;

setDefaultTimeout(60 * 1000);

Before(async function () {
    browser = await chromium.launch({
        headless: process.env.CI ? true : false
    });

    context = await browser.newContext({
        recordVideo: {
            dir: 'reports/videos/',
            size: { width: 1280, height: 720 }
        }
    });

    page = await context.newPage();

    this.page = page;
    this.context = context;
    fs.mkdirSync('reports/screenshots', { recursive: true });
    fs.mkdirSync('reports/videos', { recursive: true });
});

After(async function (scenario) {
    try {
        const safeName = scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, '_');

        const screenshot = await this.page.screenshot({
            path: `reports/screenshots/${safeName}.png`,
            fullPage: true
        });

        this.attach(screenshot, 'image/png');

    } catch (err) {
        console.error(err);
    } finally {
        await this.context?.close();
        await browser?.close();
    }
});