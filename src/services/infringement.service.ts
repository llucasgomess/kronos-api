import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import {
  createInfringementModel,
  getInfringementByIdModel,
} from '../models/infringement.model'
import { getPrisonerByIdModel } from '../models/preso.model'
import {
  deleteInfringementByIdModel,
  getAllInfringementModel,
  updateInfringementByIdModel,
} from './../models/infringement.model'

export const createInfringementService = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const validationBody = z.object({
    detentoId: z.string().uuid(),
    descricao: z.string(),
  })
  const { detentoId, descricao } = validationBody.parse(req.body)

  try {
    const detento = await getPrisonerByIdModel(detentoId)

    if (!detento) {
      res.status(404).send({ message: 'Detento não encontrado' })
      return
    }

    const infracao = await createInfringementModel(detentoId, descricao)

    res.status(201).send(infracao)
  } catch (error) {
    console.error('Erro ao criar infracao:', error)
    res.code(500).send({ error: 'Erro interno do servidor' })
  }
}

export const getAllInfringementService = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  try {
    const infracoes = await getAllInfringementModel()
    res.send(infracoes)
  } catch (error) {
    console.error('Erro ao buscar infracao:', error)
    res.code(500).send({ error: 'Erro interno do servidor' })
    return
  }
}

export const updateInfringementService = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const validationParams = z.object({
    id: z.string().uuid(),
  })
  const validationBody = z.object({
    descricao: z.string(),
  })

  const { descricao } = validationBody.parse(req.body)
  const { id } = validationParams.parse(req.params)

  try {
    const infracao = await getInfringementByIdModel(id)

    if (!infracao) {
      return res.status(404).send({ message: 'Infração não encontrada' })
    }

    const updatedInfracao = await updateInfringementByIdModel(id, descricao)
    res.send(updatedInfracao)
  } catch (error) {
    console.error('Erro ao atualizar infracao:', error)
    res.code(500).send({ error: 'Erro interno do servidor' })
    return
  }
}
export const deleteInfringementService = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const validationParams = z.object({
    id: z.string().uuid(),
  })

  const { id } = validationParams.parse(req.params)

  try {
    const infracao = await getInfringementByIdModel(id)

    if (!infracao) {
      return res.status(404).send({ message: 'Infração não encontrada' })
    }

    await deleteInfringementByIdModel(id)
    res.status(200).send({ message: 'Infração deletada' })
  } catch (error) {
    console.error('Erro ao deletar infracao:', error)
    res.code(500).send({ error: 'Erro interno do servidor' })
    return
  }
}
