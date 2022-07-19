import { inject, injectable } from 'tsyringe';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { IUserRepository } from '../../repositories/IUserRepository';

interface IRequest {
    email: string;
    password: string;
}

@injectable()
class AuthenticateUserUseCase {
	constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository){}

	async execute({ email, password }: IRequest){
		const errorMessage = 'E-mail or password is invalid';
		const user = await this.userRepository.findOneByEmail(email);

		if(!user){
			throw new Error('E-mail or password is invalid');
		}

		const isPasswordCorrect = await compare(password, user.password);

		if(!isPasswordCorrect){
			throw new Error('E-mail or password is invalid');
		}

		const token = sign({}, process.env.SECRET!, {
			subject: user.id,
			expiresIn: '1d'
		});

		return {
			user: {
				name: user?.username,
				email: user?.email
			},
			token
		};

	}
}

export { AuthenticateUserUseCase };