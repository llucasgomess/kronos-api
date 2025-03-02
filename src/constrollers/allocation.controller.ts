import { FastifyInstance } from 'fastify'
import {
  createAllocationService,
  deleteAllocationService,
  getAllAllocationService,
} from '../services/allocation.service'
import { validations } from '../validations/allocation'

export default async function allocationController(server: FastifyInstance) {
  server.post('/', validations.allocation.create, createAllocationService),
    server.get('/', validations.allocation.getAll, getAllAllocationService),
    server.delete(
      '/:id',
      validations.allocation.delete,
      deleteAllocationService
    )
}
