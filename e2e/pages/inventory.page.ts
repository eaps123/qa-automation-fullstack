import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  // SELECTORS

  private readonly addToCartBtn =
    '.inventory_item button';

  private readonly cartIcon =
    '.shopping_cart_link';

  private readonly cartBadge =
    '.shopping_cart_badge';

  private readonly menuBtn =
    '#react-burger-menu-btn';

  private readonly logoutBtn =
    '#logout_sidebar_link';

  // ACTIONS

  async addProduct() {
    await this.page.click(
      this.addToCartBtn
    );
  }

  async addProductById(
    productId: string
  ) {
    await this.page.click(`[data-test="add-to-cart-${productId}"]`);
  }

  async addMultipleProducts() {
    await this.addProductById(
      'sauce-labs-backpack'
    );
    await this.addProductById(
      'sauce-labs-bike-light'
    );
  }

  async goToCart() {
    await this.page.click(
      this.cartIcon
    );
  }

  async openMenu() {
    await this.page.click(
      this.menuBtn
    );
  }

  async logout() {
    await this.page.click(
      this.logoutBtn
    );
  }

  // LOCATORS

  getCartBadge(): Locator {
    return this.page.locator(
      this.cartBadge
    );
  }
}