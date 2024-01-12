-- RenameForeignKey
ALTER TABLE "TestResultAnswer" RENAME CONSTRAINT "TestResultAnswer_testQuestionId_fkey" TO "TestResultAnswer_questionId_fkey";
