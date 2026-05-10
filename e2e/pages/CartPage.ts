import { Page, Locator } from '@playwright/test';

export class CartPage {

    constructor(private page: Page) { }

    private readonly checkoutButton =
        '#checkout';

    private readonly cartItem =
        '.cart_item';

    private readonly cartBadge =
        '.shopping_cart_badge';

    private readonly emptyCartMessage =
        '[data-test="error"]';

    async startCheckout() {
        await this.page.click(this.checkoutButton);
    }

    async getCartItemsCount() {
        return await this.page
            .locator(this.cartItem)
            .count();
    }

    getCartBadge(): Locator {
        return this.page.locator(this.cartBadge);
    }

    getEmptyCartMessage(): Locator {
        return this.page.locator(this.emptyCartMessage);
    }
}