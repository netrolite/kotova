/*
  Warnings:

  - You are about to drop the column `filesize` on the `TestFile` table. All the data in the column will be lost.
  - Added the required column `byteLength` to the `TestFile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TestFile" DROP COLUMN "filesize",
ADD COLUMN     "byteLength" INTEGER NOT NULL;
