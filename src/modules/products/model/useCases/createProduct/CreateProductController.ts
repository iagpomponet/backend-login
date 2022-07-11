import { Request, Response } from 'express';
import { CreateProductUseCase } from './CreateProductUseCase';

class CreateProductController {
	constructor(private createProductUseCase: CreateProductUseCase){}

	async handle(req: Request, res: Response){
		const { name, description, price } = req.body;
		
		try {
			await this.createProductUseCase.execute({ name, description, price });
			
			return res.status(201).json({
				message: 'Product created with success!'
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