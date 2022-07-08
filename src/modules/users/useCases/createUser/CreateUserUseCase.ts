import { IUserRepository } from '../../repositories/IUserRepository';

interface ICreateUser {
  username: string;
  password: string;
  email: string;
}

class CreateUserUseCase {
	constructor(private userRepository: IUserRepository) {}

	async execute({ username, email, password }: ICreateUser) {
		const emailAlreadyTaken = this.userRepository.findOneByEmail(email);

		throw new Error('E-mail already registered');
	}
}

export { CreateUserUseCase };
