import { FastifyInstance } from 'fastify'
import allocationController from '../constrollers/allocation.controller.js'

export default async function allocationRoutes(server: FastifyInstance) {
  server.register(allocationController, { prefix: '/allocation' })
}
