import { ApiClient } from './apiClient';

const BASE_URL = 'https://brasilapi.com.br/api';

export class CepService {
  constructor(private client: ApiClient) {}

  getCep(cep: string) {
    return this.client.get(`${BASE_URL}/cep/v1/${cep}`);
  }
}