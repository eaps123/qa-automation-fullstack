import { expect } from '@playwright/test';
import {
  Given,
  When,
  Then
} from '@cucumber/cucumber';

Given('que estou na página de login', async function () {
  await this.loginPage.navigate();
});

When('eu faço login com usuário válido', async function () {
  await this.loginPage.loginAsStandardUser();
});

When('eu faço login com senha inválida', async function () {
  await this.loginPage.loginWithInvalidPassword();
});

Then('devo ver a página de produtos', async function () {
  await expect(this.page)
    .toHaveURL(/inventory/);
});

Then('devo ver uma mensagem de erro', async function () {
  await expect(
    this.loginPage.getError()
  ).toBeVisible();
});

Given('que estou logado na aplicação', async function () {
  await this.loginPage.navigate();
  await this.loginPage.loginAsStandardUser();
  await expect(this.page)
    .toHaveURL(/inventory/);
});

Given('que não estou logado', async function () {
  await this.loginPage.navigate();
});

When('faço logout', async function () {
  await this.inventoryPage.openMenu();
  await this.inventoryPage.logout();
});

When('realizo login novamente', async function () {
  await this.loginPage.loginAsStandardUser();
});

Then('devo ser redirecionado para login', async function () {
  await expect(
    this.page.locator('[data-test="login-button"]')
  ).toBeVisible();
});