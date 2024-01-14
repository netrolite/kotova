-- AlterTable
ALTER TABLE "TestResultAnswerOption" ADD COLUMN     "testQuestionOptionId" STRING;

-- AddForeignKey
ALTER TABLE "TestResultAnswerOption" ADD CONSTRAINT "TestResultAnswerOption_testQuestionOptionId_fkey" FOREIGN KEY ("testQuestionOptionId") REFERENCES "TestQuestionOption"("id") ON DELETE SET NULL ON UPDATE CASCADE;
