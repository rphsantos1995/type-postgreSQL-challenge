import { Users, PrismaClient, Transactions } from '@prisma/client';
import { userModel } from './userModel';


export class transactionModel { 

  static async getUserTransactions(accountId: number): Promise<Transactions[]> {

    const prisma = new PrismaClient();

    const transactions = await prisma.transactions.findMany({ 

      where: {
        OR: [
          { debitatedAccountId: accountId }, 
          { creditatedAccountId: accountId }
        ]
      },
    
    });

    await prisma.$disconnect();

    return transactions;

  };


  static async getCreditedAccountId (creditedName: string) {

    const credited = await userModel.findByName(creditedName);
    return credited;

  };

  static async updateBalance(creditedId: number,debitedId: number, value: number) {

    const prisma = new PrismaClient();
  
    await prisma.accounts.update({where:{id: creditedId}, data:{
      balance:{
        increment: value
      }
    }});

    await prisma.accounts.update({where:{id: debitedId}, data:{
      balance:{
        decrement: value
      }
    }});
    
    await prisma.$disconnect();
 
  };


  static async createTransaction (debitedId: number, creditedId: number, value: number) {

      const prisma = new PrismaClient();

      await prisma.transactions.create({

        data: {
          debitatedAccountId: debitedId,
          creditatedAccountId: creditedId,
          value
        }
    
      }).then(()=> this.updateBalance(debitedId, creditedId, value));


      await prisma.$disconnect();

  };
  
};