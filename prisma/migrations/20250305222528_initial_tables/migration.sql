-- CreateTable
CREATE TABLE "Detento" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "cpf" TEXT NOT NULL,
    "filiacao" TEXT,
    "estadoCivil" TEXT,
    "foto" TEXT,
    "reincidencia" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Detento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cela" (
    "id" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "capacidade" INTEGER NOT NULL,
    "pavilhao" TEXT NOT NULL,

    CONSTRAINT "Cela_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alocacao" (
    "id" TEXT NOT NULL,
    "detentoId" TEXT NOT NULL,
    "celaId" TEXT NOT NULL,
    "dataAlocacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Alocacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Infracao" (
    "id" TEXT NOT NULL,
    "detentoId" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "dataInfracao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Infracao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transferencia" (
    "id" TEXT NOT NULL,
    "detentoId" TEXT NOT NULL,
    "celaOrigemId" TEXT NOT NULL,
    "celaDestinoId" TEXT NOT NULL,
    "dataTransferencia" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transferencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visita" (
    "id" TEXT NOT NULL,
    "detentoId" TEXT NOT NULL,
    "visitanteId" TEXT NOT NULL,
    "dataVisita" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "advogadoId" TEXT,

    CONSTRAINT "Visita_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visitante" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "grauParentesco" TEXT,

    CONSTRAINT "Visitante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Advogado" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "oabNumero" TEXT NOT NULL,

    CONSTRAINT "Advogado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "nivelPermissao" INTEGER NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Detento_cpf_key" ON "Detento"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Cela_numero_key" ON "Cela"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "Advogado_oabNumero_key" ON "Advogado"("oabNumero");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_cpf_key" ON "Usuario"("cpf");

-- AddForeignKey
ALTER TABLE "Alocacao" ADD CONSTRAINT "Alocacao_detentoId_fkey" FOREIGN KEY ("detentoId") REFERENCES "Detento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alocacao" ADD CONSTRAINT "Alocacao_celaId_fkey" FOREIGN KEY ("celaId") REFERENCES "Cela"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Infracao" ADD CONSTRAINT "Infracao_detentoId_fkey" FOREIGN KEY ("detentoId") REFERENCES "Detento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transferencia" ADD CONSTRAINT "Transferencia_detentoId_fkey" FOREIGN KEY ("detentoId") REFERENCES "Detento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transferencia" ADD CONSTRAINT "Transferencia_celaOrigemId_fkey" FOREIGN KEY ("celaOrigemId") REFERENCES "Cela"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transferencia" ADD CONSTRAINT "Transferencia_celaDestinoId_fkey" FOREIGN KEY ("celaDestinoId") REFERENCES "Cela"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visita" ADD CONSTRAINT "Visita_detentoId_fkey" FOREIGN KEY ("detentoId") REFERENCES "Detento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visita" ADD CONSTRAINT "Visita_visitanteId_fkey" FOREIGN KEY ("visitanteId") REFERENCES "Visitante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visita" ADD CONSTRAINT "Visita_advogadoId_fkey" FOREIGN KEY ("advogadoId") REFERENCES "Advogado"("id") ON DELETE SET NULL ON UPDATE CASCADE;
