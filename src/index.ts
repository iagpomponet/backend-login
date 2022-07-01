import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import prisma from './config/prisma';
import userRoutes from './routes/user.routes';


async function main() {
  const app = express();
  const port = process.env.SERVER_PORT;

  app.listen(port, () => {
    console.log(`Server running on port :${port}`);
  });

  app.use(morgan('dev'));
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use('/users', userRoutes);
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })