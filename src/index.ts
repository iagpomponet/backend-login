import express from 'express';
import prisma from './config/prisma';
import userRoutes from './routes';


async function main() {
  const app = express();
  const port = process.env.SERVER_PORT;
  console.log('port :>> ', port);

  app.listen(port, () => {
    console.log(`Server running on port :${port}`);
  });

  app.use('/users', userRoutes);
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })