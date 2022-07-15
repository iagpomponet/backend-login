import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateProductUseCase } from './CreateProductUseCase';

class CreateProductController {
	async handle(req: Request, res: Response){
		const { name, description, price } = req.body;
		
		try {
			const createProductUseCase = container.resolve(CreateProductUseCase);
			await createProductUseCase.execute({ name, description, price });
			
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