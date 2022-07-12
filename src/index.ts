// import express from 'express';
// import morgan from 'morgan';
// import cookieParser from 'cookie-parser';

import prisma from './config/prisma';
// import userRoutes from './routes/user.routes';
import app from './server';


async function main() {
	const port = process.env.SERVER_PORT || 8000;
  
	app.listen(port, () => {
		console.log(`Server running on port :${port}`);
	});
}

main()
	.catch((e) => {
		throw e;
	})
	.finally(async () => {
		await prisma.$disconnect();
	});