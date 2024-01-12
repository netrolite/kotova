/*
  Warnings:

  - You are about to drop the column `wrongQuestionsIds` on the `TestResult` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TestResult" DROP COLUMN "wrongQuestionsIds";
ALTER TABLE "TestResult" ADD COLUMN     "wrongAnswerIds" STRING[];
