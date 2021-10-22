/*
  Warnings:

  - You are about to drop the column `assignedById` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `assignedToId` on the `Ticket` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_assignedById_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_assignedToId_fkey";

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "assignedById",
DROP COLUMN "assignedToId",
ADD COLUMN     "assignedByUserId" INTEGER,
ADD COLUMN     "assignedToUserId" INTEGER;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_assignedToUserId_fkey" FOREIGN KEY ("assignedToUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_assignedByUserId_fkey" FOREIGN KEY ("assignedByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
