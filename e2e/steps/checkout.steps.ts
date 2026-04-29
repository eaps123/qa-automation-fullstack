import { Given, When, Then } from '@cucumber/cucumber';
import { chromium, expect, Browser, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';

let browser: Browser;
let page: Page;
let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let checkoutPage: CheckoutPage;

Given('que estou logado na aplicação', async () => {
    browser = await chromium.launch();
    const context = await browser.newContext();
    page = await context.newPage();

    loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');

    inventoryPage = new InventoryPage(page);
    checkoutPage = new CheckoutPage(page);
});

When('adiciono um produto ao carrinho', async () => {
    await inventoryPage.addProduct();
});

When('vou para o carrinho', async () => {
    await inventoryPage.goToCart();
});

When('finalizo a compra com dados válidos', async () => {
    await checkoutPage.startCheckout();
    await checkoutPage.fillForm();
    await checkoutPage.continue();
    await checkoutPage.finish();
});

Then('devo ver a confirmação de compra', async () => {
    const success = await checkoutPage.getSuccessMessage();
    expect(await success.isVisible()).toBe(true);
    await browser.close();
});

When('tento finalizar a compra sem preencher dados', async () => {
    await checkoutPage.startCheckout();
    await checkoutPage.continue(); // sem preencher form
});

Then('devo ver uma mensagem de erro no checkout', async () => {
    const error = await checkoutPage.getErrorMessage();
    expect(await error.isVisible()).toBe(true);
    await browser.close();
});