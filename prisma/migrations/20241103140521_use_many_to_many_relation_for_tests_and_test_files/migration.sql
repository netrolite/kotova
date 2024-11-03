-- DropForeignKey
ALTER TABLE "TestFile" DROP CONSTRAINT "TestFile_testId_fkey";

-- DropIndex
DROP INDEX "TestFile_key_key";

-- AlterTable
ALTER TABLE "TestFile" ADD CONSTRAINT "TestFile_pkey" PRIMARY KEY ("key");

-- CreateTable
CREATE TABLE "_TestToTestFile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TestToTestFile_AB_unique" ON "_TestToTestFile"("A", "B");

-- CreateIndex
CREATE INDEX "_TestToTestFile_B_index" ON "_TestToTestFile"("B");

-- AddForeignKey
ALTER TABLE "_TestToTestFile" ADD CONSTRAINT "_TestToTestFile_A_fkey" FOREIGN KEY ("A") REFERENCES "Test"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TestToTestFile" ADD CONSTRAINT "_TestToTestFile_B_fkey" FOREIGN KEY ("B") REFERENCES "TestFile"("key") ON DELETE CASCADE ON UPDATE CASCADE;
