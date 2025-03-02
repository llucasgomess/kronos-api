import { FastifyInstance } from 'fastify'
import {
  createVisitsService,
  deleteVisitsService,
  getAllVisitsService,
  updateVisitsService,
} from '../services/visits.service'
import { validations } from '../validations/visits'

export default async function visitsController(server: FastifyInstance) {
  server.post('/', validations.visits.create, createVisitsService),
    server.get('/', validations.visits.getAll, getAllVisitsService),
    server.delete('/:id', validations.visits.delete, deleteVisitsService),
    server.put('/:id', validations.visits.update, updateVisitsService)
}
