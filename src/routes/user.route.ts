import { FastifyInstance } from 'fastify'
import userController from '../constrollers/user.controller'

export default async function userRoutes(server: FastifyInstance) {
  server.register(userController, { prefix: '/user' })
}
