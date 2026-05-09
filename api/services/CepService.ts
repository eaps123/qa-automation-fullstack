import env from '../../config/env';
import { ApiClient } from '../clients/apiClient';

export class CepService {
  private client: ApiClient;

  constructor() {
    this.client = new ApiClient(env.api.brasilApi);
  }

  async getCep(cep: string) {
    await this.client.init();
    return this.client.get(`/cep/v1/${cep}`);
  }
}