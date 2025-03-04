import { FastifyInstance } from 'fastify'
import { permission } from '../middlewares/permission.middleware'
import {
  createTransferPrisonerService,
  deleteTransferPrisonerService,
  getAllTransferPrisonerService,
  updateTransferPrisonerService,
} from '../services/transfer.service'

export default async function transferController(server: FastifyInstance) {
  server.post(
    '/',
    { preHandler: permission(['ADM', 'INSP']) },
    createTransferPrisonerService
  ),
    server.get(
      '/',
      { preHandler: permission(['ADM', 'INSP']) },
      getAllTransferPrisonerService
    ),
    server.delete(
      '/:id',
      { preHandler: permission(['ADM']) },
      deleteTransferPrisonerService
    )
  server.put(
    '/:id',
    { preHandler: permission(['ADM']) },
    updateTransferPrisonerService
  )
}
