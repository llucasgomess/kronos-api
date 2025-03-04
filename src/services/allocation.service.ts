import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import {
  getAllocationsByIdDetentoModel,
  getAllocationsByIdModel,
} from './../models/allocation.model'

import {
  createAllocationsModel,
  deleteAllocationsModel,
  getAllAllocationsModel,
} from '../models/allocation.model'
import { getCellByIdwithAlocationsModel } from '../models/cell.model'

export const createAllocationService = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const validationBody = z.object({
    celaId: z.string().uuid(),
    detentoId: z.string().uuid(),
  })
  const { celaId, detentoId } = validationBody.parse(req.body)

  try {
    // Verificar se a cela existe
    const cela = await getCellByIdwithAlocationsModel(celaId)

    if (!cela) {
      res.status(404).send({ error: 'Cela não encontrada' })
      return
    }

    // Verificar se a cela já atingiu a capacidade máxima
    if (cela && cela.alocacoes.length >= cela.capacidade) {
      res
        .status(400)
        .send({ error: 'Cela lotada. Não é possível alocar mais detentos.' })
      return
    }
    // Verificar se o detento já está alocado
    const detentoAlocado = await getAllocationsByIdDetentoModel(detentoId)

    if (detentoAlocado) {
      res.status(400).send({ error: 'Detento já está alocado em uma cela.' })
      return
    }

    const alocacao = await createAllocationsModel(detentoId, celaId)

    res.status(201).send(alocacao)
  } catch (error) {
    console.error('Erro ao criar alocação:', error)
    res.status(500).send({ error: 'Erro interno do servidor' })
    return
  }
}

export const getAllAllocationService = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  try {
    const alocacoes = await getAllAllocationsModel()

    res.status(200).send(alocacoes)
  } catch (error) {
    console.error('Erro ao listar alocações:', error)
    res.status(500).send({ error: 'Erro interno do servidor' })
    return
  }
}
export const deleteAllocationService = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const validationParams = z.object({
    id: z.string().uuid(),
  })

  const { id } = validationParams.parse(req.params)

  try {
    const allocationExist = await getAllocationsByIdModel(id)

    if (!allocationExist?.celaId) {
      res.status(404).send({ error: 'Alocação não encontrada' })
      return
    }

    await deleteAllocationsModel(id)

    res.status(200).send({ message: 'Alocação removida com sucesso' })
  } catch (error) {
    console.error('Erro ao remover alocação:', error)
    res.status(500).send({ error: 'Erro interno do servidor' })
    return
  }
}
