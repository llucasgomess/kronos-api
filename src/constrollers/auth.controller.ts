import { FastifyInstance } from 'fastify'
import { loginService } from '../services/auth.service'

export default async function authController(server: FastifyInstance) {
  server.post('/', loginService)
}
