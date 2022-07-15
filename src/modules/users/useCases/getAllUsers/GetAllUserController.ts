// controller gets use case
import express from 'express';
import { container } from 'tsyringe';
import { GetAllUsersUseCase } from './GetAllUsersUseCase';

class GetAllUsersController {
	async handle(_: express.Request, res: express.Response){
		const getAllUsersUseCase = container.resolve(GetAllUsersUseCase);
		const response = await getAllUsersUseCase.execute();


		return res.status(200).json({
			data: response
		});
	}
}

export { GetAllUsersController };