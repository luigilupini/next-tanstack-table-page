-- CreateEnum
CREATE TYPE "Severity" AS ENUM ('Critical', 'High', 'Medium', 'Low', 'None');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Reported', 'Escalated', 'Confirmed', 'Paid', 'Closed');

-- CreateEnum
CREATE TYPE "ReportType" AS ENUM ('Blockchain', 'SmartContract', 'WebsiteApplication');

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "severity" "Severity" NOT NULL,
    "status" "Status" NOT NULL,
    "type" "ReportType" NOT NULL,
    "projectId" INTEGER NOT NULL,
    "whiteHatId" INTEGER NOT NULL,
    "submissionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WhiteHat" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "WhiteHat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_whiteHatId_fkey" FOREIGN KEY ("whiteHatId") REFERENCES "WhiteHat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
