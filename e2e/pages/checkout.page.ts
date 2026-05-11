/* Responsável por:
- formulário checkout
- continuar fluxo
- finalizar
- mensagens */

import { Page, Locator } from '@playwright/test';
type CheckoutData = {
  firstName: string;
  lastName: string;
  postalCode: string;
};

export class CheckoutPage {
  constructor(private page: Page) {}

  // SELECTORS

  private readonly firstName =
    '#first-name';

  private readonly lastName =
    '#last-name';

  private readonly postalCode =
    '#postal-code';

  private readonly continueBtn =
    '#continue';

  private readonly finishBtn =
    '#finish';

  private readonly successMsg =
    '.complete-header';

  private readonly errorMsg =
    '[data-test="error"]';

  // ACTIONS

  async fillForm(checkoutData: CheckoutData) {
    await this.page.fill(
      this.firstName,
      checkoutData.firstName
    );

    await this.page.fill(
      this.lastName,
      checkoutData.lastName
    );

    await this.page.fill(
      this.postalCode,
      checkoutData.postalCode
    );
  }

  async continue() {
    await this.page.click(
      this.continueBtn
    );
  }

  async finish() {
    await this.page.click(
      this.finishBtn
    );
  }

  async startCheckoutFlow(
    checkoutData: CheckoutData
  ) {
    await this.fillForm(
      checkoutData
    );
    await this.continue();
  }

  // LOCATORS

  getSuccessMessage(): Locator {
    return this.page.locator(
      this.successMsg
    );
  }

  getErrorMessage(): Locator {
    return this.page.locator(
      this.errorMsg
    );
  }
}