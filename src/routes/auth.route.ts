import { FastifyInstance } from 'fastify'
import authController from '../constrollers/auth.controller'

export default async function authRoutes(server: FastifyInstance) {
  server.register(authController, { prefix: '/login' })
}
