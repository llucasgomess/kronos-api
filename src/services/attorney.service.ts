import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import {
  createAttorneyModel,
  deleteAttorneyModel,
  getAllAttorneyModel,
  getByIdAttorneyModel,
  updateAttorneyModel,
} from '../models/attorney.model'

export const createAttorneyService = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const shemaBody = z.object({
    nome: z.string().trim(),
    oabNumero: z.string().trim(),
  })

  const { nome, oabNumero } = shemaBody.parse(req.body)

  try {
    const advogado = await createAttorneyModel(nome, oabNumero)

    return res.status(201).send(advogado)
  } catch (error) {
    console.error('Erro ao criar advogado:', error)
    return res.code(500).send({ error: 'Erro interno do servidor' })
  }
}
export const getAllAttorneyService = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const advogado = getAllAttorneyModel()
  return res.send(advogado)
}

export const getByIdAttorneyService = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const schemaParams = z.object({
    id: z.string().uuid(),
  })

  const { id } = schemaParams.parse(req.params)

  const advogado = await getByIdAttorneyModel(id)
  res.status(200).send(advogado)
}
export const updateAttorneyService = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const schemaParams = z.object({
    id: z.string().uuid(),
  })
  const schemaBody = z.object({
    nome: z.string().trim(),
    oabNumero: z.string().trim(),
  })

  const { id } = schemaParams.parse(req.params)
  const { nome, oabNumero } = schemaBody.parse(req.body)

  await updateAttorneyModel(id, nome, oabNumero)
  res.status(200).send({ message: 'Advogado atualizado com sucesso' })
}
export const deleteAttorneyService = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const schemaParams = z.object({
    id: z.string().uuid(),
  })

  const { id } = schemaParams.parse(req.params)

  await deleteAttorneyModel(id)
  res.status(200).send({ message: 'Advogado deletado com sucesso' })
}
