import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../errors/AppError';
import { UserRepository } from '../modules/users/repositories/implementations/UserRepository';

export default function checkAuth(req: Request, res: Response, next: NextFunction) {
	const authHeader = req.headers.authorization;
    
	if(!authHeader){
		throw new AppError('No auth token found');
	}

	const tokenSecret = process.env.SECRET!;
	const [, token] = authHeader.split(' ');
    
	try {
		const { sub: userId } = jwt.verify(token, tokenSecret);
		const userRepository = new UserRepository();
		const user = userRepository.findById((userId as string));

		if(!user){
			throw new AppError('User does not exist', 401);
		}
        
		if(userId){
			req.user = {
				id: userId as string
			};
			next();
		}
	}
	catch {
		throw new AppError('Invalid token', 401);
	}
}