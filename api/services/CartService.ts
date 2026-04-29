import { ApiClient } from './apiClient';

const BASE_URL = 'https://fakestoreapi.com';

export class CartService {
  constructor(private client: ApiClient) {}

  createCart(payload: any) {
    return this.client.post(`${BASE_URL}/carts`, payload);
  }

  getCart(id: number) {
    return this.client.get(`${BASE_URL}/carts/${id}`);
  }

  getAllCarts() {
    return this.client.get(`${BASE_URL}/carts`);
  }
}