import { faker } from '@faker-js/faker';

const productService = {
  generateMockingProducts: async (quantity) => {
    const products = [];

    for (let i = 0; i < quantity; i++) {
      const product = {
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        stock: faker.datatype.number(),
        id: faker.datatype.uuid(),
        image: faker.image.imageUrl()
      };

      products.push(product);
    }

    return products;
  }
};

export default productService;
