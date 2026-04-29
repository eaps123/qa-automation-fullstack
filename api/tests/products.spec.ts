import { test, expect, request } from '@playwright/test';

test.describe('API - Products', () => {

  let apiContext;

  test.beforeAll(async () => {
    apiContext = await request.newContext({
      baseURL: 'https://fakestoreapi.com'
    });
  });

  test('GET - Deve retornar lista de produtos', async () => {
    const response = await apiContext.get('/products');
    const status = response.status();
    expect(status).toBeGreaterThanOrEqual(200);
    expect(status).toBeLessThan(300);
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
    const response = await apiContext.post('/carts', { data: payload });
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body).toHaveProperty('id');
  });

  test('POST - API mock aceita payload inválido', async () => {
    const response = await apiContext.post('/carts', { data: {} });
    expect(response.status()).toBe(201);
  });

  test('POST - Login inválido deve falhar', async () => {
    const response = await apiContext.post('https://reqres.in/api/login', {
      data: {
        email: "peter@klaven"
      }
    });
    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body).toHaveProperty('error');
  });

  test('GET - Deve buscar CEP válido', async () => {
    const response = await apiContext.get('https://brasilapi.com.br/api/cep/v1/01001000');

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('city');
    expect(body).toHaveProperty('state');
  });

  test('GET - CEP inválido deve retornar erro', async () => {
    const response = await apiContext.get('https://brasilapi.com.br/api/cep/v1/00000000');

    expect(response.status()).toBe(404);
  });
});