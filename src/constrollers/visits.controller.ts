import { FastifyInstance } from 'fastify'
import { permission } from '../middlewares/permission.middleware'
import {
  createVisitsService,
  deleteVisitsService,
  getAllVisitsService,
  updateVisitsService,
} from '../services/visits.service'

export default async function visitsController(server: FastifyInstance) {
  server.post('/', { preHandler: permission(['ADM']) }, createVisitsService),
    server.get('/', { preHandler: permission(['ADM']) }, getAllVisitsService),
    server.delete(
      '/:id',
      { preHandler: permission(['ADM']) },
      deleteVisitsService
    ),
    server.put('/:id', { preHandler: permission(['ADM']) }, updateVisitsService)
}
