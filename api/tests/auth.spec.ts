import { test, expect } from '@playwright/test';
import env from '../../config/env';
import { ApiClient } from '../clients/apiClient';
import { AuthService } from '../services/AuthService';
import { AuthFactory } from '../factories/auth.factory';
import { AuthSchema } from '../schemas/auth.schema';

test.describe('Auth API', () => {

  let client: ApiClient;
  let authService: AuthService;

  test.beforeEach(async () => {

    client = new ApiClient(
      env.api.dummy
    );
    await client.init();
    authService =
      new AuthService();
  });

  test.afterEach(async () => {
    await client.dispose();
  });

  test('POST - login válido', async () => {

    const response =
      await authService.login(
        AuthFactory.validUser()
      );

    expect(response.status()).toBe(200);

    const body = await response.json();

    AuthSchema.parse(body);
  });

  test('POST - login inválido', async () => {

    const response =
      await authService.login(
        AuthFactory.invalidUser()
      );

    expect([400, 401]).toContain(
      response.status()
    );
  });
});