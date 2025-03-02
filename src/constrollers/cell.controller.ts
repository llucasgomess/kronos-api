import { FastifyInstance } from 'fastify'
import { createCellService } from '../services/cell.service'
import { validations } from '../validations/cell'

export default async function cellController(server: FastifyInstance) {
  server.post('/', validations.cell.create, createCellService)
}
