import { FastifyInstance } from 'fastify'
import z from 'zod'
import { loginService } from '../services/auth.service'

export default async function authController(server: FastifyInstance) {
  server.post(
    '/',
    {
      schema: {
        summary: 'Rota para login',
        tags: ['Login'],
        body: z.object({
          cpf: z.string().trim(),
          senha: z.string().trim(),
        }),
        response: {
          201: z.object({ message: z.string(), token: z.string() }),
          401: z.object({ error: z.string() }),
          500: z.object({ error: z.string() }),
        },
      },
    },
    loginService
  )
}
