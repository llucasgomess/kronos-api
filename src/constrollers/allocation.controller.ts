import { FastifyInstance } from 'fastify'
import {
  createAllocationService,
  deleteAllocationService,
  getAllAllocationService,
} from '../services/allocation.service'

export default async function allocationController(server: FastifyInstance) {
  server.post('/', createAllocationService),
    server.get('/', getAllAllocationService),
    server.delete('/:id', deleteAllocationService)
}
