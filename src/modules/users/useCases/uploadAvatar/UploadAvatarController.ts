import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppError } from '../../../../errors/AppError';
import { UploadAvatarUseCase } from './UploadAvatarUseCase';




class UploadAvatarController {
	handle(req: Request, res: Response){
		// get id from user on requ
		// set user on req on auth middleware
		const { id } = req.user;
		const file = req.file;
		const uploadAvatarUseCase = container.resolve(UploadAvatarUseCase);

		if(!file){
			throw new AppError('No file found');
		}

		uploadAvatarUseCase.execute({
			user_id: id,
			avatar_file: file!.filename
		});

		res.status(200).send();
	}
}

export { UploadAvatarController };