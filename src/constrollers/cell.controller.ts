import { FastifyInstance } from 'fastify'
import { createCellService } from '../services/cell.service'

export default async function cellController(server: FastifyInstance) {
  server.post('/', createCellService)
}
