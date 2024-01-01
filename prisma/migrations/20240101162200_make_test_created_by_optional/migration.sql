-- DropForeignKey
ALTER TABLE "Test" DROP CONSTRAINT "Test_createdByUserId_fkey";

-- AlterTable
ALTER TABLE "Test" ALTER COLUMN "createdByUserId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
