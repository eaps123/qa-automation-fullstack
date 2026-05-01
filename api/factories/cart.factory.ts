import { faker } from '@faker-js/faker';

export class CartFactory {
  static validCart(overrides = {}) {
    return {
      userId: faker.number.int({ min: 1, max: 10 }),
      date: faker.date.recent().toISOString(),
      products: [
        {
          productId: faker.number.int({ min: 1, max: 20 }),
          quantity: faker.number.int({ min: 1, max: 5 })
        }
      ],
      ...overrides
    };
  }

  static invalidCart() {
    return {
      userId: null,
      products: 'invalid'
    };
  }
}