import { FastifyInstance } from 'fastify'
import z from 'zod'
import { permission } from '../middlewares/permission.middleware'
import {
  createAttorneyService,
  deleteAttorneyService,
  getAllAttorneyService,
  getByIdAttorneyService,
  updateAttorneyService,
} from '../services/attorney.service'

export default async function attorneyController(server: FastifyInstance) {
  server.post(
    '/',
    {
      preHandler: permission(['ADM', 'DIR', 'INSP']),
      schema: {
        summary: 'Rota para criar Advogado',
        tags: ['Advogado'],
        body: z.object({
          nome: z.string().trim(),
          oabNumero: z.string().trim(),
        }),
        // params: detentoParamsSchema,
        response: {
          201: z.object({
            message: z.string(),
          }),
          500: z.object({ error: z.string() }),
        },
      },
    },
    createAttorneyService
  ),
    server.get(
      '/',
      {
        preHandler: permission(['ADM', 'DIR', 'INSP']),
        schema: {
          summary: 'Rota para buscar todos os Advogado',
          tags: ['Advogado'],
        },
      },
      getAllAttorneyService
    ),
    server.get(
      '/:id',
      {
        preHandler: permission(['ADM', 'DIR', 'INSP']),
        schema: {
          summary: 'Rota para buscar Advogado por id',
          tags: ['Advogado'],
          params: z.object({
            id: z.string().uuid(),
          }),
          response: {
            201: z.object({
              id: z.string().uuid(),
              nome: z.string(),
              oabNumero: z.string(),
            }),
            500: z.object({ error: z.string() }),
          },
        },
      },
      getByIdAttorneyService
    ),
    server.delete(
      '/:id',
      {
        preHandler: permission(['ADM', 'DIR', 'INSP']),
        schema: {
          summary: 'Rota para deletar o Advogado',
          tags: ['Advogado'],
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
      deleteAttorneyService
    ),
    server.put(
      '/:id',
      {
        preHandler: permission(['ADM', 'DIR', 'INSP']),
        schema: {
          summary: 'Rota para atualizar Advogados',
          tags: ['Advogado'],
          params: z.object({
            id: z.string().uuid(),
          }),
          body: z.object({
            nome: z.string().trim().optional(),
            oabNumero: z.string().trim().optional(),
          }),
          response: {
            200: z.object({ message: z.string() }),
            500: z.object({ error: z.string() }),
          },
        },
      },
      updateAttorneyService
    )
}
