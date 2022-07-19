import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';


class AuthenticateUserController {
	async handle(req: Request, res: Response){
		const { email, password } = req.body;
		const authUserUseCase = container.resolve(AuthenticateUserUseCase);

		try {
			const response = await authUserUseCase.execute({
				email,
				password
			});
    
			return res.status(200).json(response);
		} catch (error) {
			return res.status(500).json({
				error: (error as Error)?.message
			});
		}
	}
}

export { AuthenticateUserController };