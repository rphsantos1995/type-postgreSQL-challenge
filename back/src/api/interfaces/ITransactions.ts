import { Transactions } from "@prisma/client"

export interface ITransactions {
  code: number,
  data: Transactions[] | {}
}

export interface IAccount {
  id?: number,
  balance?: number
}