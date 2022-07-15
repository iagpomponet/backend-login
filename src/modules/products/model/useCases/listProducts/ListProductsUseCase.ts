import { inject, injectable } from 'tsyringe';
import { Product } from '../../Product';
import { IProductRepository } from '../../repositories/IProductRepository';

@injectable()
class ListProductsUseCase {
	constructor(
		@inject('ProductRepository')
		private productRepository: IProductRepository){}

	async execute(): Promise<Product[]>{
		const response = await this.productRepository.list();

		return response;
	}
}

export { ListProductsUseCase };