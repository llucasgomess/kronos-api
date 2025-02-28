import { FastifyInstance } from 'fastify'
import cellController from '../constrollers/cell.controller'

export default async function cellRoutes(server: FastifyInstance) {
  server.register(cellController, { prefix: '/cell' })
}
