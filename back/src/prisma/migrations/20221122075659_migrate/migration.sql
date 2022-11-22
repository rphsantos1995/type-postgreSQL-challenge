/*
  Warnings:

  - Made the column `name` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Users_name_key";

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "name" SET NOT NULL;
