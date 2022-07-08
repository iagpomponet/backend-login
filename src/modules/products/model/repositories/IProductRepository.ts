import { Product } from '../Product';

export interface ICreateProduct {
	name: string;
	description: string;
	price: number;
}

interface IProductRepository {
	list(): Promise<Product[]>;
	create({ name, price, description }: ICreateProduct): Promise<void>;
}

export { IProductRepository };