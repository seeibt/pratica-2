/*
  Warnings:

  - Added the required column `grausTemp` to the `Logs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Logs" ADD COLUMN     "grausTemp" DECIMAL(65,30) NOT NULL;
