// controller gets use case
import express from 'express';
import { GetAllUsersUseCase } from './GetAllUsersUseCase';

class GetAllUsersController {
	constructor(private getAllUsersUseCase: GetAllUsersUseCase){}

	async handle(_: express.Request, res: express.Response){

		const response = await this.getAllUsersUseCase.execute();

		return res.status(200).json({
			data: response
		});
	}
}

export { GetAllUsersController };