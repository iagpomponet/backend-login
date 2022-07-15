
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ImportProductsUseCase } from './ImportProductsUseCase';

class ImportProductsController {
	async handle(req: Request, res: Response){
		const file = req?.file;
		if(!file){
			return res.status(500).json({
				error: 'No file found'
			});
		}
		
		const importProductsUseCase = container.resolve(ImportProductsUseCase);
		await importProductsUseCase.execute(file);

		return res.status(200).send();
	}

}

export { ImportProductsController };