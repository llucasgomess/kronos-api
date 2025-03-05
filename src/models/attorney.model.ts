import { prisma } from '../lib/prisma-client'

export const createAttorneyModel = async (nome: string, oabNumero: string) => {
  return await prisma.advogado.create({
    data: { nome, oabNumero },
  })
}
export const getAllAttorneyModel = async () => {
  return await prisma.advogado.findMany()
}
export const getByIdAttorneyModel = async (id: string) => {
  return await prisma.advogado.findUnique({
    where: { id },
    include: { visitas: true },
  })
}
export const getByOabAttorneyModel = async (oabNumero: string) => {
  return await prisma.advogado.findUnique({
    where: { oabNumero },
  })
}
export const updateAttorneyModel = async (
  id: string,
  nome: string,
  oabNumero: string
) => {
  return await prisma.advogado.update({
    where: { id },
    data: { nome, oabNumero },
  })
}
export const deleteAttorneyModel = async (id: string) => {
  return await prisma.advogado.delete({ where: { id } })
}
