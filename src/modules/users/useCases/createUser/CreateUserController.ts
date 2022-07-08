import express from 'express';
import { CreateUserUseCase } from './CreateUserUseCase';


class CreateUserController {
	constructor(private createUserUseCase: CreateUserUseCase){}

	async handle(req: express.Request, res: express.Response) {
		const { username, email, password } = req.body;
    
		try {
			await this.createUserUseCase.execute({ username, email, password } );
		}
		catch(e){
			return res.status(500).json({
				error: (e as Error)?.message
			});
		}

		return res.status(201).json                                                                                                                                                                                                                                                                                                                                                                                                                             ({
			message: 'User created'
		});
	}
}

export { CreateUserController };