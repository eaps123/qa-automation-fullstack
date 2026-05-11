import {
    setWorldConstructor,
    World,
  } from '@cucumber/cucumber';
  import {
    Browser,
    BrowserContext,
    Page,
  } from '@playwright/test';
  import { LoginPage } from '../pages/login.page';
  import { InventoryPage } from '../pages/inventory.page';
  import { CheckoutPage } from '../pages/checkout.page';
  import { CartPage } from '../pages/cart.page';
  
  export class CustomWorld extends World {
    browser?: Browser;
    context!: BrowserContext;
    page!: Page;
    loginPage!: LoginPage;
    inventoryPage!: InventoryPage;
    checkoutPage!: CheckoutPage;
    cartPage!: CartPage;
  }
  
  setWorldConstructor(CustomWorld);