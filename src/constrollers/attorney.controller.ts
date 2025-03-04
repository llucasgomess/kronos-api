import { FastifyInstance } from 'fastify'
import { permission } from '../middlewares/permission.middleware'
import {
  createAttorneyService,
  deleteAttorneyService,
  getAllAttorneyService,
  getByIdAttorneyService,
  updateAttorneyService,
} from '../services/attorney.service'

export default async function attorneyController(server: FastifyInstance) {
  server.post(
    '/',
    { preHandler: permission(['ADM', 'INSP']) },
    createAttorneyService
  ),
    server.get(
      '/',
      { preHandler: permission(['ADM', 'INSP']) },
      getAllAttorneyService
    ),
    server.get(
      '/:id',
      { preHandler: permission(['ADM', 'INSP']) },
      getByIdAttorneyService
    ),
    server.delete(
      '/:id',
      { preHandler: permission(['ADM', 'INSP']) },
      deleteAttorneyService
    ),
    server.put(
      '/:id',
      { preHandler: permission(['ADM', 'INSP']) },
      updateAttorneyService
    )
}
