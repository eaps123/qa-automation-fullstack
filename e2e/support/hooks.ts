import {
  Before,
  After,
  setDefaultTimeout,
} from '@cucumber/cucumber';
import {
  chromium,
  firefox,
  webkit,
  BrowserContext,
  Page,
} from '@playwright/test';
import { CustomWorld } from './world';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CheckoutPage } from '../pages/checkout.page';
import { CartPage } from '../pages/cart.page';
import { ensureReportsFolders } from '../utils/helpers';

setDefaultTimeout(60 * 1000);

const browserTypes = {
  chromium,
  firefox,
  webkit,
};

Before(async function (this: CustomWorld) {
  ensureReportsFolders();
  const browserName = (
    process.env.BROWSER || 'chromium'
  ) as keyof typeof browserTypes;
  const browserLauncher =
    browserTypes[browserName];

  if (!browserLauncher) {
    throw new Error(
      `Browser inválido: ${browserName}. Use chromium, firefox ou webkit.`
    );
  }

  this.browser =
    await browserLauncher.launch({
      headless: !!process.env.CI,
    });

  const context: BrowserContext =
    await this.browser.newContext({
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

  const page: Page =
    await context.newPage();

  this.page = page;
  this.context = context;

  this.loginPage =
    new LoginPage(page);

  this.inventoryPage =
    new InventoryPage(page);

  this.checkoutPage =
    new CheckoutPage(page);

  this.cartPage =
    new CartPage(page);

  console.log(
    `🌐 Browser iniciado: ${browserName}`
  );
});

After(async function (
  this: CustomWorld,
  scenario
) {

  const safeName =
    scenario.pickle.name.replace(
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
    if (this.context) {
      await this.context.close();
    }
    if (this.browser) {
      await this.browser.close();
    }
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