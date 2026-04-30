import { test, expect } from '@playwright/test';
import { ApiClient } from '../services/apiClient';
import { ProductService } from '../services/ProductService';
import { AuthService } from '../services/AuthService';
import { CepService } from '../services/CepService';
import { CartService } from '../services/CartService';
import { CartFactory } from '../factories/cart.factory';
import { AuthFactory } from '../factories/auth.factory';

test.describe('API - Unified Layer', () => {

  let client: ApiClient;
  let productService: ProductService;
  let authService: AuthService;
  let cepService: CepService;
  let cartService: CartService;

  test.beforeAll(async () => {
    client = new ApiClient();
    await client.init();

    productService = new ProductService(client);
    cartService = new CartService(client);
    authService = new AuthService(client);
    cepService = new CepService(client);
  });

  // PRODUCTS
  test('GET - Deve retornar lista de produtos', async () => {
    const response = await productService.getProducts();

    expect([200, 201, 202]).toContain(response.status());

    const body = await response.json();
    expect(body.length).toBeGreaterThan(0);
  });

  // CART
  test('POST - Deve criar um carrinho válido', async () => {
    const response = await cartService.createCart(
      CartFactory.validCart()
    );

    expect([200, 201, 202]).toContain(response.status());

    const body = await response.json();
    expect(body).toHaveProperty('id');
  });

  test('POST - Deve aceitar payload inválido (mock)', async () => {
    const response = await cartService.createCart(
      CartFactory.invalidCart()
    );

    expect([200, 201, 202]).toContain(response.status());
  });

  // AUTH
  test('POST - Login inválido deve falhar', async () => {
    const response = await authService.login(
      AuthFactory.invalidUser()
    );

    expect([400, 401, 404]).toContain(response.status());

    const body = await response.json();
    expect(body).toHaveProperty('error');
  });

  // CEP
  test('GET - Deve buscar CEP válido', async () => {
    const response = await cepService.getCep('01001000');

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('city');
    expect(body).toHaveProperty('state');
  });

  test('GET - CEP inválido deve retornar erro', async () => {
    const response = await cepService.getCep('00000000');

    expect([400, 401, 404]).toContain(response.status());
  });

});