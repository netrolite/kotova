/*
  Warnings:

  - Added the required column `testId` to the `TestFile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TestFile" ADD COLUMN     "testId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TestQuestion" ALTER COLUMN "order" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TestQuestionOption" ALTER COLUMN "order" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "TestFile" ADD CONSTRAINT "TestFile_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE CASCADE ON UPDATE CASCADE;
