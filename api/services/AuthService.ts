import env from '../../config/env';
import { ApiClient } from '../clients/apiClient';

export class AuthService {
  private client: ApiClient;

  constructor() {
    this.client = new ApiClient(env.api.reqres);
  }

  async login(payload: unknown) {
    await this.client.init();
    return this.client.post('/login', payload);
  }

  async register(payload: unknown) {
    await this.client.init();
    return this.client.post('/register', payload);
  }
}