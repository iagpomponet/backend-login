import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import express from 'express';
import morgan from 'morgan';
import userRoutes from './routes/user.routes';
import productRoutes from './routes/product.routes';
import authenticateRoutes from './routes/authenticate.routes';

import './shared/container';


const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use(authenticateRoutes);


export default app;