import { FastifyInstance } from 'fastify'
import z from 'zod'
import { permission } from '../middlewares/permission.middleware'
import {
  createTransferPrisonerService,
  deleteTransferPrisonerService,
  getAllTransferPrisonerService,
  updateTransferPrisonerService,
} from '../services/transfer.service'

export default async function transferController(server: FastifyInstance) {
  server.post(
    '/',
    {
      preHandler: permission(['ADM', 'INSP']),
      schema: {
        summary: 'Rota para transferencia',
        tags: ['Transferências'],
        body: z.object({
          detentoId: z.string().uuid(),
          celaDestinoId: z.string().uuid(),
        }),
        // params: detentoParamsSchema,
        response: {
          201: z.object({ message: z.string() }),
          404: z.object({ message: z.string() }),
          500: z.object({ error: z.string() }),
        },
      },
    },
    createTransferPrisonerService
  ),
    server.get(
      '/',
      {
        preHandler: permission(['ADM', 'INSP']),
        schema: {
          summary: 'Rota para buscar todas as transferencias',
          tags: ['Transferências'],
          response: {
            200: z.object({ message: z.string() }),
            500: z.object({ error: z.string() }),
          },
        },
      },
      getAllTransferPrisonerService
    ),
    server.delete(
      '/:id',
      {
        preHandler: permission(['ADM']),
        schema: {
          summary: 'Rota para deletar a Transferências',
          tags: ['Transferências'],
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
      deleteTransferPrisonerService
    )
  server.put(
    '/:id',
    {
      preHandler: permission(['ADM']),
      schema: {
        summary: 'Rota para atualizar a transferencias',
        tags: ['Transferências'],
        body: z.object({
          celaDestinoId: z.string().uuid(),
        }),
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          200: z.object({ message: z.string() }),
          400: z.object({ message: z.string() }),
          404: z.object({ message: z.string() }),
          500: z.object({ error: z.string() }),
        },
      },
    },
    updateTransferPrisonerService
  )
}
