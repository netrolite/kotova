-- DropForeignKey
ALTER TABLE "TestResultAnswer" DROP CONSTRAINT "TestResultAnswer_questionId_fkey";

-- AddForeignKey
ALTER TABLE "TestResultAnswer" ADD CONSTRAINT "TestResultAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "TestQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
