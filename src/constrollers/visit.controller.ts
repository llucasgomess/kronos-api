import { FastifyInstance } from 'fastify'
import z from 'zod'
import { permission } from '../middlewares/permission.middleware'
import {
  createVisitService,
  deleteVisitService,
  getAllVisitService,
  getByIdVisitService,
  updateVisitService,
} from '../services/visit.service'

export default async function visitController(server: FastifyInstance) {
  server.post(
    '/',
    {
      preHandler: permission(['ADM', 'INSP']),
      schema: {
        summary: 'Rota para criar visitante',
        tags: ['Visitante'],
        body: z.object({
          nome: z.string().trim(),
          grauParentesco: z.string().trim(),
        }),
        // params: detentoParamsSchema,
        response: {
          201: z.object({
            id: z.string().uuid(),
            nome: z.string(),
            grauParentesco: z.string(),
          }),
          500: z.object({ error: z.string() }),
        },
      },
    },
    createVisitService
  ),
    server.get(
      '/',
      {
        preHandler: permission(['ADM', 'INSP']),
        schema: {
          summary: 'Rota para buscar todos os visitantes',
          tags: ['Visitante'],
        },
      },
      getAllVisitService
    ),
    server.get(
      '/:id',
      {
        preHandler: permission(['ADM', 'INSP']),
        schema: {
          summary: 'Rota para buscar visitante por id',
          tags: ['Visitante'],
          params: z.object({
            id: z.string().uuid(),
          }),
          response: {
            201: z.object({
              id: z.string().uuid(),
              nome: z.string(),
              grauParentesco: z.string(),
            }),
            500: z.object({ error: z.string() }),
          },
        },
      },
      getByIdVisitService
    ),
    server.delete(
      '/:id',
      {
        preHandler: permission(['ADM']),
        schema: {
          summary: 'Rota para deletar o presidiario',
          tags: ['Visitante'],
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
      deleteVisitService
    ),
    server.put(
      '/:id',
      {
        preHandler: permission(['ADM', 'INSP']),
        schema: {
          summary: 'Rota para atualizar visitante',
          tags: ['Visitante'],
          params: z.object({
            id: z.string().uuid(),
          }),
          body: z.object({
            nome: z.string().trim(),
            grauParentesco: z.string().trim(),
          }),
          response: {
            200: z.object({ message: z.string() }),
            500: z.object({ error: z.string() }),
          },
        },
      },
      updateVisitService
    )
}
