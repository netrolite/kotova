/*
  Warnings:

  - You are about to drop the column `wrongAnswerIds` on the `TestResult` table. All the data in the column will be lost.
  - Added the required column `isCorrect` to the `TestResultAnswer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `testQuestionId` to the `TestResultAnswer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `testResultId` to the `TestResultAnswer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TestResult" DROP COLUMN "wrongAnswerIds";

-- AlterTable
ALTER TABLE "TestResultAnswer" ADD COLUMN     "isCorrect" BOOL NOT NULL;
ALTER TABLE "TestResultAnswer" ADD COLUMN     "testQuestionId" STRING NOT NULL;
ALTER TABLE "TestResultAnswer" ADD COLUMN     "testResultId" STRING NOT NULL;

-- AddForeignKey
ALTER TABLE "TestResultAnswer" ADD CONSTRAINT "TestResultAnswer_testQuestionId_fkey" FOREIGN KEY ("testQuestionId") REFERENCES "TestQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestResultAnswer" ADD CONSTRAINT "TestResultAnswer_testResultId_fkey" FOREIGN KEY ("testResultId") REFERENCES "TestResult"("id") ON DELETE CASCADE ON UPDATE CASCADE;
