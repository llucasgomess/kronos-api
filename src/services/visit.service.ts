import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import {
  createVisitModel,
  deleteVisitModel,
  getAllVisitModel,
  getByIdVisitModel,
  updateVisitModel,
} from '../models/visit.model'

export const createVisitService = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const shemaBody = z.object({
    nome: z.string().trim(),
    grauParentesco: z.string().trim(),
  })

  const { nome, grauParentesco } = shemaBody.parse(req.body)

  try {
    const visitante = await createVisitModel(nome, grauParentesco)

    return res.status(201).send(visitante)
  } catch (error) {
    console.error('Erro ao listar detentos:', error)
    return res.code(500).send({ error: 'Erro interno do servidor' })
  }
}
export const getAllVisitService = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const visitante = await getAllVisitModel()
  console.log(visitante)
  return res.send(visitante)
}
export const getByIdVisitService = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const schemaParams = z.object({
    id: z.string().uuid(),
  })

  const { id } = schemaParams.parse(req.params)

  const visitante = await getByIdVisitModel(id)
  res.status(200).send(visitante)
}
export const updateVisitService = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const schemaParams = z.object({
    id: z.string().uuid(),
  })
  const schemaBody = z.object({
    nome: z.string().trim(),
    grauParentesco: z.string().trim(),
  })

  const { id } = schemaParams.parse(req.params)
  const { nome, grauParentesco } = schemaBody.parse(req.body)

  await updateVisitModel(id, nome, grauParentesco)
  res.status(200).send({ message: 'Visitante atualizado com sucesso' })
}
export const deleteVisitService = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const schemaParams = z.object({
    id: z.string().uuid(),
  })

  const { id } = schemaParams.parse(req.params)

  await deleteVisitModel(id)
  res.status(200).send({ message: 'Visitante deletado com sucesso' })
}
