import { FastifyInstance } from 'fastify'
import {
  createTransferPrisonerService,
  deleteTransferPrisonerService,
  getAllTransferPrisonerService,
  updateTransferPrisonerService,
} from '../services/transfer.service'

export default async function transferController(server: FastifyInstance) {
  server.post('/', createTransferPrisonerService),
    server.get('/', getAllTransferPrisonerService),
    server.delete('/:id', deleteTransferPrisonerService)
  server.put('/:id', updateTransferPrisonerService)
}
