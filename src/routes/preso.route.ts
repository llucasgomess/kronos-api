import { FastifyInstance } from 'fastify'
import prisonersController from '../constrollers/preso.controller'

export default async function prisonersRoutes(server: FastifyInstance) {
  server.register(prisonersController, { prefix: '/prisoner' })
}
