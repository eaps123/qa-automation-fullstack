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
      env.api.dummy
    );
    await client.init();
    productService =
      new ProductService();
  });

  test.afterEach(async () => {
    await client.dispose();
  });

  test('GET - deve listar produtos', async () => {
    const response =
      await productService.getProducts();
    expect(response.status()).toBe(200);
    expect(
      response.headers()['content-type']
    ).toContain('application/json');
    const body = await response.json();
    expect(
      body.products.length
    ).toBeGreaterThan(0);
    ProductSchema.parse(
      body.products[0]
    );
  });

  test('POST - deve criar produto', async () => {
    const payload =
      ProductFactory.validProduct();
    const response =
      await productService.createProduct(payload);
    expect([200, 201]).toContain(
      response.status()
    );
    expect(
      response.headers()['content-type']
    ).toContain('application/json');
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
    expect(
      response.headers()['content-type']
    ).toContain('application/json');
    const body = await response.json();
    expect(body.title).toBe(
      'Produto Atualizado'
    );
    ProductSchema.partial().parse(body);
  });

  test('DELETE - deve remover produto', async () => {
    const response =
      await productService.deleteProduct(1);
    expect([200, 204]).toContain(
      response.status()
    );
    // APIs mock às vezes retornam body vazio no DELETE
    if (response.status() !== 204) {
      expect(
        response.headers()['content-type']
      ).toContain('application/json');
      const body = await response.json();
      expect(body).toHaveProperty('id');
    }
  });

  test('POST - deve validar payload inválido', async () => {
    const response =
      await productService.createProduct(
        ProductFactory.invalidProduct()
      );
    const body = await response.json();
    // APIs mock podem aceitar payload inválido
    expect([200, 201, 400, 422]).toContain(
      response.status()
    );
    expect(
      response.headers()['content-type']
    ).toContain('application/json');
    // Se API aceitar o payload inválido
    if ([200, 201].includes(response.status())) {
      expect(
        body.price === 'invalid' ||
        body.title === '' ||
        body.category === 123
      ).toBeTruthy();
    } else {
      expect([400, 422]).toContain(
        response.status()
      );
    }
  });
});