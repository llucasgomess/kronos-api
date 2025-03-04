import { FastifyInstance } from 'fastify'
import userController from '../constrollers/user.controller.js'

export default async function userRoutes(server: FastifyInstance) {
  server.register(userController, { prefix: '/user' })
}
