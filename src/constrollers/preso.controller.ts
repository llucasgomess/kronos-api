import { FastifyInstance } from 'fastify'
import { permission } from '../middlewares/permission.middleware'
import {
  createPrisonerService,
  deletePrisonerService,
  listPrisonerService,
  searchPrisonerService,
  updatePrisonerService,
} from '../services/preso.service'

export default async function prisonersController(server: FastifyInstance) {
  server.post('/', { preHandler: permission(['ADM']) }, createPrisonerService),
    server.get(
      '/',
      { preHandler: [permission(['ADM', 'INSP'])] },
      listPrisonerService
    ),
    server.put(
      '/:id',
      { preHandler: permission(['ADM']) },
      updatePrisonerService
    ),
    server.get(
      '/:id',
      { preHandler: permission(['ADM', 'INSP']) },
      searchPrisonerService
    ),
    server.delete(
      '/:id',
      { preHandler: permission(['ADM']) },
      deletePrisonerService
    )
}
