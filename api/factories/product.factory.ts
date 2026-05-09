import { faker } from '@faker-js/faker';

interface ProductPayload {
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export class ProductFactory {

  static validProduct(
    overrides?: Partial<ProductPayload>
  ): ProductPayload {

    return {
      title: faker.commerce.productName(),

      price: Number(
        faker.commerce.price({
          min: 10,
          max: 1000
        })
      ),

      description:
        faker.commerce.productDescription(),

      image: faker.image.url(),

      category: faker.commerce.department(),

      ...overrides
    };
  }

  static invalidProduct() {
    return {
      title: '',
      price: 'invalid',
      description: null,
      category: 123
    };
  }

  static emptyProduct() {
    return {};
  }

  static expensiveProduct(): ProductPayload {
    return this.validProduct({
      price: 9999.99
    });
  }

  static cheapProduct(): ProductPayload {
    return this.validProduct({
      price: 1.99
    });
  }

  static productWithoutTitle() {
    return this.validProduct({
      title: ''
    });
  }

  static productWithoutPrice() {
    return {
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      image: faker.image.url(),
      category: faker.commerce.department()
    };
  }
}