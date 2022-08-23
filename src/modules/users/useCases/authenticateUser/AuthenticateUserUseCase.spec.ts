import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { AppError } from '../../../../errors/AppError';
import { InMemoryUserRepository } from '../../repositories/in-memory/InMemoryUserRepository';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let userRepository: InMemoryUserRepository;
let authUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

dotenv.config();

describe('Authenticate User', () => {
	beforeEach(() => {
		userRepository = new InMemoryUserRepository();
		authUserUseCase = new AuthenticateUserUseCase(userRepository);
		createUserUseCase = new CreateUserUseCase(userRepository);
	});

	it('should be able to authenticate a user', async () => {
		const userData = {
			username: 'Iago',
			email: 'iago@email.com',
			password: 'teste123'
		};
		// Check if returns a token
		await createUserUseCase.execute(userData);

		const response = await authUserUseCase.execute({
			email: userData.email,
			password: userData.password
		});

		const { sub: userId } = jwt.verify(response.token, process.env.SECRET!);
        
		expect(response.token).toBeDefined();
		expect(userId).toBeDefined();
	});

	it('should not authenticate invalid user', () => {
		expect(async () => {
			await authUserUseCase.execute({
				email: 'test@gmail.com',
				password: '123'
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it('should not be possible to auth with invalid password', async () => {
		const userData = {
			username: 'Iago',
			email: 'iago@email.com',
			password: 'teste123'
		};
		// Check if returns a token
		await createUserUseCase.execute(userData);

		expect(async () => {
			await authUserUseCase.execute({
				email: 'iago@email.com',
				password: '123'
			});
		}).rejects.toBeInstanceOf(AppError);
	});
});