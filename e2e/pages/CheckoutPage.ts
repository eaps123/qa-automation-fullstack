import { Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  private readonly checkoutBtn = '#checkout';
  private readonly firstName = '#first-name';
  private readonly lastName = '#last-name';
  private readonly postalCode = '#postal-code';
  private readonly continueBtn = '#continue';
  private readonly finishBtn = '#finish';
  private readonly successMsg = '.complete-header';
  private readonly errorMsg = '[data-test="error"]';

  async startCheckout() {
    await this.page.click(this.checkoutBtn);
  }

  async fillForm(checkoutData) {
    await this.page.fill(this.firstName, checkoutData.firstName);
    await this.page.fill(this.lastName, checkoutData.lastName);
    await this.page.fill(this.postalCode, checkoutData.postalCode);
  }

  async continue() {
    await this.page.click(this.continueBtn);
  }

  async finish() {
    await this.page.click(this.finishBtn);
  }

  async finishCheckout(checkoutData) {
    await this.startCheckout();
    await this.fillForm(checkoutData);
    await this.continue();
    await this.finish();
  }

  getSuccessMessage() {
    return this.page.locator(this.successMsg);
  }

  getErrorMessage() {
    return this.page.locator(this.errorMsg);
  }
}