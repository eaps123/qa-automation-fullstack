import { chromium, expect, Browser, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';

setDefaultTimeout(60 * 1000); // 60 segundos

let browser: Browser;
let loginPage: LoginPage;

Given('que estou na página de login', async function () {
  browser = await chromium.launch({
    headless: false,
    slowMo: 100
  });
  const context = await browser.newContext();
  this.page = await context.newPage();
  loginPage = new LoginPage(this.page);

  await loginPage.navigate();
});

When('eu faço login com usuário válido', async function () {
  await loginPage.login('standard_user', 'secret_sauce');
});

When('eu faço login com senha inválida', async function () {
  await loginPage.login('standard_user', 'wrong_password');
});

Then('devo ver a página de produtos', async function ()  {
  await expect(this.page).toHaveURL(/inventory/);
  await browser.close();
});

Then('devo ver uma mensagem de erro', async function () {
  const error = loginPage.getError();
  await expect(error).toBeTruthy();
  await browser.close();
});