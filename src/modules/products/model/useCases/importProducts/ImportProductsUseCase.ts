import { parse } from 'csv-parse';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';
import { ICreateProduct, IProductRepository } from '../../repositories/IProductRepository';

@injectable()
class ImportProductsUseCase {
	constructor(
		@inject('ProductRepository')
		private importProductsRepository: IProductRepository){}

	loadCategories(file: Express.Multer.File): Promise<ICreateProduct[]>{
		return new Promise((resolve, _) => {
			const categories: ICreateProduct[] = [] as ICreateProduct[];
			const stream = fs.createReadStream(file?.path);
			const parseFile = parse();

			stream.pipe(parseFile);

			parseFile.on('data', (line) => {
				const [name, description, price] = line;

				categories.push({
					name,
					description,
					price: parseInt(price)
				});
			})
				.on('end', () => {
					resolve(categories);
				})
				.on('error', (error) => {
					throw new Error(error.message);
				});
			
		});
	}

	async execute(file: Express.Multer.File){
		const categories = await this.loadCategories(file);
		categories.forEach(async ({ name, description, price }) => {
			await this.importProductsRepository.create({
				name, 
				description,
				price
			});
		});

		return;
	}
}

export { ImportProductsUseCase };