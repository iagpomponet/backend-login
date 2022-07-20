import express from 'express';
import multer from 'multer';
import checkAuth from '../middleware/auth';


import { CreateProductController } from '../modules/products/model/useCases/createProduct/CreateProductController';
import { ImportProductsController } from '../modules/products/model/useCases/importProducts/ImportProductsController';
import { ListProductsController } from '../modules/products/model/useCases/listProducts/ListProductsController';

const listProductsController = new ListProductsController();
const importProductsController = new ImportProductsController();
const createProductController = new CreateProductController();

const upload = multer({ dest: 'tmp/' });
const router = express.Router();

router.get('/', checkAuth, listProductsController.handle);
router.post('/create', createProductController.handle);
router.post('/import', upload.single('products'), importProductsController.handle);

export default router;
