/*
  Warnings:

  - You are about to drop the column `gradeCategoryId` on the `Test` table. All the data in the column will be lost.
  - You are about to drop the column `subjectCategoryId` on the `Test` table. All the data in the column will be lost.
  - Added the required column `subjectId` to the `Test` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Test" DROP CONSTRAINT "Test_subjectCategoryId_fkey";

-- AlterTable
ALTER TABLE "Test" DROP COLUMN "gradeCategoryId";
ALTER TABLE "Test" DROP COLUMN "subjectCategoryId";
ALTER TABLE "Test" ADD COLUMN     "grades" INT4[];
ALTER TABLE "Test" ADD COLUMN     "subjectId" STRING NOT NULL;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
