import z from 'zod'

export const validations = {
  cell: {
    create: {
      schema: {
        summary: 'Rota para criar cela',
        tags: ['Celas'],
        body: z.object({
          numero: z.number(),
          capacidade: z.number(),
          pavilhao: z.string(),
        }),
        response: {
          200: z.object({
            id: z.string().uuid(),
            celaId: z.string().uuid(),
            detentoId: z.string().uuid(),
            dataAlocacao: z.date(),
          }),
          201: z.object({
            id: z.string().uuid(),
            numero: z.number(),
            capacidade: z.number(),
            pavilhao: z.string(),
          }),
          400: z.object({ error: z.string() }),
          500: z.object({ error: z.string() }),
        },
      },
    },
  },
}
