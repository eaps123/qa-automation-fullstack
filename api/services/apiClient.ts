import { request, APIRequestContext } from '@playwright/test';

export class ApiClient {
  private context!: APIRequestContext;

  async init() {
    this.context = await request.newContext({
      extraHTTPHeaders: {
        Accept: 'application/json',
        'User-Agent': 'qa-automation'
      }
    });
  }

  get(url: string) {
    return this.context.get(url);
  }

  post(url: string, data?: any) {
    return this.context.post(url, { data });
  }
}