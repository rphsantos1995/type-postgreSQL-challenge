import { transactionModel } from "../model/transactionModel";
import { Users, Transactions } from "@prisma/client";
import { userModel } from "../model/userModel";
import { ITransactions } from "../interfaces/ITransactions";


export class transactionService {

  static async getUserTransactions(accountId: number): Promise<ITransactions> {

    try {

      const transactions = await transactionModel.getUserTransactions(accountId);

      return {code: 200, data:transactions};

    } catch (err) {
      console.log(err);
      return {code: 400, data:{err}}
    }

  };

  static async getCreditedAccountId (creditedName: string) {

    try {
      
      const credited = await transactionModel.getCreditedAccountId(creditedName);
      if(!credited) return {code: 404, data: {message: "not found"}}
      return {code: 200, data: credited?.accountId};

    } catch (err) {
      return {code: 400, data:{err}};
    }

  };

  static async createTransaction (debId: number, credId: number, value: number): Promise<any> {

    try {

      const debitedBalance= await userModel.balanceById(debId);
      
      if(Number(debitedBalance) < value || debId === credId) return { 
        code: 403, data: {message: "Invalid transference"} }
      
      const newTransaction = await transactionModel.createTransaction(debId, credId, value);
      
      return {code: 201, data: newTransaction};

    } catch (err) {
      console.log(err);
      return {code: 400, data: err}
    }

  };

};
