import { FastifyInstance } from 'fastify'
import {
  createTransferPrisonerService,
  deleteTransferPrisonerService,
  getAllTransferPrisonerService,
  updateTransferPrisonerService,
} from '../services/transfer.service'
import { validations } from '../validations/transfer'

export default async function transferController(server: FastifyInstance) {
  server.post('/', validations.transfer.create, createTransferPrisonerService),
    server.get('/', validations.transfer.getAll, getAllTransferPrisonerService),
    server.delete(
      '/:id',
      validations.transfer.delete,
      deleteTransferPrisonerService
    )
  server.put('/:id', validations.transfer.update, updateTransferPrisonerService)
}
