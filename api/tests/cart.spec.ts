import { test, expect } from '@playwright/test';
import env from '../../config/env';
import { ApiClient } from '../clients/apiClient';
import { CartService } from '../services/CartService';
import { CartFactory } from '../factories/cart.factory';
import { CartSchema } from '../schemas/cart.schema';

test.describe('Cart API', () => {

  let client: ApiClient;
  let cartService: CartService;

  test.beforeEach(async () => {

    client = new ApiClient(
      env.api.fakeStore
    );

    await client.init();
    cartService = new CartService(client);
  });

  test.afterEach(async () => {
    await client.dispose();
  });

  test('POST - deve criar carrinho', async () => {

    const payload =
      CartFactory.validCart();

    const response =
      await cartService.createCart(payload);

    expect([200, 201]).toContain(
      response.status()
    );

    const body = await response.json();

    CartSchema.partial().parse(body);
  });

  test('POST - payload inválido', async () => {

    const response =
      await cartService.createCart(
        CartFactory.invalidCart()
      );

    expect([400, 422]).toContain(
      response.status()
    );
  });
});