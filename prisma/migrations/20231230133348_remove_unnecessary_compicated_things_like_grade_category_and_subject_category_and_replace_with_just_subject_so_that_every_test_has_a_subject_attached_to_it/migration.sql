/*
  Warnings:

  - You are about to drop the `GradeCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubjectCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Test" DROP CONSTRAINT "Test_gradeCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "Test" DROP CONSTRAINT "Test_subjectCategoryId_fkey";

-- DropTable
DROP TABLE "GradeCategory";

-- DropTable
DROP TABLE "SubjectCategory";

-- CreateTable
CREATE TABLE "Subject" (
    "id" STRING NOT NULL,
    "title" STRING NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_subjectCategoryId_fkey" FOREIGN KEY ("subjectCategoryId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
