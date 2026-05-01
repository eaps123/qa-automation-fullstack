import { Before, After, setDefaultTimeout, Status } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';

let browser: Browser;
let context: BrowserContext;
let page: Page;

setDefaultTimeout(60 * 1000);

Before(async function () {
    browser = await chromium.launch({ headless: process.env.CI ? true : false });
    const context = await browser.newContext({
        recordVideo: {
            dir: 'reports/videos/',
            size: { width: 1280, height: 720 }
        }
    });
    page = await context.newPage();
    this.page = page;
    this.context = context;
});

After(async function (scenario) {
    const safeName = scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, '_');
    const screenshot = await this.page.screenshot({
        path: `reports/screenshots/${safeName}.png`,
        fullPage: true
    });
    this.attach(screenshot, 'image/png');

    const video = this.page.video();
    if (video) {
        const videoPath = `reports/videos/${safeName}.webm`;
        await video.saveAs(videoPath);
    }

    await this.context.close();
    await browser.close();
});