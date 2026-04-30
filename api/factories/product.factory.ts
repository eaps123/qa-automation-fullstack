export class ProductFactory {

    static validProduct(overrides = {}) {
      return {
        title: 'Produto Teste',
        price: 99.99,
        description: 'Descrição do produto teste',
        image: 'https://i.pravatar.cc',
        category: 'electronics',
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
  
    static expensiveProduct() {
      return this.validProduct({
        price: 9999.99
      });
    }
  
    static cheapProduct() {
      return this.validProduct({
        price: 1.99
      });
    }
  
  }