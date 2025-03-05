import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import {
  createAttorneyModel,
  deleteAttorneyModel,
  getAllAttorneyModel,
  getByIdAttorneyModel,
  getByOabAttorneyModel,
  updateAttorneyModel,
} from '../models/attorney.model'

export const createAttorneyService = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const schemaBody = z.object({
    nome: z.string().trim(),
    oabNumero: z.string().trim(),
  })

  const body = schemaBody.safeParse(req.body)

  if (!body.success) {
    return res.status(400).send({
      error: 'Dados inválidos',
      issues: body.error.format(),
    })
  }

  try {
    const advogadoExist = await getByOabAttorneyModel(body.data.oabNumero)

    if (advogadoExist) {
      res.status(409).send({ error: 'Advogado ja existe no banco dea dados' })
      return
    }

    const newAdvogado = await createAttorneyModel(
      body.data.nome,
      body.data.oabNumero //createAttorneyModel
    )

    return res.status(201).send({ message: 'Advogado criado com sucesso' })
  } catch (error) {
    console.error('Erro ao criar alocação:', error)
    res.status(500).send({ error: 'Erro interno do servidor teste 01' })
  }
}

export const getAllAttorneyService = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const advogado = await getAllAttorneyModel()
  return res.status(200).send(advogado)
}

export const getByIdAttorneyService = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const schemaParams = z.object({
    id: z.string().uuid(),
  })

  const { id } = schemaParams.parse(req.params)

  const advogadoExist = await getByIdAttorneyModel(id)

  if (!advogadoExist) {
    res.status(404).send({ error: 'Advogado não ja existe no banco dea dados' })
    return
  }

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

  const advogadoExist = await getByIdAttorneyModel(id)

  if (!advogadoExist) {
    res.status(404).send({ error: 'Advogado não ja existe no banco dea dados' })
    return
  }

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

  const advogadoExist = await getByIdAttorneyModel(id)

  if (!advogadoExist) {
    res.status(404).send({ error: 'Advogado não ja existe no banco dea dados' })
    return
  }

  await deleteAttorneyModel(id)
  res.status(200).send({ message: 'Advogado deletado com sucesso' })
}
