import { FastifyInstance } from 'fastify'
import z from 'zod'
import { permission } from '../middlewares/permission.middleware'
import {
  createCellService,
  getAllCellService,
  getCellByIdAllPrisionersService,
  getCellInfoByIdService,
} from '../services/cell.service'

export default async function cellController(server: FastifyInstance) {
  server.post(
    '/',
    {
      preHandler: permission(['ADM']),
      schema: {
        summary: 'Rota para criar cela',
        tags: ['Celas'],
        body: z.object({
          numero: z.number(),
          capacidade: z.number(),
          pavilhao: z.string(),
        }),
        response: {
          200: z.object({
            id: z.string().uuid(),
            celaId: z.string().uuid(),
            detentoId: z.string().uuid(),
            dataAlocacao: z.date(),
          }),
          201: z.object({
            id: z.string().uuid(),
            numero: z.number(),
            capacidade: z.number(),
            pavilhao: z.string(),
          }),
          400: z.object({ error: z.string() }),
          500: z.object({ error: z.string() }),
        },
      },
    },
    createCellService
  ),
    server.get(
      '/',
      {
        preHandler: permission(['ADM', 'INSP']),
        schema: {
          summary: 'Rota buscar todas as celas',
          tags: ['Celas'],
        },
      },
      getAllCellService
    ),
    server.get(
      '/:id/presos',
      {
        preHandler: permission(['ADM', 'INSP']),
        schema: {
          summary: 'Rota buscar todos os presos da cela',
          tags: ['Celas'],
        },
      },
      getCellByIdAllPrisionersService
    ),
    server.get(
      '/:id',
      {
        preHandler: permission(['ADM', 'INSP']),
        schema: {
          summary: 'Rota para buscar as informações da cela',
          tags: ['Celas'],
        },
      },
      getCellInfoByIdService
    )
}
