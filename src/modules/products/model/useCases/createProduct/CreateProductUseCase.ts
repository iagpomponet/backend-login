import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../../errors/AppError';
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
		catch{
			throw new AppError('Something went wrong', 400);
		}
	}
}

export { CreateProductUseCase };