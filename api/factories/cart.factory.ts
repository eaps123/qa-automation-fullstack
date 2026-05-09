import { faker } from '@faker-js/faker';

interface CartProduct {
  productId: number;
  quantity: number;
}

interface CartPayload {
  userId: number;
  date: string;
  products: CartProduct[];
}

export class CartFactory {

  static validCart(
    overrides?: Partial<CartPayload>
  ): CartPayload {

    return {
      userId: faker.number.int({
        min: 1,
        max: 10
      }),

      date: faker.date.recent().toISOString(),

      products: [
        {
          productId: faker.number.int({
            min: 1,
            max: 20
          }),

          quantity: faker.number.int({
            min: 1,
            max: 5
          })
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

  static emptyCart() {
    return {};
  }

  static cartWithoutProducts() {
    return {
      userId: faker.number.int({
        min: 1,
        max: 10
      }),

      date: faker.date.recent().toISOString(),

      products: []
    };
  }
}