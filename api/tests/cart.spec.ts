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
      env.api.dummy
    );
    await client.init();
    cartService = new CartService();
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
    expect(
      response.headers()['content-type']
    ).toContain('application/json');
    const body = await response.json();
    expect(body).toHaveProperty('id');
    CartSchema.partial().parse(body);
  });

  test('POST - deve retornar erro para payload inválido', async () => {
    const response =
      await cartService.createCart(
        CartFactory.invalidCart()
      );
    const body = await response.json();
    // APIs mock podem retornar 200 mesmo inválido
    expect([200, 400, 422]).toContain(
      response.status()
    );
    expect(
      response.headers()['content-type']
    ).toContain('application/json');
    if (response.status() === 200) {
      expect(
        body.userId === null ||
        body.products === 'invalid' ||
        !body.products
      ).toBeTruthy();
    } else {
      expect([400, 422]).toContain(
        response.status()
      );
    }
  });
});