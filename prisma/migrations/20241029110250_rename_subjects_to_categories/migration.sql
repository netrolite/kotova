/*
  Warnings:

  - You are about to drop the column `subjectId` on the `Test` table. All the data in the column will be lost.
  - You are about to drop the `Subject` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Test" DROP CONSTRAINT "Test_subjectId_fkey";

-- AlterTable
ALTER TABLE "Test" DROP COLUMN "subjectId",
ADD COLUMN     "categoryId" TEXT;

-- DropTable
DROP TABLE "Subject";

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
