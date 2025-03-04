import { FastifyInstance } from 'fastify'
import allocationController from '../constrollers/allocation.controller'

export default async function allocationRoutes(server: FastifyInstance) {
  server.register(allocationController, { prefix: '/allocation' })
}
