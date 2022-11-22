import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import  axios from 'axios';

async function dropTables () {
  await prisma.users.deleteMany();
  await prisma.accounts.deleteMany();
  await prisma.transactions.deleteMany();
}

const getFromAxios = async (url: string) => {

  try {
      const response = await axios.get(url);
      return response.data;
  } catch (exception) {
      process.stderr.write(`ERROR received from ${url}: ${exception}\n`);
  }
}


async function populate() {
  
  const fakeUsers = await getFromAxios("https://fakestoreapi.com/users?limit=5");

  
  
  const alice = await prisma.users.upsert({
    where: {  accountId: 0 },
    update: {},
    create: {
      password: 'alice@prisma.io',
      name: 'Alice',
      account: {
        create:{
          balance: 100
        },
      },
  }})
  
  const carlinhos = await prisma.users.upsert({
    where: {
      accountId: 0
    },
    update: {},
    create: {
      password: 'carlinhos@prisma.io',
      name: 'another name',
      account: {
        create:{
          balance: 100
        },
      },
  }})

  console.log(fakeUsers);

}
dropTables()
    .then(() => populate()) 
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })