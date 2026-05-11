import { faker } from '@faker-js/faker';

export interface CheckoutData {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export class CheckoutFactory {

  static validCheckout(
    overrides?: Partial<CheckoutData>
  ): CheckoutData {

    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      postalCode: faker.location.zipCode('#####-###'),

      ...overrides
    };
  }

  static invalidCheckout(): CheckoutData {

    return {
      firstName: '',
      lastName: '',
      postalCode: ''
    };
  }

  static checkoutWithoutPostalCode(): CheckoutData {

    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      postalCode: ''
    };
  }

  static checkoutWithoutFirstName(): CheckoutData {

    return {
      firstName: '',
      lastName: faker.person.lastName(),
      postalCode: faker.location.zipCode('#####-###')
    };
  }

  static checkoutWithoutLastName(): CheckoutData {

    return {
      firstName: faker.person.firstName(),
      lastName: '',
      postalCode: faker.location.zipCode('#####-###')
    };
  }
}