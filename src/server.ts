import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import express, { Request, Response, NextFunction, response } from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import userRoutes from './routes/user.routes';
import productRoutes from './routes/product.routes';
import authenticateRoutes from './routes/authenticate.routes';

import './shared/container';
import { AppError } from './errors/AppError';


const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use(authenticateRoutes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
	if(err instanceof AppError){
		return response.status(err.statusCode).json({
			error: `Internal server error - ${err.message}`
		});
	}

	return response.status(500).json({
		error: `Internal server error - ${err.message}`
	});
});


export default app;