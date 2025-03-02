import z from 'zod'

export const validations = {
  attorney: {
    create: {
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
            id: z.string().uuid(),
            nome: z.string(),
            oabNumero: z.string(),
          }),
          500: z.object({ error: z.string() }),
        },
      },
    },
    getAll: {
      schema: {
        summary: 'Rota para buscar todos os Advogado',
        tags: ['Advogado'],
      },
    },
    getById: {
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
    update: {
      schema: {
        summary: 'Rota para atualizar Advogados',
        tags: ['Advogado'],
        params: z.object({
          id: z.string().uuid(),
        }),
        body: z.object({
          nome: z.string().trim(),
          oabNumero: z.string().trim(),
        }),
        response: {
          200: z.object({ message: z.string() }),
          500: z.object({ error: z.string() }),
        },
      },
    },

    delete: {
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
  },
}
