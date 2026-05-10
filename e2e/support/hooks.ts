import {
  Before,
  After,
  setDefaultTimeout,
} from '@cucumber/cucumber';
import {
  chromium,
  firefox,
  webkit,
  Browser,
  BrowserContext,
  Page,
} from '@playwright/test';
import fs from 'fs';
import { CustomWorld } from './world';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CartPage } from '../pages/CartPage';

setDefaultTimeout(60 * 1000);

const browserTypes = {
  chromium,
  firefox,
  webkit,
};

Before(async function (this: CustomWorld) {
  const browserName =
    (process.env.BROWSER || 'chromium') as keyof typeof browserTypes;
  const browserLauncher = browserTypes[browserName];

  if (!browserLauncher) {
    throw new Error(
      `Browser inválido: ${browserName}. Use chromium, firefox ou webkit.`
    );
  }

  this.browser = await browserLauncher.launch({
    headless: !!process.env.CI,
  });

  const context: BrowserContext = await this.browser.newContext({
    viewport: {
      width: 1280,
      height: 720,
    },
    recordVideo: {
      dir: 'reports/videos/',
      size: {
        width: 1280,
        height: 720,
      },
    },
  });

  const page: Page = await context.newPage();
  this.page = page;
  this.context = context;
  this.loginPage = new LoginPage(page);
  this.inventoryPage = new InventoryPage(page);
  this.checkoutPage = new CheckoutPage(page);
  this.cartPage = new CartPage(page);
  fs.mkdirSync('reports/screenshots', {
    recursive: true,
  });
  fs.mkdirSync('reports/videos', {
    recursive: true,
  });
  console.log(`🌐 Browser iniciado: ${browserName}`);
});

After(async function (
  this: CustomWorld,
  scenario
) {
  const safeName = scenario.pickle.name.replace(
    /[^a-zA-Z0-9]/g,
    '_'
  );
  const screenshotPath =
    `reports/screenshots/${safeName}.png`;
  try {
    await this.page.screenshot({
      path: screenshotPath,
      fullPage: true,
    });
    console.log(
      `📸 Screenshot salvo: ${screenshotPath}`
    );

  } catch (error) {
    console.error(
      'Erro ao gerar screenshot:',
      error
    );
  }

  try {
    await this.context.close();
    await this.browser.close();
    console.log(
      '🎥 Context fechado e vídeo salvo'
    );
  } catch (error) {
    console.error(
      'Erro ao fechar context:',
      error
    );
  }
});