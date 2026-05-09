interface LoginPayload {
  email: string;
  password?: string;
}

export class AuthFactory {

  static validUser(
    overrides?: Partial<LoginPayload>
  ): LoginPayload {
    return {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka',
      ...overrides
    };
  }

  static invalidUser() {
    return {
      email: 'invalid@email.com',
      password: ''
    };
  }

  static userWithoutPassword() {
    return {
      email: 'eve.holt@reqres.in'
    };
  }

  static userWithoutEmail() {
    return {
      password: '123456'
    };
  }
}