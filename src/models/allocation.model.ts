import { prisma } from '../lib/prisma-client'

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
export const getAllocationsByIdDetentoModel = async (detentoId: string) => {
  return await prisma.alocacao.findFirst({ where: { detentoId } })
}
export const getAllocationsByIdModel = async (id: string) => {
  return await prisma.alocacao.findFirst({ where: { id } })
}
