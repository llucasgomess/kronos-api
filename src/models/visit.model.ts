import { prisma } from '../lib/prisma-client'

export const createVisitModel = async (
  nome: string,
  grauParentesco: string
) => {
  return await prisma.visitante.create({
    data: { nome, grauParentesco },
  })
}
export const getAllVisitModel = async () => {
  return await prisma.visitante.findMany()
}

export const getByIdVisitModel = async (id: string) => {
  return await prisma.visita.findUnique({
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
