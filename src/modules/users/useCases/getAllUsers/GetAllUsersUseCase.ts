import { IUserRepository } from '../../repositories/IUserRepository';

class GetAllUsersUseCase {
    constructor(private userRepository: IUserRepository){};
    async execute(){
       try {
        const dbResponse = await this.userRepository.list();
        return dbResponse;
       } catch (error) {
            throw new Error((error as any)?.message);
       }
    }
}

export { GetAllUsersUseCase };