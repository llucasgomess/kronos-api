import { FastifyInstance } from 'fastify'
import { permission } from '../middlewares/permission.middleware'
import { createInfringementService } from '../services/infringement.service'
import {
  deleteInfringementService,
  getAllInfringementService,
  updateInfringementService,
} from './../services/infringement.service'

export default async function infringementController(server: FastifyInstance) {
  server.post(
    '/',
    { preHandler: permission(['ADM', 'INSP']) },
    createInfringementService
  )
  server.get(
    '/',
    { preHandler: permission(['ADM', 'INSP']) },
    getAllInfringementService
  )
  server.put(
    '/:id',
    { preHandler: permission(['ADM', 'INSP']) },
    updateInfringementService
  )
  server.delete(
    '/:id',
    { preHandler: permission(['ADM', 'INSP']) },
    deleteInfringementService
  )
}
