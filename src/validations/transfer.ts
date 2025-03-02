import z from 'zod'

export const validations = {
  transfer: {
    create: {
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
    getAll: {
      schema: {
        summary: 'Rota para buscar todas as transferencias',
        tags: ['Transferências'],
        response: {
          200: z.object({ message: z.string() }),
          500: z.object({ error: z.string() }),
        },
      },
    },
    update: {
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

    delete: {
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
  },
}
