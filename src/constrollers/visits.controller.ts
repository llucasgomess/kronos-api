import { FastifyInstance } from 'fastify'
import z from 'zod'
import { permission } from '../middlewares/permission.middleware'
import {
  createVisitsService,
  deleteVisitsService,
  getAllVisitsService,
  updateVisitsService,
} from '../services/visits.service'

export default async function visitsController(server: FastifyInstance) {
  server.post(
    '/',
    {
      preHandler: permission(['ADM']),
      schema: {
        summary: 'Rota para Registra Visitas',
        tags: ['Visitas'],
        body: z.object({
          detentoId: z.string().uuid(),
          visitanteId: z.string().uuid(),
          advogadoId: z.string().uuid(),
          dataVisita: z.date(),
        }),
        response: {
          200: z.object({
            id: z.string().uuid(),
            celaId: z.string().uuid(),
            detentoId: z.string().uuid(),
            dataAlocacao: z.date(),
          }),
          201: z.object({ message: z.string() }),
          500: z.object({ error: z.string() }),
        },
      },
    },
    createVisitsService
  ),
    server.get(
      '/',
      {
        preHandler: permission(['ADM']),
        schema: {
          summary: 'Rota para buscar todos os  Registros de Visitas',
          tags: ['Visitas'],
        },
      },
      getAllVisitsService
    ),
    server.delete(
      '/:id',
      {
        preHandler: permission(['ADM']),
        schema: {
          summary: 'Rota para deletar o Registro de Visitas',
          tags: ['Visitas'],
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
      deleteVisitsService
    ),
    server.put(
      '/:id',
      {
        preHandler: permission(['ADM']),
        schema: {
          summary: 'Rota para atualizar registro de visitas',
          tags: ['Visitas'],
          body: z.object({
            dataVisita: z.date(),
          }),
          params: z.object({
            id: z.string().uuid(),
          }),
          response: {
            200: z.object({
              detentoId: z.string().uuid(),
              id: z.string().uuid(),
              visitanteId: z.string().uuid(),
              advogadoId: z.string().uuid(),
              dataVisita: z.date(),
            }),
            500: z.object({ error: z.string() }),
          },
        },
      },
      updateVisitsService
    )
}
