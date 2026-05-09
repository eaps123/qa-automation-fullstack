import { test, expect } from '@playwright/test';
import env from '../../config/env';
import { ApiClient } from '../clients/apiClient';
import { ProductService } from '../services/ProductService';
import { ProductFactory } from '../factories/product.factory';
import { ProductSchema } from '../schemas/product.schema';

test.describe('Products API', () => {

  let client: ApiClient;
  let productService: ProductService;

  test.beforeEach(async () => {

    client = new ApiClient(
      env.api.fakeStore
    );

    await client.init();

    productService =
      new ProductService(client);
  });

  test.afterEach(async () => {
    await client.dispose();
  });

  test('GET - deve listar produtos', async () => {

    const response =
      await productService.getProducts();

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.length).toBeGreaterThan(0);

    ProductSchema.parse(body[0]);
  });

  test('POST - deve criar produto', async () => {

    const payload =
      ProductFactory.validProduct();

    const response =
      await productService.createProduct(payload);

    expect([200, 201]).toContain(
      response.status()
    );

    const body = await response.json();

    expect(body).toHaveProperty('id');

    ProductSchema.partial().parse(body);
  });

  test('PUT - deve atualizar produto', async () => {

    const payload =
      ProductFactory.validProduct({
        title: 'Produto Atualizado'
      });

    const response =
      await productService.updateProduct(
        1,
        payload
      );

    expect([200, 201]).toContain(
      response.status()
    );

    const body = await response.json();

    expect(body.title).toBe(
      'Produto Atualizado'
    );
  });

  test('DELETE - deve remover produto', async () => {

    const response =
      await productService.deleteProduct(1);

    expect([200, 204]).toContain(
      response.status()
    );
  });
});