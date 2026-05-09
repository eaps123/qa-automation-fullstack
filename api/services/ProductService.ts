import env from '../../config/env';
import { ApiClient } from '../clients/apiClient';

export class ProductService {
  private client: ApiClient;

  constructor() {
    this.client = new ApiClient(env.api.fakeStore);
  }

  async getProducts() {
    await this.client.init();
    return this.client.get('/products');
  }

  async getProductById(id: number) {
    await this.client.init();
    return this.client.get(`/products/${id}`);
  }

  async createProduct(payload: unknown) {
    await this.client.init();
    return this.client.post('/products', payload);
  }

  async updateProduct(id: number, payload: unknown) {
    await this.client.init();
    return this.client.put(`/products/${id}`, payload);
  }

  async deleteProduct(id: number) {
    await this.client.init();
    return this.client.delete(`/products/${id}`);
  }
}