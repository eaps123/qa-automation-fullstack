import {
  Given,
  When,
  Then
} from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { users } from '../../config/data/users';

Given('que estou na página de login', async function () {
  await this.loginPage.navigate();
});

// LOGIN GENÉRICO

When('realizo login com usuário {string}', async function (userType: string) {
  const user =
    users[userType as keyof typeof users];
  await this.loginPage.login(
    user.username,
    user.password
  );
}
);

When('realizo login com usuário {string} e senha {string}', async function (
  username: string,
  password: string
) {
  await this.loginPage.login(
    username,
    password
  );
}
);

// ASSERTS

Then('devo ver a página de produtos', async function () {
  await expect(this.page)
    .toHaveURL(/inventory/);
}
);

Then('devo ver a mensagem {string}', async function (message: string) {
  await expect(
    this.loginPage.getError()
  ).toBeVisible();

  await expect(
    this.loginPage.getError()
  ).toContainText(message);
});

// LOGIN APP

Given('que estou logado na aplicação', async function () {
  await this.loginPage.navigate();
  await this.loginPage.login(
    users.standard.username,
    users.standard.password
  );
  await expect(this.page)
    .toHaveURL(/inventory/);
}
);

Given('que não estou logado', async function () {
  await this.loginPage.navigate();
}
);

// LOGOUT

When('faço logout', async function () {
  await this.inventoryPage.openMenu();
  await this.inventoryPage.logout();
}
);

When('realizo login novamente', async function () {
  await this.loginPage.login(
    users.standard.username,
    users.standard.password
  );
}
);

Then('devo ser redirecionado para login', async function () {
  await expect(
    this.page.locator(
      '[data-test="login-button"]'
    )
  ).toBeVisible();
}
);