/*
  Warnings:

  - Made the column `name` on table `Test` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Test" ALTER COLUMN "name" SET NOT NULL;
