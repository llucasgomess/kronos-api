import { FastifyInstance } from 'fastify'
import z from 'zod'
import { permission } from '../middlewares/permission.middleware'
import { createUserService } from '../services/user.service'

export default async function userController(server: FastifyInstance) {
  server.post(
    '/register',
    {
      preHandler: permission(['ADM']),
      schema: {
        summary: 'Rota para criar uma usuario',
        tags: ['Usuario'],
        body: z.object({
          nome: z.string().min(5),
          cpf: z.string().trim(),
          cargo: z.enum(['ADM', 'INSP']),
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
  )
}
