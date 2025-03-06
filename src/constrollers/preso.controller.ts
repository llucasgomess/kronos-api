import { FastifyInstance } from 'fastify'
import z from 'zod'
import { permission } from '../middlewares/permission.middleware'
import {
  createPrisonerService,
  deletePrisonerService,
  listPrisonerService,
  searchPrisonerService,
  updatePrisonerService,
} from '../services/preso.service'

export const detentoBodySchema = z.object({
  nome: z.string().trim().min(5),
  idade: z.number().positive(),
  estadoCivil: z.string().trim(),
  cpf: z
    .string()
    .min(11, 'CPF deve conter no mínimo 11 caracteres')
    .max(14, 'CPF deve conter no mínimo 14 caracteres'), // Validação do CPF já foi feita no service
  filiacao: z.string().optional(),
  foto: z.string().optional(),
  reincidencia: z.boolean().optional(),
})

export default async function prisonersController(server: FastifyInstance) {
  server.post(
    '/',
    {
      preHandler: permission(['ADM']),
      schema: {
        summary: 'Rota para adicionar presidiario',
        tags: ['Presos'],
        body: z.object({
          nome: z.string().trim().min(5),
          idade: z.number().positive(),
          estadoCivil: z.string().trim(),
          cpf: z
            .string()
            .min(11, 'CPF deve conter no mínimo 11 caracteres')
            .max(14, 'CPF deve conter no mínimo 14 caracteres'), // Validação do CPF já foi feita no service
          filiacao: z.string().optional(),
          foto: z.string().optional(),
          reincidencia: z.boolean().optional(),
        }),
        response: {
          201: z.object({
            message: z.string(),
            detento: z.object({
              id: z.string().uuid(),
              nome: z.string().trim().min(5),
              idade: z.number().positive(),
              estadoCivil: z.string().trim(),
              cpf: z.string(),
              filiacao: z.string().optional(),
              foto: z.string().optional(),
              reincidencia: z.boolean().optional(),
              createdAt: z.date(),
              updatedAt: z.date(),
            }), // Retorno esperado
          }),
          400: z.object({
            error: z.string(),
          }),
          409: z.object({
            error: z.string(),
          }),
          500: z.object({
            error: z.string(),
          }),
        },
      },
    },
    createPrisonerService
  ),
    server.get(
      '/',
      {
        preHandler: [permission(['ADM', 'INSP'])],
        schema: {
          summary: 'Rota para buscar todos os presidiario',
          tags: ['Presos'],
        },
      },
      listPrisonerService
    ),
    server.put(
      '/:id',
      {
        preHandler: permission(['ADM']),
        schema: {
          summary: 'Rota para atualizar os dados do presidiario',
          tags: ['Presos'],
          params: z.object({ id: z.string().uuid() }),
          response: {
            200: z.object({
              message: z.string(),
              detento: detentoBodySchema.optional(),
            }),
            404: z.object({ message: z.string() }),
            500: z.object({ error: z.string() }),
          },
        },
      },
      updatePrisonerService
    ),
    server.get(
      '/:id',
      {
        preHandler: permission(['ADM', 'INSP']),
        schema: {
          summary: 'Rota para buscar deteteminado presidiario',
          tags: ['Presos'],
          params: z.object({ id: z.string().uuid() }),
          response: {
            200: z.object({
              message: z.string(),
              detento: detentoBodySchema.optional(),
            }),
            404: z.object({ message: z.string() }),
            500: z.object({ error: z.string() }),
          },
        },
      },
      searchPrisonerService
    ),
    server.delete(
      '/:id',
      {
        preHandler: permission(['ADM']),
        schema: {
          summary: 'Rota para deletar o presidiario',
          tags: ['Presos'],
          params: z.object({ id: z.string().uuid() }),
          response: {
            200: z.object({ message: z.string() }),
            404: z.object({ message: z.string() }),
            400: z.object({ message: z.string() }),
            500: z.object({ message: z.string() }),
          },
        },
      },
      deletePrisonerService
    )
}
