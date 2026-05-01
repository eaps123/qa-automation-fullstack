import { test, expect } from '@playwright/test';
import { ApiClient } from '../services/apiClient';
import { AuthService } from '../services/AuthService';

test.describe('API - Auth', () => {

  let client: ApiClient;
  let authService: AuthService;

  test.beforeAll(async () => {
    client = new ApiClient();
    await client.init();

    authService = new AuthService(client);
  });

  test('POST - Login válido', async () => {
    const response = await authService.login({
      email: 'eve.holt@reqres.in',
      password: 'cityslicka'
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('token');
  });

  test('POST - Login inválido deve falhar', async () => {
    const response = await authService.login({
      email: 'peter@klaven'
    });

    expect([400, 401]).toContain(response.status());

    const body = await response.json();
    expect(body).toHaveProperty('error');
  });

});