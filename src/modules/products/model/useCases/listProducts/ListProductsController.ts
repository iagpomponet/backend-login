import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListProductsUseCase } from './ListProductsUseCase';

class ListProductsController {
	async handle(_: Request, res: Response){
		const listProductsUseCase = container.resolve(ListProductsUseCase);
		const data = await listProductsUseCase.execute();

		return res.status(200).json({
			data
		});
	}
}

export { ListProductsController };