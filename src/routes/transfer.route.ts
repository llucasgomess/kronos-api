import { FastifyInstance } from 'fastify'
import transferController from '../constrollers/transfer.controller.js'

export default async function transferRoutes(server: FastifyInstance) {
  server.register(transferController, { prefix: '/transfer' })
}
