import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import {
  createPrisonerService,
  deletePrisonerService,
  listPrisonerService,
  searchPrisonerService,
  updatePrisonerService,
} from '../services/preso.service'

// Definição dos Schemas Zod
const detentoParamsSchema = z.object({
  id: z.string().uuid(),
})

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

// Adaptando o Fastify Schema para Swagger
const detentoSchemas = {
  body: detentoBodySchema,
  params: detentoParamsSchema,
  response: {
    200: z.object({
      message: z.string(),
      detento: detentoBodySchema.optional(),
    }),
    201: z.object({
      message: z.string(),
      detento: detentoBodySchema,
    }),
    404: z.object({ message: z.string() }),
    500: z.object({ error: z.string() }),
  },
}

export default async function prisonersController(server: FastifyInstance) {
  server.post(
    '/',
    {
      schema: {
        summary: 'Rota para adicionar presidiario',
        tags: ['presos'],
        ...detentoSchemas,
      },
    },
    createPrisonerService
  ),
    server.get(
      '/',
      {
        schema: {
          summary: 'Rota para buscar todos os presidiario',
          tags: ['presos'],
          response: {
            200: z.array(detentoBodySchema),
          },
        },
      },
      listPrisonerService
    ),
    server.put(
      '/:id',
      {
        schema: {
          summary: 'Rota para atualizar os dados do presidiario',
          tags: ['presos'],
          body: detentoBodySchema.partial(), // Permite atualização parcial
          params: detentoParamsSchema,
          response: detentoSchemas.response,
        },
      },
      updatePrisonerService
    ),
    server.get(
      '/:id',
      {
        schema: {
          summary: 'Rota para buscar deteteminado presidiario',
          tags: ['presos'],
          params: detentoParamsSchema,
          response: detentoSchemas.response,
        },
      },
      searchPrisonerService
    ),
    server.delete(
      '/:id',
      {
        schema: {
          summary: 'Rota para deletar o presidiario',
          tags: ['presos'],
          params: detentoParamsSchema,
          response: detentoSchemas.response,
        },
      },
      deletePrisonerService
    )
}
