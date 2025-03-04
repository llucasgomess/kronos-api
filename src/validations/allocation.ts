import z from 'zod'

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
