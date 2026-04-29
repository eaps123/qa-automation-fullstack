import { ApiClient } from './apiClient';

const BASE_URL = 'https://reqres.in/api';

export class AuthService {
  constructor(private client: ApiClient) {}

  login(payload: any) {
    return this.client.post(`${BASE_URL}/login`, payload);
  }
}