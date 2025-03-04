import { prisma } from '../lib/prisma-client'

export const createInfringementModel = async (
  detentoId: string,
  descricao: string
) => {
  return await prisma.infracao.create({
    data: {
      detentoId,
      descricao,
    },
  })
}

export const getAllInfringementModel = async () => {
  return await prisma.infracao.findMany({
    include: {
      detento: true,
    },
  })
}

export const getInfringementByIdModel = async (id: string) => {
  return await prisma.infracao.findUnique({
    where: { id },
  })
}

export const updateInfringementByIdModel = async (
  id: string,
  descricao: string
) => {
  return await prisma.infracao.update({
    where: { id },
    data: { descricao },
  })
}
export const deleteInfringementByIdModel = async (id: string) => {
  return await prisma.infracao.delete({ where: { id } })
}
