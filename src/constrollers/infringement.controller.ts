import { FastifyInstance } from 'fastify'
import z from 'zod'
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
    {
      preHandler: permission(['ADM', 'INSP']),
      schema: {
        summary: 'Rota para criar infrações',
        tags: ['Infrações'],
        body: z.object({
          detentoId: z.string().uuid(),
          descricao: z.string(),
        }),
        // params: detentoParamsSchema,
        response: {
          201: z.object({
            id: z.string().uuid(),
            detentoId: z.string().uuid(),
            descricao: z.string(),
            dataInfracao: z.date(),
          }),
          404: z.object({ message: z.string() }),
          500: z.object({ error: z.string() }),
        },
      },
    },
    createInfringementService
  )
  server.get(
    '/',
    {
      preHandler: permission(['ADM', 'INSP']),
      schema: {
        summary: 'Rota para buscar todas as infrações',
        tags: ['Infrações'],
        response: {
          500: z.object({ error: z.string() }),
        },
      },
    },
    getAllInfringementService
  )
  server.put(
    '/:id',
    {
      preHandler: permission(['ADM', 'INSP']),
      schema: {
        summary: 'Rota para atualizar a descrição da  infrações',
        tags: ['Infrações'],
        body: z.object({
          detentoId: z.string().uuid(),
          descricao: z.string(),
        }),
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          201: z.object({
            id: z.string().uuid(),
            detentoId: z.string().uuid(),
            descricao: z.string(),
            dataInfracao: z.date(),
          }),
          404: z.object({ message: z.string() }),
          500: z.object({ error: z.string() }),
        },
      },
    },
    updateInfringementService
  )
  server.delete(
    '/:id',
    {
      preHandler: permission(['ADM', 'INSP']),
      schema: {
        summary: 'Rota para deletar a infrações',
        tags: ['Infrações'],
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          200: z.object({
            message: z.string(),
          }),
          500: z.object({ error: z.string() }),
        },
      },
    },
    deleteInfringementService
  )
}
