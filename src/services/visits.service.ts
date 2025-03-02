import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { prisma } from '../lib/prisma-client'
import {
  createVisitsModel,
  deleteVisitsModel,
  updateVisitsModel,
} from '../models/visits.model'

export const createVisitsService = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const validationBody = z.object({
    detentoId: z.string().uuid(),
    visitanteId: z.string().uuid(),
    advogadoId: z.string().uuid(),
    dataVisita: z.date(),
  })
  const { detentoId, visitanteId, advogadoId, dataVisita } =
    validationBody.parse(req.body)

  const visita = createVisitsModel(
    detentoId,
    visitanteId,
    advogadoId,
    dataVisita
  )

  return res.status(201).send(visita)
}

export const getAllVisitsService = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const visitas = await prisma.visita.findMany({
    include: {
      detento: true,
      visitante: true,
      Advogado: true,
    },
  })
  return res.send(visitas)
}

export const updateVisitsService = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const validationBody = z.object({
    dataVisita: z.date(),
  })
  const validationParams = z.object({
    id: z.string().uuid(),
  })
  const { id } = validationParams.parse(req.params)
  const { dataVisita } = validationBody.parse(req.body)

  const visita = await updateVisitsModel(id, dataVisita)

  return res.send(visita)
}

export const deleteVisitsService = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const validationParams = z.object({
    id: z.string().uuid(),
  })
  const { id } = validationParams.parse(req.params)

  await deleteVisitsModel(id)
  return res.status(204).send()
}
