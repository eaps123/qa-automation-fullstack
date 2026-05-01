import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let checkoutPage: CheckoutPage;

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

Given('que estou logado na aplicação', async function () {
  loginPage = new LoginPage(this.page);
  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');

  inventoryPage = new InventoryPage(this.page);
  checkoutPage = new CheckoutPage(this.page);
});

Given('que não estou logado', async function () {
  loginPage = new LoginPage(this.page);
  await loginPage.navigate();
});

When('faço logout', async function () {
  await inventoryPage.openMenu();
  await inventoryPage.logout();
});

When('realizo login novamente', async function () {
  await loginPage.login('standard_user', 'secret_sauce');
});

Then('devo ser redirecionado para login', async function () {
  await expect(this.page.locator('[data-test="login-button"]')).toBeVisible();
});