
import { Request, Response } from 'express';
import { ImportProductsUseCase } from './ImportProductsUseCase';

class ImportProductsController {
	constructor(private importProductsUseCase: ImportProductsUseCase){}

	async handle(req: Request, res: Response){
		const file = req?.file;
		if(!file){
			return res.status(500).json({
				error: 'No file found'
			});
		}
		
		await this.importProductsUseCase.execute(file);

		return res.status(200).send();
	}

}

export { ImportProductsController };