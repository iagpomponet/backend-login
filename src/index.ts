import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here
  
  await prisma.user.create({
    data: {
      username: "iago",
      email: "iago@email.com",
      password: "1234",
    }
  })
  
  const allUsers = await prisma.user.findMany()
  console.log(allUsers);
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })