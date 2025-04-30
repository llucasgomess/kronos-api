/*
  Warnings:

  - Added the required column `email` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Alocacao" DROP CONSTRAINT "Alocacao_detentoId_fkey";

-- DropForeignKey
ALTER TABLE "Infracao" DROP CONSTRAINT "Infracao_detentoId_fkey";

-- DropForeignKey
ALTER TABLE "Transferencia" DROP CONSTRAINT "Transferencia_detentoId_fkey";

-- DropForeignKey
ALTER TABLE "Visita" DROP CONSTRAINT "Visita_detentoId_fkey";

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "email" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Alocacao" ADD CONSTRAINT "Alocacao_detentoId_fkey" FOREIGN KEY ("detentoId") REFERENCES "Detento"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Infracao" ADD CONSTRAINT "Infracao_detentoId_fkey" FOREIGN KEY ("detentoId") REFERENCES "Detento"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transferencia" ADD CONSTRAINT "Transferencia_detentoId_fkey" FOREIGN KEY ("detentoId") REFERENCES "Detento"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visita" ADD CONSTRAINT "Visita_detentoId_fkey" FOREIGN KEY ("detentoId") REFERENCES "Detento"("id") ON DELETE CASCADE ON UPDATE CASCADE;
