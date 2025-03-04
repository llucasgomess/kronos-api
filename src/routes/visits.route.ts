import { FastifyInstance } from 'fastify'
import visitsController from '../constrollers/visits.controller'

export default async function visitsRoutes(server: FastifyInstance) {
  server.register(visitsController, { prefix: '/visits' })
}
