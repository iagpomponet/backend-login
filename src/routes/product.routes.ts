import express from 'express';
import multer from 'multer';


import { createProductController } from '../modules/products/model/useCases/createProduct';
import { importProductsController } from '../modules/products/model/useCases/importProducts';
import { listProductsController } from '../modules/products/model/useCases/listProducts';

const upload = multer({ dest: 'tmp/' });
const router = express.Router();

router.get('/',  (req, res) => listProductsController.handle(req, res));
router.post('/create', (req, res) => createProductController.handle(req, res));
router.post('/import', upload.single('products'), (req, res) => importProductsController.handle(req, res));

export default router;
