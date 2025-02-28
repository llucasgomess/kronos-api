import { FastifyInstance } from 'fastify'
import infringementController from '../constrollers/infringement.controller.js'

export default async function infringementRoutes(server: FastifyInstance) {
  server.register(infringementController, { prefix: '/infringement' })
}
