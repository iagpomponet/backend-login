import express from 'express';
import { createProductController } from '../modules/products/model/useCases/createProduct';
import { listProductsController } from '../modules/products/model/useCases/listProducts';

const router = express.Router();

router.get('/',  (req, res) => listProductsController.handle(req, res));
router.post('/create', (req, res) => createProductController.handle(req, res));

export default router;
