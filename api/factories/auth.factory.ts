export class AuthFactory {
    static validUser() {
      return {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka'
      };
    }
  
    static invalidUser() {
      return {
        email: 'peter@klaven'
      };
    }
  }