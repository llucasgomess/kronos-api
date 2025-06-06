import { prisma } from '../lib/prisma-client'

export const createVisitModel = async (
  nome: string,
  cpf: string,
  idDetento: string,
  grauParentesco: string,
  foto: string
) => {
  return await prisma.visitante.create({
    data: {
      nome,
      cpf,
      detento: { connect: { id: idDetento } },
      grauParentesco,
      foto,
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

export const getByCPFVisitModel = async (cpf: string) => {
  return await prisma.visitante.findUnique({
    where: { cpf },
  })
}

export const updateVisitModel = async (
  id: string,
  nome: string,
  grauParentesco: string,
  foto: string
) => {
  return await prisma.visitante.update({
    where: { id },
    data: { nome, grauParentesco, foto },
  })
}
export const deleteVisitModel = async (id: string) => {
  return await prisma.visitante.delete({ where: { id } })
}
