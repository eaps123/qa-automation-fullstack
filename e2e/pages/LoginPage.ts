import { Page } from '@playwright/test';

export class LoginPage {
    constructor(private page: Page) { }

    private readonly username = '#user-name';
    private readonly password = '#password';
    private readonly loginBtn = '#login-button';
    private error = '[data-test="error"]';

    async navigate() {
        await this.page.goto('https://www.saucedemo.com/', {
            waitUntil: 'domcontentloaded',
            timeout: 60000
        });
    }

    async login(user: string, pass: string) {
        await this.page.fill(this.username, user);
        await this.page.fill(this.password, pass);
        await this.page.click(this.loginBtn);
    }
    getError() {
        return this.page.locator('[data-test="error"]');
    }
}