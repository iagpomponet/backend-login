import { ProductRepository } from '../../repositories/implementation/ProductRepository';
import { ImportProductsController } from './ImportProductsController';
import { ImportProductsUseCase } from './ImportProductsUseCase';

const productRepository = ProductRepository.getInstance();
const importProductsUseCase = new ImportProductsUseCase(productRepository);
const importProductsController = new ImportProductsController(importProductsUseCase);

export { importProductsController };