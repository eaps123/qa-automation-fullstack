import { Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  private checkoutBtn = '#checkout';
  private firstName = '#first-name';
  private lastName = '#last-name';
  private postalCode = '#postal-code';
  private continueBtn = '#continue';
  private finishBtn = '#finish';
  private successMsg = '.complete-header';
  private errorMsg = '[data-test="error"]';

  async startCheckout() {
    await this.page.click(this.checkoutBtn);
  }

  async fillForm() {
    await this.page.fill(this.firstName, 'Everton');
    await this.page.fill(this.lastName, 'QA');
    await this.page.fill(this.postalCode, '12345');
  }

  async continue() {
    await this.page.click(this.continueBtn);
  }

  async finish() {
    await this.page.click(this.finishBtn);
  }

  async getSuccessMessage() {
    return this.page.locator(this.successMsg);
  }

  async getErrorMessage() {
    return this.page.locator(this.errorMsg);
  }
}