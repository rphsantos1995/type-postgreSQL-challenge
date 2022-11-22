-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_creditatedAccountId_fkey";

-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_debitatedAccountId_fkey";

-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_accountId_fkey";

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_debitatedAccountId_fkey" FOREIGN KEY ("debitatedAccountId") REFERENCES "Accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_creditatedAccountId_fkey" FOREIGN KEY ("creditatedAccountId") REFERENCES "Accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
