import { FastifyInstance } from 'fastify'
import attorneyController from '../constrollers/attorney.controller'

export default async function attorneyRoutes(server: FastifyInstance) {
  server.register(attorneyController, { prefix: '/attorney' })
}
