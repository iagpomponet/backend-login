import { ICreateProduct, IProductRepository } from '../../repositories/IProductRepository';

class CreateProductUseCase {
	constructor(private productRepository: IProductRepository){}

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