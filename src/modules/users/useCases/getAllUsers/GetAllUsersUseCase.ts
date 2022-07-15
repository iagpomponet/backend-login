import { inject, injectable } from 'tsyringe';
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
		} catch (error) {
			throw new Error((error as any)?.message);
		}
	}
}

export { GetAllUsersUseCase };