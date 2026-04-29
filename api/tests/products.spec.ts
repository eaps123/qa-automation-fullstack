import { test, expect, request } from '@playwright/test';

test.describe('API - Products', () => {

  let apiContext;

  const BASE_FAKESTORE = 'https://fakestoreapi.com';
  const BASE_REQRES = 'https://reqres.in/api';
  const BASE_BRASILAPI = 'https://brasilapi.com.br/api';

  test.beforeAll(async () => {
    apiContext = await request.newContext({
      extraHTTPHeaders: {
        'Accept': 'application/json',
        'User-Agent': 'qa-automation'
      }
    });
  });

  test('GET - Deve retornar lista de produtos', async () => {
    const response = await apiContext.get(`${BASE_FAKESTORE}/products`);
    const status = response.status();
    expect([200, 201, 202]).toContain(status);
    const body = await response.json();
    expect(body.length).toBeGreaterThan(0);
  });

  test('POST - Deve criar um carrinho', async () => {
    const payload = {
      userId: 1,
      date: '2024-01-01',
      products: [
        { productId: 1, quantity: 2 }
      ]
    };

    const response = await apiContext.post(`${BASE_FAKESTORE}/carts`, {
      data: payload
    });

    const status = response.status();

    expect([200, 201, 202]).toContain(status);

    const body = await response.json();
    expect(body).toHaveProperty('id');
  });

  test('POST - API mock aceita payload inválido', async () => {
    const response = await apiContext.post(`${BASE_FAKESTORE}/carts`, {
      data: {}
    });
    const status = response.status();
    expect([200, 201, 202]).toContain(status);
  });

  test('POST - Login inválido deve falhar', async () => {
    const response = await apiContext.post(`${BASE_REQRES}/login`, {
      data: {
        email: "peter@klaven"
      }
    });
    expect([400, 401, 404]).toContain(response.status());
    const body = await response.json();
    expect(body).toHaveProperty('error');
  });

  test('GET - Deve buscar CEP válido', async () => {
    const response = await apiContext.get(
      `${BASE_BRASILAPI}/cep/v1/01001000`
    );
    const status = response.status();
    expect(status).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('city');
    expect(body).toHaveProperty('state');
  });

  test('GET - CEP inválido deve retornar erro', async () => {
    const response = await apiContext.get(
      `${BASE_BRASILAPI}/cep/v1/00000000`
    );
    expect([400, 401, 404]).toContain(response.status());
  });

});