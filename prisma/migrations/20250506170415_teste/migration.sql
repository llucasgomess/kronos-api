/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `Visitante` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpf` to the `Visitante` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Visita" DROP CONSTRAINT "Visita_advogadoId_fkey";

-- DropForeignKey
ALTER TABLE "Visita" DROP CONSTRAINT "Visita_visitanteId_fkey";

-- AlterTable
ALTER TABLE "Visita" ALTER COLUMN "detentoId" DROP NOT NULL,
ALTER COLUMN "visitanteId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Visitante" ADD COLUMN     "cpf" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Visitante_cpf_key" ON "Visitante"("cpf");

-- AddForeignKey
ALTER TABLE "Visita" ADD CONSTRAINT "Visita_visitanteId_fkey" FOREIGN KEY ("visitanteId") REFERENCES "Visitante"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visita" ADD CONSTRAINT "Visita_advogadoId_fkey" FOREIGN KEY ("advogadoId") REFERENCES "Advogado"("id") ON DELETE CASCADE ON UPDATE CASCADE;
