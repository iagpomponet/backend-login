import { inject, injectable } from 'tsyringe';
import { deleteFile } from '../../../../utils/file';
import { User } from '../../model/User';
import { IUserRepository } from '../../repositories/IUserRepository';

interface IRequest {
    user_id: string;
    avatar_file: string;
}

@injectable()
class UploadAvatarUseCase {
	constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository
	){}

	async execute({ user_id, avatar_file }: IRequest): Promise<void>{
		const user = await this.userRepository.findById(user_id);

		if(user && user?.avatar){
			await deleteFile(`./tmp/avatar/${user.avatar}`);
		}

		const updateValue = {
			avatar: avatar_file
		};

		await this.userRepository.update(user_id, updateValue);
	}
}

export { UploadAvatarUseCase };