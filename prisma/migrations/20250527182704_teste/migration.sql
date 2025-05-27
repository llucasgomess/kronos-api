/*
  Warnings:

  - You are about to drop the column `advogadoId` on the `Visita` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Visita" DROP CONSTRAINT "Visita_advogadoId_fkey";

-- AlterTable
ALTER TABLE "Visita" DROP COLUMN "advogadoId",
ADD COLUMN     "dataVisitaFim" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Visitante" ADD COLUMN     "foto" TEXT;
