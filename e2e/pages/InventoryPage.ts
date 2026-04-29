import { Page } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  private addToCartBtn = '.inventory_item button';
  private cartIcon = '.shopping_cart_link';

  async addProduct() {
    await this.page.click(this.addToCartBtn);
  }

  async goToCart() {
    await this.page.click(this.cartIcon);
  }
}