import { ProductRepository } from '../../repositories/implementation/ProductRepository';
import { ListProductsController } from './ListProductsController';
import { ListProductsUseCase } from './ListProductsUseCase';

const productRepository = ProductRepository.getInstance();
const listProductsUseCase = new ListProductsUseCase(productRepository);
const listProductsController = new ListProductsController(listProductsUseCase);

export { listProductsController };