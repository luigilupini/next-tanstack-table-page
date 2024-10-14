/*
  Warnings:

  - Added the required column `projectId` to the `WhiteHat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WhiteHat" ADD COLUMN     "projectId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "WhiteHat" ADD CONSTRAINT "WhiteHat_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
