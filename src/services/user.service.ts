import bcrypt from 'bcryptjs'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import {
  createUserModel,
  deleteUserModel,
  getAllUsersModel,
  getUserByIdModel,
} from '../models/user.model'

// Função para registrar um novo usuário
export const createUserService = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const schemaBody = z.object({
    nome: z.string().min(1, 'Nome é obrigatório'),
    cpf: z
      .string()
      .min(11, 'CPF deve ter no mínimo 11 caracteres')
      .max(14, 'CPF deve ter no máximo 14 caracteres')
      .regex(/^\d{11,14}$/, 'CPF deve conter apenas números'),
    cargo: z.string().min(1, 'Cargo é obrigatório'),
    nivelPermissao: z
      .number()
      .int()
      .min(0, 'Nível de permissão deve ser um número inteiro positivo'),
    senha: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres'),
  })

  const { nome, cpf, cargo, nivelPermissao, senha } = schemaBody.parse(req.body)

  // Verificar se o CPF ou login já estão cadastrados
  const existingUser = await getUserByIdModel(cpf)

  if (existingUser) {
    res.status(409).send({ error: true, message: 'CPF já cadastrado' })
    return
  }
  const nomeArray = nome.split(' ')
  const primeiroNome = nomeArray[0]
  const ultimoNome = nomeArray[nomeArray.length - 1]
  const email = `${primeiroNome
    .toLowerCase()
    .slice(0, 1)}.${ultimoNome.toLowerCase()}@kronos.com.br`

  // Criptografar a senha
  const hashedPassword = await bcrypt.hash(senha, 10)

  // Criar o usuário
  await createUserModel(nome, cpf, email, cargo, nivelPermissao, hashedPassword)

  res.status(201).send({
    success: true,
    message: 'Usuário criado com sucesso!',
  })
}
export const deleteUserService = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const schemaParams = z.object({
    cpf: z.string(),
  })

  const { cpf } = schemaParams.parse(req.params)

  // Verificar se o CPF ou login já estão cadastrados
  const existingUser = await getUserByIdModel(cpf)
  if (!existingUser) {
    return res
      .status(404)
      .send({ success: false, message: 'Usuário não encontrado!' })
  }

  // Deletar o usuário
  await deleteUserModel(cpf)
  // Retornar resposta de sucesso

  res.status(204)
}
export const getAllUserService = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  try {
    const list = await getAllUsersModel()
    if (list.length == 0) {
      res
        .status(200)
        .send({ message: 'Nenhum Usuario se encontra no banco de dados' })
      return
    }
    return res.status(200).send(list)
  } catch (error) {
    console.error('Erro ao listar usuarios:', error)
    return res.status(500).send({ error: 'Erro interno do servidor' })
  }
}
