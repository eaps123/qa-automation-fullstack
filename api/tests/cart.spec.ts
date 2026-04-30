import { test, expect } from '@playwright/test';
import { ApiClient } from '../services/apiClient';
import { CartService } from '../services/CartService';
import { CartFactory } from '../factories/cart.factory';

test.describe('API - Cart', () => {

  let client: ApiClient;
  let cartService: CartService;

  test.beforeAll(async () => {
    client = new ApiClient();
    await client.init();

    cartService = new CartService(client);
  });

  test('POST - Deve criar um carrinho válido', async () => {
    const response = await cartService.createCart(
        CartFactory.validCart()
      );

    expect([200, 201, 202]).toContain(response.status());

    const body = await response.json();
    expect(body).toHaveProperty('id');
  });

  test('POST - Deve aceitar payload vazio (mock behavior)', async () => {
    const response = await cartService.createCart({});

    expect([200, 201, 202]).toContain(response.status());
  });

  test('GET - Deve buscar carrinho por ID', async () => {
    const response = await cartService.getCart(1);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('id');
  });

});