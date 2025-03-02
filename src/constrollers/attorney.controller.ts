import { FastifyInstance } from 'fastify'
import {
  createAttorneyService,
  deleteAttorneyService,
  getAllAttorneyService,
  getByIdAttorneyService,
  updateAttorneyService,
} from '../services/attorney.service'
import { validations } from '../validations/attorney'

export default async function attorneyController(server: FastifyInstance) {
  server.post('/', validations.attorney.create, createAttorneyService),
    server.get('/', validations.attorney.getAll, getAllAttorneyService),
    server.get('/:id', validations.attorney.getById, getByIdAttorneyService),
    server.delete('/:id', validations.attorney.delete, deleteAttorneyService),
    server.put('/:id', validations.attorney.update, updateAttorneyService)
}
