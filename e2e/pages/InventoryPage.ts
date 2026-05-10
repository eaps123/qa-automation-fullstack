import { Page } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  private readonly addToCartBtn = '.inventory_item button';
  private readonly cartIcon = '.shopping_cart_link';

  private readonly backpackBtn =
    '[data-test="add-to-cart-sauce-labs-backpack"]';

  private readonly bikeLightBtn =
    '[data-test="add-to-cart-sauce-labs-bike-light"]';

  private readonly cartBadge =
    '.shopping_cart_badge';

  private readonly menuBtn =
    '#react-burger-menu-btn';

  private readonly logoutBtn =
    '#logout_sidebar_link';

  async addProduct() {
    await this.page.click(this.addToCartBtn);
  }

  async addMultipleProducts() {
    await this.page.click(this.backpackBtn);
    await this.page.click(this.bikeLightBtn);
  }

  async goToCart() {
    await this.page.click(this.cartIcon);
  }

  async openMenu() {
    await this.page.click(this.menuBtn);
  }

  async logout() {
    await this.page.click(this.logoutBtn);
  }

  getCartBadge() {
    return this.page.locator(this.cartBadge);
  }
}