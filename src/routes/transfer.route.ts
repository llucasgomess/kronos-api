import { FastifyInstance } from 'fastify'
import transferController from '../constrollers/transfer.controller'

export default async function transferRoutes(server: FastifyInstance) {
  server.register(transferController, { prefix: '/transfer' })
}
