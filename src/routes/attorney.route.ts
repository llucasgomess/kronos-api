import { FastifyInstance } from 'fastify'
import attorneyController from '../constrollers/attorney.controller.js'

export default async function attorneyRoutes(server: FastifyInstance) {
  server.register(attorneyController, { prefix: '/attorney' })
}
