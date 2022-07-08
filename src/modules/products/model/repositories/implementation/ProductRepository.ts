import prisma  from '../../../../../config/prisma';
import { Product } from '../../Product';
import { ICreateProduct, IProductRepository } from '../IProductRepository';

class ProductRepository implements IProductRepository {
	public static INSTANCE: IProductRepository;

	async list(): Promise<Product[]> {
		return prisma.product.findMany();
	}

	async create({ name, price, description }: ICreateProduct): Promise<void> {
		const product = new Product();
		Object.assign(product, {
			name, 
			description,
			price, 
			created_at: new Date()
		});

		await prisma.product.create({
			data: product
		});

		return;
	}

	public static getInstance(): IProductRepository {
		if(!ProductRepository.INSTANCE){
			ProductRepository.INSTANCE = new ProductRepository();
		}

		return ProductRepository.INSTANCE;
	}
}

export { ProductRepository };