import { FastifyInstance } from 'fastify'
import {
  createVisitService,
  deleteVisitService,
  getAllVisitService,
  getByIdVisitService,
  updateVisitService,
} from '../services/visit.service'
import { validations } from '../validations/visit'

export default async function visitController(server: FastifyInstance) {
  server.post('/', validations.visit.create, createVisitService),
    server.get('/', validations.visit.getAll, getAllVisitService),
    server.get('/:id', validations.visit.getById, getByIdVisitService),
    server.delete('/:id', validations.visit.delete, deleteVisitService),
    server.put('/:id', validations.visit.update, updateVisitService)
}
