import {
  request,
  APIRequestContext,
  APIResponse
} from '@playwright/test';

export class ApiClient {
  private context!: APIRequestContext;

  constructor(
    private baseURL: string,
    private token?: string
  ) { }

  async init() {
    this.context = await request.newContext({
      baseURL: this.baseURL,

      extraHTTPHeaders: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'qa-automation',

        ...(this.token && {
          Authorization: `Bearer ${this.token}`
        })
      }
    });
  }

  async get(
    endpoint: string,
    params?: Record<string, string | number>
  ): Promise<APIResponse> {
    return this.context.get(endpoint, {
      params
    });
  }

  async post(
    endpoint: string,
    data?: unknown
  ): Promise<APIResponse> {
    return this.context.post(endpoint, {
      data
    });
  }

  async put(
    endpoint: string,
    data?: unknown
  ): Promise<APIResponse> {
    return this.context.put(endpoint, {
      data
    });
  }

  async delete(endpoint: string): Promise<APIResponse> {
    return this.context.delete(endpoint);
  }

  async dispose() {
    await this.context.dispose();
  }
}