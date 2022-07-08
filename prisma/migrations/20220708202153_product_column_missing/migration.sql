/*
  Warnings:

  - Added the required column `name` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product" ADD COLUMN     "name" TEXT NOT NULL;
