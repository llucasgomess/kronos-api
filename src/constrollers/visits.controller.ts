import { FastifyInstance } from 'fastify'
import {
  createVisitsService,
  deleteVisitsService,
  getAllVisitsService,
  updateVisitsService,
} from '../services/visits.service'

export default async function visitsController(server: FastifyInstance) {
  server.post('/', createVisitsService),
    server.get('/', getAllVisitsService),
    server.delete('/:id', deleteVisitsService),
    server.put('/:id', updateVisitsService)
}
