import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import {
  createCellModel,
  getAllCellsModel,
  getCellByIdModel,
} from '../models/cell.model'

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
