import { prisma } from '../lib/prisma-client'

export const userModel = async (cpf: string) => {
  return await prisma.usuario.findUnique({ where: { cpf } })
}
export const getUserByIdModel = async (cpf: string) => {
  return await prisma.usuario.findUnique({
    where: {
      cpf,
    },
  })
}

export const createUserModel = async (
  nome: string,
  cpf: string,
  cargo: string,
  nivelPermissao: number,
  senha: string
) => {
  return await prisma.usuario.create({
    data: {
      nome,
      cpf,
      cargo,
      nivelPermissao,
      senha,
    },
  })
}
