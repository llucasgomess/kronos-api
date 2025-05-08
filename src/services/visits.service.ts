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
  })

  const resp = validationBody.parse(req.body)

  const data = {
    ...resp,
    dataVisita: new Date(),
  }

  const response = await createVisitsModel(data)
  console.log(response)
  return res.status(201).send({ message: 'Visita registrada com sucesso' })
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
    dataVisita: z.coerce.date(),
  })
  const validationParams = z.object({
    id: z.string().uuid(),
  })
  const { id } = validationParams.parse(req.params)
  const { dataVisita } = validationBody.parse(req.body)

  const visita = await updateVisitsModel(id, dataVisita)

  return res.status(200).send(visita)
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
  return res.status(200).send({ message: 'Registro apagado' })
}
