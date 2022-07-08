import { Request, Response } from 'express';
import { ListProductsUseCase } from './ListProductsUseCase';

class ListProductsController {
	constructor(private listProductsCase: ListProductsUseCase){}

	async handle(_: Request, res: Response){
		const data = await this.listProductsCase.execute();

		return res.status(200).json({
			data
		});
	}
}

export { ListProductsController };