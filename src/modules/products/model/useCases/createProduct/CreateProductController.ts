import { Request, Response } from 'express';
import { CreateProductUseCase } from './CreateProductUseCase';

class CreateProductController {
	constructor(private createProductUseCase: CreateProductUseCase){}

	async handle(req: Request, res: Response){
		const { name, description, price } = req.body;
		
		try {
			const response = await this.createProductUseCase.execute({ name, description, price });
			
			return res.status(201).json({
				data: response
			});
		}
		catch(e){
			return res.status(500).json({
				error: e
			});
		}
	}
}

export { CreateProductController };