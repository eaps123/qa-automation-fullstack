import { BrowserContext, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CartPage } from '../pages/CartPage';
import {
    setWorldConstructor,
    World
} from '@cucumber/cucumber';

export class CustomWorld extends World {
    page!: Page;
    context!: BrowserContext;
    loginPage!: LoginPage;
    inventoryPage!: InventoryPage;
    checkoutPage!: CheckoutPage;
    cartPage!: CartPage;
}

setWorldConstructor(CustomWorld);