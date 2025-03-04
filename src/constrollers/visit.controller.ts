import { FastifyInstance } from 'fastify'
import { permission } from '../middlewares/permission.middleware'
import {
  createVisitService,
  deleteVisitService,
  getAllVisitService,
  getByIdVisitService,
  updateVisitService,
} from '../services/visit.service'

export default async function visitController(server: FastifyInstance) {
  server.post(
    '/',
    { preHandler: permission(['ADM', 'INSP']) },
    createVisitService
  ),
    server.get(
      '/',
      { preHandler: permission(['ADM', 'INSP']) },
      getAllVisitService
    ),
    server.get(
      '/:id',
      { preHandler: permission(['ADM', 'INSP']) },
      getByIdVisitService
    ),
    server.delete(
      '/:id',
      { preHandler: permission(['ADM']) },
      deleteVisitService
    ),
    server.put(
      '/:id',
      { preHandler: permission(['ADM', 'INSP']) },
      updateVisitService
    )
}
