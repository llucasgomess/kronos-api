import { FastifyInstance } from 'fastify'
import { permission } from '../middlewares/permission.middleware'
import { createCellService } from '../services/cell.service'

export default async function cellController(server: FastifyInstance) {
  server.post('/', { preHandler: permission(['ADM']) }, createCellService)
}
