import { Before, After, setDefaultTimeout, Status } from '@cucumber/cucumber';
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
});

After(async function (scenario) {
  const scenarioName = scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, '_');
  const timestamp = Date.now();
  // Screenshot (falha)
  if (scenario.result?.status === Status.FAILED) {
    const screenshotPath = `reports/screenshots/${scenarioName}_${timestamp}.png`;
    const screenshot = await this.page.screenshot({
      path: screenshotPath,
      fullPage: true
    });
    await this.attach(screenshot, 'image/png');
  }

  // Logs estruturados
  const log = {
    scenario: scenario.pickle.name,
    status: scenario.result?.status,
    url: this.page.url(),
    timestamp: new Date().toISOString()
  };

  await this.attach(JSON.stringify(log, null, 2), 'application/json');
  // Vídeo
  const video = this.page.video();

  if (video) {
    const videoPath = await video.path();
    // garante que o arquivo existe antes de anexar
    if (fs.existsSync(videoPath)) {
      const videoBuffer = fs.readFileSync(videoPath);
      await this.attach(videoBuffer, 'video/webm');
    }
  }

  await context.close();
  await browser.close();
});