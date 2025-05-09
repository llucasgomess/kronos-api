import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import {
  createCellModel,
  getAllCellsModel,
  getCellByIdModel,
  getCellByIdUUiInfoModel,
  getCellByIdUUiModel,
} from '../models/cell.model'
import { getPrisonerByIdModel } from './../models/preso.model'

export const createCellService = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const validationBody = z.object({
    numero: z.number(),
    capacidade: z.number(),
    pavilhao: z.string(),
  })
  const { capacidade, numero, pavilhao } = validationBody.parse(req.body)

  try {
    const celaExistente = await getCellByIdModel(numero)

    if (celaExistente) {
      res.status(400).send({ message: 'Número da cela já existe' })
      return
    }

    const cela = await createCellModel(numero, capacidade, pavilhao)
    res.status(201).send(cela)
  } catch (error) {
    console.error('Erro ao criar cela:', error)
    res.code(500).send({ error: 'Erro interno do servidor' })
  }
}

export const getAllCellService = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  try {
    const cells = await getAllCellsModel()
    res.status(200).send(cells)
  } catch (error) {
    console.error('Erro ao buscar cela:', error)
    res.code(500).send({ error: 'Erro interno do servidor' })
  }
}

export const getCellByIdService = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const validationParams = z.object({
    id: z.string().uuid(),
  })
  const parsedParams = validationParams.safeParse(req.params)
  if (!parsedParams.success) {
    res.status(400).send({ message: 'ID inválido' })
    return
  }

  const { id } = parsedParams.data
  try {
    const celaExistente = await getCellByIdUUiModel(id)
    return res.status(200).send(celaExistente?.alocacoes)
  } catch (error) {
    console.error('Erro ao buscar cela:', error)
    res.code(500).send({ error: 'Erro interno do servidor' })
  }

  return
}

//ira burcar todos os prisioneiros alocados na cela
export const getCellByIdAllPrisionersService = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const validationParams = z.object({
    id: z.string().uuid(),
  })
  const parsedParams = validationParams.safeParse(req.params)
  if (!parsedParams.success) {
    res.status(400).send({ message: 'ID inválido' })
    return
  }

  const { id } = parsedParams.data
  try {
    const celaExistente = await getCellByIdUUiModel(id)

    const prisioneirosCela = await Promise.all(
      celaExistente?.alocacoes.map(async (prisioner) => {
        return await getPrisonerByIdModel(prisioner.detentoId)
      }) || []
    )

    return res.status(200).send(prisioneirosCela)
  } catch (error) {
    console.error('Erro ao buscar cela:', error)
    res.code(500).send({ error: 'Erro interno do servidor' })
  }
}

export const getCellInfoByIdService = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const validationParams = z.object({
    id: z.string().uuid(),
  })
  const parsedParams = validationParams.safeParse(req.params)
  if (!parsedParams.success) {
    res.status(400).send({ message: 'ID inválido' })
    return
  }

  const { id } = parsedParams.data
  try {
    const celaExistente = await getCellByIdUUiInfoModel(id)

    if (!celaExistente) {
      return res.status(404).send({ message: 'Cela nao existe' })
    }

    return res.status(200).send(celaExistente)
  } catch (error) {
    console.error('Erro ao buscar cela:', error)
    res.code(500).send({ error: 'Erro interno do servidor' })
  }
}
