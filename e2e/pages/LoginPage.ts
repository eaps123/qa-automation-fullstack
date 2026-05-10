import { Page } from '@playwright/test';
import environment from '../../config/env';
import { users } from '../../config/data/users';

export class LoginPage {
  constructor(private page: Page) {}

  private readonly usernameInput = '#user-name';
  private readonly passwordInput = '#password';
  private readonly loginBtn = '#login-button';
  private readonly errorMessage = '[data-test="error"]';

  async navigate() {
    await this.page.goto(environment.web.saucedemo, {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginBtn);
  }

  async loginAsStandardUser() {
    await this.login(
      users.standard.username,
      users.standard.password
    );
  }

  async loginWithInvalidPassword() {
    await this.login(
      users.standard.username,
      users.invalid.password
    );
  }

  getError() {
    return this.page.locator(this.errorMessage);
  }
}