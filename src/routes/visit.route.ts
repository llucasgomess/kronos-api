import { FastifyInstance } from 'fastify'
import visitController from '../constrollers/visit.controller.js'

export default async function visitRoutes(server: FastifyInstance) {
  server.register(visitController, { prefix: '/visit' })
}
