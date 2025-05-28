import { FastifyInstance } from 'fastify'
import z from 'zod'
import { permission } from '../middlewares/permission.middleware'
import {
  createUserService,
  deleteUserService,
  getAllUserService,
} from '../services/user.service'

const usuarioSchema = z.object({
  id: z.string().uuid(),
  nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  cpf: z.string().length(11, 'CPF deve conter exatamente 11 dígitos'),
  cargo: z.enum(['ADM', 'INSP', 'DIR']), // você pode adicionar outros cargos aqui
  nivelPermissao: z.number().int().min(1).max(10),
})

export default async function userController(server: FastifyInstance) {
  server.post(
    '/register',
    {
      preHandler: permission(['ADM', 'DIR', 'INSP']),
      schema: {
        summary: 'Rota para criar uma usuario',
        tags: ['Usuario'],
        body: z.object({
          nome: z.string().min(5),
          cpf: z.string().trim(),
          cargo: z.enum(['ADM', 'DIR', 'INSP']),
          nivelPermissao: z.number(),
          senha: z.string().min(8),
        }),
        response: {
          201: z.object({
            success: z.boolean(),
            message: z.string(),
          }),
          409: z.object({
            success: z.boolean(),
            message: z.string(),
          }),
        },
      },
    },
    createUserService
  ),
    server.get(
      '/list',
      {
        preHandler: permission(['ADM', 'DIR', 'INSP']),
        schema: {
          summary: 'Rota para listar todos os usuarios',
          tags: ['Usuario'],
          response: {
            200: z.array(usuarioSchema),
          },
        },
      },
      getAllUserService
    ),
    server.delete(
      '/:cpf',
      {
        preHandler: permission(['ADM']),
        schema: {
          summary: 'Rota para deletar um usuario',
          tags: ['Usuario'],
          params: z.object({
            cpf: z.string().length(11, 'CPF deve conter exatamente 11 dígitos'),
          }),
        },
      },
      deleteUserService
    )
}
