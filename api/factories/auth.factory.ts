interface LoginPayload {
  username: string;
  password?: string;
}

export class AuthFactory {

  static validUser(
    overrides?: Partial<LoginPayload>
  ): LoginPayload {
    return {
      username: 'emilys',
      password: 'emilyspass',
      ...overrides
    };
  }

  static invalidUser() {
    return {
      username: 'invalid',
      password: 'invalid'
    };
  }

  static userWithoutPassword() {
    return {
      username: 'kminchelle'
    };
  }

  static userWithoutEmail() {
    return {
      password: '0lelplR'
    };
  }
}