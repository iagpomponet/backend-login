import { AppError } from '../../../../errors/AppError';
import { InMemoryUserRepository } from '../../repositories/in-memory/InMemoryUserRepository';
import { CreateUserUseCase } from './CreateUserUseCase';


let createUserUseCase: CreateUserUseCase;
let userRepository: InMemoryUserRepository;

describe('Create User', () => {
	beforeEach(() => {
		userRepository = new InMemoryUserRepository();
		createUserUseCase = new CreateUserUseCase(userRepository);
	});

	it('should be able to create a new user', async () => {
		const user = {
			username: 'Iago',
			email: 'iago@email.com',
			password: '123'
		};

		await createUserUseCase.execute(user);

		const [myUser] = await userRepository.findOneByEmail(user?.email);

		expect(myUser).not.toBeNull();
		expect(myUser?.email).toBe(user.email);
		expect(myUser).toHaveProperty('id');
		expect(myUser?.username).toBe(user.username);
	});

	it('should not be able to create a new user with e-mail already used', async () => {
		expect(
			async () => {
				const user = {
					username: 'Iago',
					email: 'iago@email.com',
					password: '123'
				};
		
				await createUserUseCase.execute(user);
				await createUserUseCase.execute(user);
			}
		).rejects.toBeInstanceOf(AppError);
	});
});