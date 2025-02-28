import { prisma } from '../lib/prisma-client.js'

export const createAllocationsModel = async (
  detentoId: string,
  celaId: string
) => {
  return await prisma.alocacao.create({
    data: {
      detentoId,
      celaId,
    },
  })
}
export const getAllAllocationsModel = async () => {
  return await prisma.alocacao.findMany({
    include: {
      detento: true,
      cela: true,
    },
  })
}
export const deleteAllocationsModel = async (id: string) => {
  return await prisma.alocacao.delete({ where: { id } })
}
export const getAllocationsByIdModel = async (id: string) => {
  return await prisma.alocacao.findUnique({ where: { id } })
}
