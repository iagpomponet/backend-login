/* eslint-disable no-extra-boolean-cast */
import { inject, injectable } from 'tsyringe';
import { hash } from 'bcryptjs';

import { IUserRepository } from '../../repositories/IUserRepository';
import { AppError } from '../../../../errors/AppError';

interface ICreateUser {
  username: string;
  password: string;
  email: string;
}


// for the class be able to be injected on others
@injectable()
class CreateUserUseCase {	
	constructor(
		// inject repository
		@inject('UserRepository')
		private userRepository: IUserRepository) {}

	async execute({ username, email, password }: ICreateUser) {
		const hashedPassword = await hash(password, 10);
		const emailAlreadyTaken = await this.userRepository.findOneByEmail(email);


		if(!!emailAlreadyTaken){
			throw new AppError('E-mail already registered');
		}

		await this.userRepository.create({
			username, 
			email, 
			password: hashedPassword
		});
	}
}

export { CreateUserUseCase };
