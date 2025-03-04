import { FastifyInstance } from 'fastify'
import infringementController from '../constrollers/infringement.controller'

export default async function infringementRoutes(server: FastifyInstance) {
  server.register(infringementController, { prefix: '/infringement' })
}
