import { FastifyInstance } from 'fastify'
import { permission } from '../middlewares/permission.middleware'
import { createUserService } from '../services/user.service'

export default async function userController(server: FastifyInstance) {
  server.post(
    '/register',
    { preHandler: permission(['ADM']) },
    createUserService
  )
}
