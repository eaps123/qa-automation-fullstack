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

  // Garante que pastas existem
  fs.mkdirSync('reports/screenshots', { recursive: true });
  fs.mkdirSync('reports/videos', { recursive: true });
});

After(async function (scenario) {
  const safeName = scenario.pickle.name
    .replace(/[^a-zA-Z0-9]/g, '_')
    .toLowerCase();

  try {
    // 📸 Screenshot (mais leve)
    const screenshot = await this.page.screenshot({
      path: `reports/screenshots/${safeName}.png`,
      fullPage: false
    });

    this.attach(screenshot, 'image/png');

    // 🎥 pega referência do vídeo ANTES de fechar
    const video = this.page.video();

    // 🔥 FECHA CONTEXTO PRIMEIRO (ESSENCIAL)
    await this.context.close();

    // 🎥 agora salva o vídeo com proteção contra travamento
    if (video) {
      const videoPath = `reports/videos/${safeName}.webm`;

      await Promise.race([
        video.saveAs(videoPath),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Video save timeout')), 15000)
        )
      ]);
    }

  } catch (err) {
    console.error('Erro no After hook:', err);
  } finally {
    await browser.close();
  }
});