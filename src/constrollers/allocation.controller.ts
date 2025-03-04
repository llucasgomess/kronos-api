import { FastifyInstance } from 'fastify'
import { permission } from '../middlewares/permission.middleware'
import {
  createAllocationService,
  deleteAllocationService,
  getAllAllocationService,
} from '../services/allocation.service'

export default async function allocationController(server: FastifyInstance) {
  server.post(
    '/',
    { preHandler: permission(['INSP', 'ADM']) },
    createAllocationService
  ),
    server.get(
      '/',
      { preHandler: permission(['adm']) },
      getAllAllocationService
    ),
    server.delete(
      '/:id',
      { preHandler: permission(['adm']) },
      deleteAllocationService
    )
}
