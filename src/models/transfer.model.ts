import { prisma } from '../lib/prisma-client'

export const createTransferPrisonerModel = async (
  detentoId: string,
  celaOrigem: string,
  celaDestinoId: string
) => {
  return await prisma.transferencia.create({
    data: {
      detentoId,
      celaOrigemId: celaOrigem,
      celaDestinoId,
    },
  })
}
export const updateTransferPrisonerModel = async (
  detentoId: string,
  celaDestinoId: string
) => {
  return await prisma.alocacao.update({
    where: { id: detentoId },
    data: { celaId: celaDestinoId },
  })
}
export const getAllTransferPrisonerModel = async () => {
  return await prisma.transferencia.findMany({
    include: {
      detento: true,
      celaOrigem: true,
      celaDestino: true,
    },
  })
}

export const getTransferByIdPrisonerModel = async (trasnferId: string) => {
  return await prisma.alocacao.findUnique({
    where: { id: trasnferId },
  })
}
export const deleteTransferPrisonerModel = async (trasnferId: string) => {
  return await prisma.alocacao.delete({
    where: { id: trasnferId },
  })
}
