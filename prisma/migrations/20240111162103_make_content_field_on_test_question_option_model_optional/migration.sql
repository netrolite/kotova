/*
  Warnings:

  - Made the column `testQuestionId` on table `TestQuestionOption` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "TestQuestionOption" DROP CONSTRAINT "TestQuestionOption_testQuestionId_fkey";

-- AlterTable
ALTER TABLE "TestQuestionOption" ALTER COLUMN "content" DROP NOT NULL;
ALTER TABLE "TestQuestionOption" ALTER COLUMN "testQuestionId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "TestQuestionOption" ADD CONSTRAINT "TestQuestionOption_testQuestionId_fkey" FOREIGN KEY ("testQuestionId") REFERENCES "TestQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
