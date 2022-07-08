import { ProductRepository } from '../../repositories/implementation/ProductRepository';
import { CreateProductController } from './CreateProductController';
import { CreateProductUseCase } from './CreateProductUseCase';

const productRepository = ProductRepository.getInstance();
const createProductUseCase = new CreateProductUseCase(productRepository);
const createProductController = new CreateProductController(createProductUseCase);

export { createProductController };