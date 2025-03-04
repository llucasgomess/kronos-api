import { FastifyInstance } from 'fastify'
import { loginService } from '../services/auth.service'

export default async function loginController(server: FastifyInstance) {
  server.post('/', loginService)
}
