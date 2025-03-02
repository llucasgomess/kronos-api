import z from 'zod'

export const validations = {
  visit: {
    create: {
      schema: {
        summary: 'Rota para criar visitante',
        tags: ['Visitante'],
        body: z.object({
          nome: z.string().trim(),
          grauParentesco: z.string().trim(),
        }),
        // params: detentoParamsSchema,
        response: {
          201: z.object({
            id: z.string().uuid(),
            nome: z.string(),
            grauParentesco: z.string(),
          }),
          500: z.object({ error: z.string() }),
        },
      },
    },
    getAll: {
      schema: {
        summary: 'Rota para buscar todos os visitantes',
        tags: ['Visitante'],
      },
    },
    getById: {
      schema: {
        summary: 'Rota para buscar visitante por id',
        tags: ['Visitante'],
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          201: z.object({
            id: z.string().uuid(),
            nome: z.string(),
            grauParentesco: z.string(),
          }),
          500: z.object({ error: z.string() }),
        },
      },
    },
    update: {
      schema: {
        summary: 'Rota para atualizar visitante',
        tags: ['Visitante'],
        params: z.object({
          id: z.string().uuid(),
        }),
        body: z.object({
          nome: z.string().trim(),
          grauParentesco: z.string().trim(),
        }),
        response: {
          200: z.object({ message: z.string() }),
          500: z.object({ error: z.string() }),
        },
      },
    },

    delete: {
      schema: {
        summary: 'Rota para deletar o presidiario',
        tags: ['Visitante'],
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
