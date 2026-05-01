import { ApiClient } from './apiClient';

const BASE_URL = 'https://fakestoreapi.com';

export class ProductService {
  constructor(private client: ApiClient) {}

  getProducts() {
    return this.client.get(`${BASE_URL}/products`);
  }

  createCart(payload: any) {
    return this.client.post(`${BASE_URL}/carts`, payload);
  }
}