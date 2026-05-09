import env from '../../config/env';
import { ApiClient } from '../clients/apiClient';

export class CartService {
  private client: ApiClient;

  constructor() {
    this.client = new ApiClient(env.api.fakeStore);
  }

  async createCart(payload: unknown) {
    await this.client.init();
    return this.client.post('/carts', payload);
  }

  async getCart(id: number) {
    await this.client.init();
    return this.client.get(`/carts/${id}`);
  }

  async updateCart(id: number, payload: unknown) {
    await this.client.init();
    return this.client.put(`/carts/${id}`, payload);
  }

  async deleteCart(id: number) {
    await this.client.init();
    return this.client.delete(`/carts/${id}`);
  }
}