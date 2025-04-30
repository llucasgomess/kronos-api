import { prisma } from '../lib/prisma-client'

export const getCellByIdwithAlocationsModel = async (celaId: string) => {
  return await prisma.cela.findUnique({
    where: { id: celaId },
    include: { alocacoes: true },
  })
}

export const getAllCellsModel = async () => {
  return await prisma.cela.findMany({
    include: { alocacoes: true },
  })
}

export const createCellModel = async (
  numero: number,
  capacidade: number,
  pavilhao: string
) => {
  return await prisma.cela.create({
    data: {
      numero,
      capacidade,
      pavilhao,
    },
  })
}

export const getCellByIdModel = async (numero: number) => {
  return await prisma.cela.findUnique({ where: { numero } })
}
export const getCellByIdUUiModel = async (id: string) => {
  return await prisma.cela.findUnique({
    where: { id },
    include: { alocacoes: true },
  })
}
