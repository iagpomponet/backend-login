import { inject, injectable } from 'tsyringe';
import { ICreateProduct, IProductRepository } from '../../repositories/IProductRepository';

@injectable()
class CreateProductUseCase {
	constructor(
		@inject('ProductRepository')
		private productRepository: IProductRepository){}

	async execute({ name, price, description }: ICreateProduct){
		try {
			await this.productRepository.create({
				name, 
				price, 
				description
			});
		}
		catch(e){
			throw new Error((e as Error)?.message ?? 'Something went wrong');
		}
	}
}

export { CreateProductUseCase };