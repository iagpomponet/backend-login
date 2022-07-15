import { container } from 'tsyringe';
import { ProductRepository } from '../../modules/products/model/repositories/implementation/ProductRepository';
import { IProductRepository } from '../../modules/products/model/repositories/IProductRepository';
import { UserRepository } from '../../modules/users/repositories/implementations/UserRepository';
import { IUserRepository } from '../../modules/users/repositories/IUserRepository';


container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IProductRepository>('ProductRepository', ProductRepository);