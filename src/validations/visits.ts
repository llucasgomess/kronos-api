import z from 'zod'

export const validations = {
  visits: {
    create: {
      schema: {
        summary: 'Rota para Registra Visitas',
        tags: ['Visitas'],
        body: z.object({
          detentoId: z.string().uuid(),
          visitanteId: z.string().uuid(),
          advogadoId: z.string().uuid(),
          dataVisita: z.date(),
        }),
        response: {
          200: z.object({
            id: z.string().uuid(),
            celaId: z.string().uuid(),
            detentoId: z.string().uuid(),
            dataAlocacao: z.date(),
          }),
          201: z.object({ message: z.string() }),
          500: z.object({ error: z.string() }),
        },
      },
    },
    getAll: {
      schema: {
        summary: 'Rota para buscar todos os  Registros de Visitas',
        tags: ['Visitas'],
      },
    },
    update: {
      schema: {
        summary: 'Rota para atualizar registro de visitas',
        tags: ['Visitas'],
        body: z.object({
          dataVisita: z.date(),
        }),
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          200: z.object({
            detentoId: z.string().uuid(),
            id: z.string().uuid(),
            visitanteId: z.string().uuid(),
            advogadoId: z.string().uuid(),
            dataVisita: z.date(),
          }),
          500: z.object({ error: z.string() }),
        },
      },
    },

    delete: {
      schema: {
        summary: 'Rota para deletar o Registro de Visitas',
        tags: ['Visitas'],
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
