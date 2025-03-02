import z from 'zod'

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

export const validations = {
  prisioner: {
    create: {
      schema: {
        summary: 'Rota para adicionar presidiario',
        tags: ['Presos'],
        ...detentoSchemas,
      },
    },
    getAll: {
      schema: {
        summary: 'Rota para buscar todos os presidiario',
        tags: ['Presos'],
        response: {
          200: z.array(detentoBodySchema),
        },
      },
    },
    update: {
      schema: {
        summary: 'Rota para atualizar os dados do presidiario',
        tags: ['Presos'],
        body: detentoBodySchema.partial(), // Permite atualização parcial
        params: detentoParamsSchema,
        response: detentoSchemas.response,
      },
    },
    getById: {
      schema: {
        summary: 'Rota para buscar deteteminado presidiario',
        tags: ['Presos'],
        params: detentoParamsSchema,
        response: detentoSchemas.response,
      },
    },
    delete: {
      schema: {
        summary: 'Rota para deletar o presidiario',
        tags: ['Presos'],
        params: detentoParamsSchema,
        response: detentoSchemas.response,
      },
    },
  },
}
