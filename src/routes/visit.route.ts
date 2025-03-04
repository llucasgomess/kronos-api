import { FastifyInstance } from 'fastify'
import visitController from '../constrollers/visit.controller'

export default async function visitRoutes(server: FastifyInstance) {
  server.register(visitController, { prefix: '/visit' })
}
