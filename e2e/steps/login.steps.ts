import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { users } from '../../config/data/users';

Given('que estou na página de login', async function () {
  await this.loginPage.navigate();
});

When('realizo login com credenciais válidas', async function () {
  await this.loginPage.login(
    users.standard.username,
    users.standard.password
  );
});

When('realizo login com senha inválida', async function () {
  await this.loginPage.login(
    users.locked.username,
    users.locked.password
  );
});

When('realizo login sem preencher credenciais', async function () {
  await this.loginPage.login('', '');
});

Then('devo ver a página de produtos', async function () {
  await expect(this.page).toHaveURL(/inventory/);
});

Then('devo ver uma mensagem de erro', async function () {
  await expect(
    this.loginPage.getError()
  ).toBeVisible();
});

Given('que estou logado na aplicação', async function () {
  await this.loginPage.navigate();
  await this.loginPage.login(
    users.standard.username,
    users.standard.password
  );

  await expect(this.page).toHaveURL(/inventory/);
});

Given('que não estou logado', async function () {
  await this.loginPage.navigate();
});

When('faço logout', async function () {
  await this.inventoryPage.openMenu();
  await this.inventoryPage.logout();
});

When('realizo login novamente', async function () {
  await this.loginPage.login(
    users.standard.username,
    users.standard.password
  );
});

Then('devo ser redirecionado para login', async function () {
  await expect(
    this.page.locator('[data-test="login-button"]')
  ).toBeVisible();
});