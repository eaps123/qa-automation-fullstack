import {
  Before,
  After,
  setDefaultTimeout
} from '@cucumber/cucumber';
import {
  chromium,
  Browser,
  BrowserContext,
  Page
} from '@playwright/test';
import fs from 'fs';
import { CustomWorld } from './world';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CartPage } from '../pages/CartPage';

let browser: Browser;
let context: BrowserContext;
let page: Page;

setDefaultTimeout(60 * 1000);

Before(async function (this: CustomWorld) {
  browser = await chromium.launch({
    headless: process.env.CI ? true : false
  });
  context = await browser.newContext({
    recordVideo: {
      dir: 'reports/videos/',
      size: {
        width: 1280,
        height: 720
      }
    }
  });
  page = await context.newPage();
  this.page = page;
  this.context = context;
  this.loginPage = new LoginPage(page);
  this.inventoryPage = new InventoryPage(page);
  this.checkoutPage = new CheckoutPage(page);
  this.cartPage = new CartPage(page);
  fs.mkdirSync('reports/screenshots', {
    recursive: true
  });
  fs.mkdirSync('reports/videos', {
    recursive: true
  });
});

After(async function (
  this: CustomWorld,
  scenario
) {
  const safeName = scenario.pickle.name
    .replace(/[^a-zA-Z0-9]/g, '_');
  const scenarioStatus =
    scenario.result?.status || 'UNKNOWN';

  try {
    await this.page.screenshot({
      path:
        `reports/screenshots/${safeName}-${scenarioStatus}.png`,
      fullPage: true
    });
    console.log(
      `📸 Screenshot salvo: ${safeName}-${scenarioStatus}`
    );

  } catch (err) {
    console.error(
      'Erro ao gerar screenshot:',
      err
    );
  }

  try {
    await this.context?.close();
    console.log('🎥 Vídeo gerado');
  } catch (err) {
    console.error(
      'Erro ao fechar contexto:',
      err
    );
  }
  await browser?.close();
});