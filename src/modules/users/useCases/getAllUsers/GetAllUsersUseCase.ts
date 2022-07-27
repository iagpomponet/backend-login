import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../errors/AppError';
import { IUserRepository } from '../../repositories/IUserRepository';

@injectable()
class GetAllUsersUseCase {
	constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository){}
	async execute(){
		try {
			const dbResponse = await this.userRepository.list();
			console.log('dbResponse :>> ', dbResponse);
			return dbResponse;
		} catch {
			throw new AppError('Failed to fetch database');
		}
	}
}

export { GetAllUsersUseCase };