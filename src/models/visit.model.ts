import { prisma } from '../lib/prisma-client'

export const createVisitModel = async (
  nome: string,
  cpf: string,
  grauParentesco: string
) => {
  return await prisma.visitante.create({
    data: {
      nome,
      cpf,
      detento: { connect: { id: '1' } },
      grauParentesco,
    },
  })
}
export const getAllVisitModel = async () => {
  return await prisma.visitante.findMany({
    include: { detento: true },
  })
}

export const getByIdVisitModel = async (id: string) => {
  return await prisma.visitante.findUnique({
    where: { id },
    include: { detento: true },
  })
}
export const updateVisitModel = async (
  id: string,
  nome: string,
  grauParentesco: string
) => {
  return await prisma.visitante.update({
    where: { id },
    data: { nome, grauParentesco },
  })
}
export const deleteVisitModel = async (id: string) => {
  return await prisma.visitante.delete({ where: { id } })
}
