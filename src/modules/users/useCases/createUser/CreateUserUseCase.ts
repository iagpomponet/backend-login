import { inject, injectable } from 'tsyringe';
import { User } from '../../model/User';
import { IUserRepository } from '../../repositories/IUserRepository';

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
		const emailAlreadyTaken = await this.userRepository.findOneByEmail(email);

		// eslint-disable-next-line no-extra-boolean-cast
		if(!!emailAlreadyTaken){
			throw new Error('E-mail already registered');
		}

		const user = new User();
		Object.assign(user, {
			username, 
			email, 
			password
		});

		await this.userRepository.create({
			username, 
			email, 
			password
		});
	}
}

export { CreateUserUseCase };
