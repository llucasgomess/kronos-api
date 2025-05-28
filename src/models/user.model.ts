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
  email: string,
  cargo: string,
  nivelPermissao: number,
  senha: string
) => {
  return await prisma.usuario.create({
    data: {
      nome,
      email,
      cpf,
      cargo,
      nivelPermissao,
      senha,
    },
  })
}

export const getAllUsersModel = async () => {
  return await prisma.usuario.findMany()
}

export const deleteUserModel = async (cpf: string) => {
  return await prisma.usuario.delete({
    where: { cpf },
  })
}
