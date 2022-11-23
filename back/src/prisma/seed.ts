import { Accounts, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import md5 from 'md5';

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
    where: {
      username: 'alice@prisma.io'
    },
    update: {},
    create: {
      password: md5('some-hashpass-lol'),
      username: 'alice@prisma.io',
      account: {
        create:{
          balance: 100
        },
      },
    }
  })


  const carlinhos = await prisma.users.upsert({
    where: {
      username: 'carlinhos@prisma.io'
    },
    update: {},
    create: {
      password: md5('some-hashpass-lol'),
      username: 'carlinhos@prisma.io',
      account: {
        create:{
          balance: 100
        },
      },
  }})
  
  const firstTransaction = await prisma.transactions.upsert({
    where: {id: 0},
    update: {
    },
    create: {
      debitatedAccountId: carlinhos.accountId,
      creditatedAccountId: alice.accountId,
      value: 20
    }

  });

  async function debitedBalance() {

    const getCarlinhos = await prisma.accounts.findUnique({
      where:{
        id: carlinhos.accountId
      }
    });
 
    await prisma.accounts.update({
        where:{
          id: getCarlinhos?.id
        },
        data:{
          balance: Number(getCarlinhos?.balance) - Number(firstTransaction.value)
        }
      })
  
  };

  async function creditedBalance () { 

    const getAlice = await prisma.accounts.findUnique({
      where:{
        id: alice.accountId
      }
    });

    await prisma.accounts.update({
        where: {
          id: getAlice?.id
        },
        data: {
          balance: Number(getAlice?.balance) + Number(firstTransaction.value)
        }
      })
    
  }
    
  debitedBalance();
  creditedBalance();


 
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