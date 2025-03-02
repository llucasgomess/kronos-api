import z from 'zod'

export const validations = {
  infringement: {
    create: {
      schema: {
        summary: 'Rota para criar infrações',
        tags: ['Infrações'],
        body: z.object({
          detentoId: z.string().uuid(),
          descricao: z.string(),
        }),
        // params: detentoParamsSchema,
        response: {
          201: z.object({
            id: z.string().uuid(),
            detentoId: z.string().uuid(),
            descricao: z.string(),
            dataInfracao: z.date(),
          }),
          404: z.object({ message: z.string() }),
          500: z.object({ error: z.string() }),
        },
      },
    },
    getAll: {
      schema: {
        summary: 'Rota para buscar todas as infrações',
        tags: ['Infrações'],
        response: {
          500: z.object({ error: z.string() }),
        },
      },
    },
    update: {
      schema: {
        summary: 'Rota para atualizar a descrição da  infrações',
        tags: ['Infrações'],
        body: z.object({
          detentoId: z.string().uuid(),
          descricao: z.string(),
        }),
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          201: z.object({
            id: z.string().uuid(),
            detentoId: z.string().uuid(),
            descricao: z.string(),
            dataInfracao: z.date(),
          }),
          404: z.object({ message: z.string() }),
          500: z.object({ error: z.string() }),
        },
      },
    },

    delete: {
      schema: {
        summary: 'Rota para deletar a infrações',
        tags: ['Infrações'],
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
