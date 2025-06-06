import { FastifyInstance } from 'fastify'
import z from 'zod'
import { permission } from '../middlewares/permission.middleware'
import {
  createAllocationService,
  deleteAllocationService,
  getAllAllocationService,
  putAllocationService,
} from '../services/allocation.service'

const alocacaoSchema = z.array(
  z.object({
    cela: z.object({
      id: z.string().uuid(), // Se for um UUID
      numero: z.number(),
      capacidade: z.number(),
      pavilhao: z.string(),
    }),
    detento: z.object({
      id: z.string().uuid(), // Se for um UUID
      nome: z.string(),
      idade: z.number(),
      cpf: z.string().length(11), // CPF sem pontuação
      filiacao: z.string().nullable(),
      estadoCivil: z.string().nullable(),
      foto: z.string().nullable(),
      reincidencia: z.boolean(),
      createdAt: z.preprocess((arg) => new Date(arg as string), z.date()), // Converte string para Date
      updatedAt: z.preprocess((arg) => new Date(arg as string), z.date()),
    }),
  })
)

export default async function allocationController(server: FastifyInstance) {
  server.post(
    '/',
    {
      preHandler: permission(['ADM', 'DIR', 'INSP']),
      schema: {
        summary: 'Rota para criar uma alocação',
        tags: ['Alocações'],
        body: z.object({
          celaId: z.string().uuid(),
          detentoId: z.string().uuid(),
        }),
        response: {
          201: z.object({
            message: z.string(),
            alocacao: z.object({
              id: z.string().uuid(),
              detentoId: z.string().uuid(),
              celaId: z.string().uuid(),
              dataAlocacao: z.string().datetime(),
            }),
          }),
          400: z.object({ error: z.string() }),
          404: z.object({ error: z.string() }),
        },
      },
    },
    createAllocationService
  ),
    server.get(
      '/',
      {
        preHandler: permission(['ADM', 'DIR', 'INSP']),
        schema: {
          summary: 'Rota para buscar todos as alocações',
          tags: ['Alocações'],
          response: {
            200: alocacaoSchema,
          },
        },
      },
      getAllAllocationService
    ),
    server.delete(
      '/:id',
      {
        preHandler: permission(['ADM', 'DIR', 'INSP']),
        schema: {
          summary: 'Rota para deletar o presidiario',
          tags: ['Alocações'],
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
      deleteAllocationService
    ),
    server.put(
      '/:id',
      {
        preHandler: permission(['ADM', 'DIR', 'INSP']),
        schema: {
          summary: 'Rota para atualizar o alocação',
          tags: ['Alocações'],
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
      putAllocationService
    )
}
