import { test, expect } from '@playwright/test';
import env from '../../config/env';
import { ApiClient } from '../clients/apiClient';
import { CepService } from '../services/CepService';

test.describe('CEP API', () => {

  let client: ApiClient;
  let cepService: CepService;

  test.beforeEach(async () => {

    client = new ApiClient(
      env.api.brasilApi
    );

    await client.init();

    cepService = new CepService(client);
  });

  test.afterEach(async () => {
    await client.dispose();
  });

  test('GET - deve buscar CEP válido', async () => {

    const response =
      await cepService.getCep(
        '01001000'
      );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toHaveProperty('city');

    expect(body).toHaveProperty('state');
  });

  test('GET - CEP inválido', async () => {

    const response =
      await cepService.getCep(
        '00000000'
      );

    expect([400, 404]).toContain(
      response.status()
    );
  });
});