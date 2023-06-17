import { Router } from 'express';
import mockingProductsController from '../../controllers/mock/mockingProductsController.js';

const router = Router();

router.get('/mockingproducts', mockingProductsController.getMockingProducts);

export default router;
