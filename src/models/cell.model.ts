import { prisma } from '../lib/prisma-client.js'

export const getCellByIdwithAlocationsModel = async (id: string) => {
  return await prisma.cela.findUnique({
    where: { id },
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
  return await prisma.cela.findUnique({ where: { id } })
}
