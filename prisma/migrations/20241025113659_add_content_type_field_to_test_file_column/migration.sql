/*
  Warnings:

  - Added the required column `contentType` to the `TestFile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TestFile" ADD COLUMN     "contentType" TEXT NOT NULL;
