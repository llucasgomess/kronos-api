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
  allocation: {
    create: {
      schema: {
        summary: 'Rota para criar uma alocação',
        tags: ['Alocações'],
        body: z.object({
          celaId: z.string().uuid(),
          detentoId: z.string().uuid(),
        }),
        // params: detentoParamsSchema,
        response: {
          200: z.object({
            id: z.string().uuid(),
            celaId: z.string().uuid(),
            detentoId: z.string().uuid(),
            dataAlocacao: z.date(),
          }),
          201: z.object({
            id: z.string().uuid(),
            celaId: z.string().uuid(),
            detentoId: z.string().uuid(),
            dataAlocacao: z.date(),
          }),
          400: z.object({ error: z.string() }),
          404: z.object({ message: z.string() }),
          500: z.object({ error: z.string() }),
        },
      },
    },
    getAll: {
      schema: {
        summary: 'Rota para buscar todos as alocações',
        tags: ['Alocações'],
      },
    },

    delete: {
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
  },
}
