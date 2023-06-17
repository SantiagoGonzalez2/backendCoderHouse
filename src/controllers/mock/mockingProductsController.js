import productService from '../../services/mock/productServiceMock.js';

const mockingProductsController = {
  getMockingProducts: async (req, res) => {
    try {
      const products = await productService.generateMockingProducts(100);
      res.json(products);
    } catch (error) {
      console.error('Error al obtener los productos de mocking:', error);
      res.status(500).json({ error: 'Error al obtener los productos de mocking' });
    }
  }
};

export default mockingProductsController;
