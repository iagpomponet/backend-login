import bcrypt from 'bcrypt';
import express from 'express';

import { container } from 'tsyringe';
import { CreateUserUseCase } from './CreateUserUseCase';


class CreateUserController {
	async handle(req: express.Request, res: express.Response) {
		const { username, email, password } = req.body;
    
		try {
			const createUserUseCase = container.resolve(CreateUserUseCase);
			await createUserUseCase.execute({ username, email, password });
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