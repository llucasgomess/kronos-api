import { FastifyInstance } from 'fastify'
import { createInfringementService } from '../services/infringement.service'
import {
  deleteInfringementService,
  getAllInfringementService,
  updateInfringementService,
} from './../services/infringement.service'

export default async function infringementController(server: FastifyInstance) {
  server.post('/', createInfringementService)
  server.get('/', getAllInfringementService)
  server.put('/:id', updateInfringementService)
  server.delete('/:id', deleteInfringementService)
}
