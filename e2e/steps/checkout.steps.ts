import { expect } from '@playwright/test';
import environment from '../../config/env';
import {
    When,
    Then
} from '@cucumber/cucumber';
import { CheckoutFactory } from '../factories/checkout.factory';

When('adiciono um produto ao carrinho', async function () {
    await this.inventoryPage.addProduct();
}
);

When('adiciono múltiplos produtos ao carrinho', async function () {
    await this.inventoryPage.addMultipleProducts();
}
);

When('vou para o carrinho', async function () {
    await this.inventoryPage.goToCart();
}
);

When('acesso o carrinho sem produtos', async function () {
    await this.inventoryPage.goToCart();
}
);

// CHECKOUT

When('finalizo a compra com dados válidos', async function () {
    const checkoutData =
        CheckoutFactory.validCheckout();
    await this.cartPage.startCheckout();
    await this.checkoutPage.startCheckoutFlow(
        checkoutData
    );
    await this.checkoutPage.finish();
}
);

When('finalizo a compra sem preencher dados obrigatórios', async function () {
    const checkoutData =
        CheckoutFactory.invalidCheckout();
    await this.cartPage.startCheckout();
    await this.checkoutPage.startCheckoutFlow(
        checkoutData
    );
}
);

When('tento finalizar a compra', async function () {
    await this.cartPage.startCheckout();
    await this.checkoutPage.continue();
}
);

When('tento acessar a página de checkout', async function () {
    await this.page.goto(
        `${environment.web.saucedemo}/checkout-step-one.html`
    );
}
);

// ASSERTS

Then('devo ver a confirmação de compra', async function () {
    await expect(
        this.checkoutPage.getSuccessMessage()
    ).toBeVisible();
}
);

Then('devo ver uma mensagem de erro no checkout', async function () {
    await expect(
        this.checkoutPage.getErrorMessage()
    ).toBeVisible();
}
);

Then('devo ver uma mensagem de carrinho vazio', async function () {
    await expect(
        this.checkoutPage.getErrorMessage()
    ).toBeVisible();
}
);

Then('o carrinho deve refletir {string} produtos', async function (quantity: string) {
    await expect(
        this.inventoryPage.getCartBadge()
    ).toHaveText(quantity);
}
);