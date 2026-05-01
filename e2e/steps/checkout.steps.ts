import { When, Then } from '@cucumber/cucumber';
import { expect, Route } from '@playwright/test';
import { CheckoutPage } from '../pages/CheckoutPage';
import { InventoryPage } from '../pages/InventoryPage';

let checkoutPage: CheckoutPage;
let inventoryPage: InventoryPage;

When('adiciono um produto ao carrinho', async function () {
    inventoryPage = new InventoryPage(this.page);
    await inventoryPage.addProduct();
});

When('adiciono o produto {string} {int} vezes', async function (produto, quantidade) {
    await this.page.waitForSelector('.inventory_item');
    const button = this.page.locator(`[data-test="add-to-cart-${produto}"]`);
    await expect(button).toBeVisible({ timeout: 10000 });
    for (let i = 0; i < quantidade; i++) {
        await button.click();
    }
});

When('vou para o carrinho', async function () {
    inventoryPage = new InventoryPage(this.page);
    await inventoryPage.goToCart();
});

When('vou para o carrinho sem produtos', async function () {
    inventoryPage = new InventoryPage(this.page);
    await inventoryPage.goToCart();
});

When('finalizo a compra com dados válidos', async function () {
    checkoutPage = new CheckoutPage(this.page);

    await checkoutPage.startCheckout();
    await checkoutPage.fillForm();
    await checkoutPage.continue();
    await checkoutPage.finish();
});

When('tento finalizar a compra', async function () {
    checkoutPage = new CheckoutPage(this.page);

    await checkoutPage.startCheckout();
    await checkoutPage.continue();
});

When('tento finalizar a compra sem preencher dados', async function () {
    checkoutPage = new CheckoutPage(this.page);

    await checkoutPage.startCheckout();
    await checkoutPage.continue();
});

When('tento acessar a página de checkout', async function () {
    await this.page.goto('https://www.saucedemo.com/checkout-step-one.html');
});

Then('devo ver a confirmação de compra', async function () {
    const success = await new CheckoutPage(this.page).getSuccessMessage();
    await expect(success).toBeVisible();
});

Then('devo ver uma mensagem de erro no checkout', async function () {
    const error = await new CheckoutPage(this.page).getErrorMessage();
    await expect(error).toBeVisible();
});

Then('devo ver uma mensagem de carrinho vazio', async function () {
    const error = await new CheckoutPage(this.page).getErrorMessage();
    await expect(error).toBeVisible();
});

Then('o carrinho deve refletir a quantidade correta', async function () {
    const badge = this.page.locator('.shopping_cart_badge');
    await expect(badge).toHaveText('2');
});