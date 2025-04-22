import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { userModel } from '../models/user.model'
import { gerarToken, verificarSenha } from '../utils/auth'

export const loginService = async (req: FastifyRequest, res: FastifyReply) => {
  const schemaBody = z.object({
    cpf: z.string().trim(),
    senha: z.string().trim(),
  })

  const { cpf, senha } = schemaBody.parse(req.body)

  try {
    const usuario = await userModel(cpf)

    if (!usuario || !verificarSenha(senha, usuario.senha)) {
      res.status(401).send({ error: 'Credenciais inválidas' })
    }

    const token = gerarToken(usuario?.id!, usuario?.cargo!,usuario?.nome,usuario?.email)
    res.status(201).send({ message: 'Login autenticado', token })
  } catch (error) {
    console.error('Erro ao listar detentos:', error)
    return res.code(500).send({ error: 'Erro interno do servidor' })
  }
}

// Logout (frontend apenas remove o token)
export const logoutService = async (req: FastifyRequest, res: FastifyReply) => {
  res.status(200).send({ message: 'Logout realizado com sucesso' })
}
