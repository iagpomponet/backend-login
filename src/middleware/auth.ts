import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../modules/users/repositories/implementations/UserRepository';

export default function checkAuth(req: Request, res: Response, next: NextFunction) {
	const authHeader = req.headers.authorization;
    
	if(!authHeader){
		throw new Error('No auth token found');
	}

	const tokenSecret = process.env.SECRET!;
	const [, token] = authHeader.split(' ');
    
	try {
		const { sub: userId } = jwt.verify(token, tokenSecret);
		const userRepository = new UserRepository();
		const user = userRepository.findById((userId as string));

		if(!user){
			throw new Error('User does not exist');
		}
        
		if(userId){
			next();
		}
	}
	catch(e){
		throw new Error((e as Error).message);
	}
}