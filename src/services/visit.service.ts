import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import {
  createVisitModel,
  deleteVisitModel,
  getAllVisitModel,
  getByCPFVisitModel,
  getByIdVisitModel,
  updateVisitModel,
} from '../models/visit.model'

export const createVisitService = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const shemaBody = z.object({
    nome: z.string().trim(),
    cpf: z.string().trim(),
    idDetento: z.string().uuid(),
    grauParentesco: z.string().trim(),
    foto: z.string(),
  })

  const { nome, grauParentesco, cpf, idDetento, foto } = shemaBody.parse(
    req.body
  )

  try {
    const visitantaExists = await getByCPFVisitModel(cpf)

    if (visitantaExists) {
      return res
        .status(400)
        .send({ error: true, message: 'Visitante já cadastrado' })
    }

    await createVisitModel(nome, cpf, idDetento, grauParentesco, foto)

    res
      .status(201)
      .send({ error: false, message: 'Visitante criado com sucesso' })
    return
  } catch (error) {
    console.error('Erro ao listar detentos:', error)
    return res.status(500).send({ error: 'Erro interno do servidor' })
  }
}
export const getAllVisitService = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const visitante = await getAllVisitModel()

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

  return res.status(200).send(visitante)
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
    foto: z.string(),
  })

  const { id } = schemaParams.parse(req.params)
  const { nome, grauParentesco, foto } = schemaBody.parse(req.body)

  await updateVisitModel(id, nome, grauParentesco, foto)
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
