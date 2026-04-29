import { expect } from '../support/expect';
import { LoginPage } from '../pages/LoginPage';
import { Given, When, Then } from '@cucumber/cucumber';

let loginPage: LoginPage;

Given('que estou na página de login', async function () {
  loginPage = new LoginPage(this.page);
  await loginPage.navigate();
});

When('eu faço login com usuário válido', async function () {
  await loginPage.login('standard_user', 'secret_sauce');
});

When('eu faço login com senha inválida', async function () {
  await loginPage.login('standard_user', 'wrong_password');
});

Then('devo ver a página de produtos', async function () {
  await expect(this.page).toHaveURL(/inventory/);
});

Then('devo ver uma mensagem de erro', async function () {
  const error = loginPage.getError();
  await error.waitFor();
  expect(await error.isVisible()).toBe(true);
});