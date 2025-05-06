/*
  Warnings:

  - Added the required column `detentoId` to the `Visitante` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Visitante" ADD COLUMN     "detentoId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Visitante" ADD CONSTRAINT "Visitante_detentoId_fkey" FOREIGN KEY ("detentoId") REFERENCES "Detento"("id") ON DELETE CASCADE ON UPDATE CASCADE;
