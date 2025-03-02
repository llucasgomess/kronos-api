import { FastifyInstance } from 'fastify'
import { createInfringementService } from '../services/infringement.service'
import { validations } from '../validations/infringement'
import {
  deleteInfringementService,
  getAllInfringementService,
  updateInfringementService,
} from './../services/infringement.service'

export default async function infringementController(server: FastifyInstance) {
  server.post('/', validations.infringement.create, createInfringementService)
  server.get('/', validations.infringement.getAll, getAllInfringementService)
  server.put('/:id', validations.infringement.update, updateInfringementService)
  server.delete(
    '/:id',
    validations.infringement.delete,
    deleteInfringementService
  )
}
