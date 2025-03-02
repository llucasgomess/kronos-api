import { FastifyInstance } from 'fastify'
import {
  createPrisonerService,
  deletePrisonerService,
  listPrisonerService,
  searchPrisonerService,
  updatePrisonerService,
} from '../services/preso.service'
import { validations } from '../validations/prisoner'

export default async function prisonersController(server: FastifyInstance) {
  server.post('/', validations.prisioner.create, createPrisonerService),
    server.get('/', validations.prisioner.getAll, listPrisonerService),
    server.put('/:id', validations.prisioner.update, updatePrisonerService),
    server.get('/:id', validations.prisioner.getById, searchPrisonerService),
    server.delete('/:id', validations.prisioner.delete, deletePrisonerService)
}
