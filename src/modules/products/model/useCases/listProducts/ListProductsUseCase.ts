import { Product } from '../../Product';
import { IProductRepository } from '../../repositories/IProductRepository';

class ListProductsUseCase {
	constructor(private productRepository: IProductRepository){}

	async execute(): Promise<Product[]>{
		const response = await this.productRepository.list();

		return response;
	}
}

export { ListProductsUseCase };