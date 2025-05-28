import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import {
  createPrisonerModel,
  deletePrisonerModel,
  getAllPrisonerModel,
  getPrisonerByIdCPFModel,
  getPrisonerByIdModel,
  updatePrisonerModel,
} from '../models/preso.model'
import { detentoBodySchema } from '../validations/prisoner'

type NewDetento = z.infer<typeof detentoBodySchema>

export const createPrisonerService = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const newDetento = detentoBodySchema.safeParse(req.body) // Faz a validação com Zod

  if (!newDetento.success) {
    return res.status(400).send({
      error: 'Dados inválidos',
      issues: newDetento.error.format(),
    })
  }

  try {
    const presoExist = await getPrisonerByIdCPFModel(newDetento.data.cpf)

    if (presoExist) {
      res.status(409).send({ error: 'Preso já se encontra no banco de dados' })
      return
    }

    const preso = await createPrisonerModel(newDetento.data)

    res.status(201).send({ message: 'Preso cadastrado', detento: preso })
    return
  } catch (error) {
    console.error('Erro ao criar detento:', error)
    return res.status(500).send({ error: 'Erro interno do servidor' })
  }
}

export const listPrisonerService = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  try {
    const list = await getAllPrisonerModel()
    if (list.length == 0) {
      res
        .status(200)
        .send({ message: 'Nenhum Detento se encontra no banco de dados' })
      return
    }
    res.status(200).send(list)
  } catch (error) {
    console.error('Erro ao listar detentos:', error)
    return res.status(500).send({ error: 'Erro interno do servidor' })
  }
}

export const searchPrisonerService = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const validationParams = z.object({
    id: z.string().uuid(),
  })
  const { success, data, error } = validationParams.safeParse(req.params)
  if (!success) {
    return res.status(400).send({
      error: 'Dados inválidos',
      issues: error.format(),
    })
  }

  try {
    const detento = await getPrisonerByIdModel(data.id)

    if (!detento) {
      res
        .status(404)
        .send({ message: 'Não foi encontrado o Detento no banco de dados' })
      return
    }

    res.status(200).send({ message: 'Detento encontrado', detento })
  } catch (error) {
    console.error('Erro ao procurar por ID detento:', error)
    return res.status(500).send({ error: 'Erro interno do servidor' })
  }
}
export const deletePrisonerService = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const validationParams = z.object({
    id: z.string().uuid(),
  })
  const { success, data, error } = validationParams.safeParse(req.params)
  if (!success) {
    return res.status(400).send({
      error: 'Dados inválidos',
      issues: error.format(),
    })
  }

  try {
    const detento = await getPrisonerByIdModel(data.id)

    if (!detento) {
      res
        .status(404)
        .send({ message: 'Não foi encontrado o Detento no banco de dados' })
      return
    }

    await deletePrisonerModel(data.id)

    res.status(200).send({ message: 'Detento deletado' })
  } catch (error) {
    console.error('Erro ao deletar detento:', error)
    return res.status(500).send({ error: 'Erro interno do servidor' })
  }
}

export const updatePrisonerService = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const validationBody = z.object({
    nome: z.string().trim().min(5).optional(),
    idade: z.number().positive().optional(),
    estadoCivil: z.string().trim().optional(),
    cpf: z
      .string({
        required_error: 'CPF é obrigatório.',
      })
      .refine((doc) => {
        const replacedDoc = doc.replace(/\D/g, '')
        return replacedDoc.length >= 11
      }, 'CPF deve conter no mínimo 11 caracteres.')
      .refine((doc) => {
        const replacedDoc = doc.replace(/\D/g, '')
        return !!Number(replacedDoc)
      }, 'CPF deve conter apenas números.')
      .optional(),
    filiacao: z.string().optional(),
    foto: z.string().optional(),
    reincidencia: z.boolean().optional(),
  })
  const validationParams = z.object({
    id: z.string().uuid(),
  })

  const newDetento = validationBody.parse(req.body)
  const { id } = validationParams.parse(req.params)

  try {
    const detentoExiste = await getPrisonerByIdModel(id)

    if (newDetento?.cpf) {
      const detentoCpf = await getPrisonerByIdCPFModel(newDetento.cpf)
      if (detentoCpf && detentoCpf.id !== id) {
        res.status(409).send({ error: true, message: 'CPF já cadastrado' })
        return
      }
    }

    if (!detentoExiste) {
      res
        .status(404)
        .send({ message: 'Detento nao encontrado no banco de dados' })
      return
    }

    const updDetento = await updatePrisonerModel(id, newDetento)
    res
      .status(200)
      .send({ message: 'Detento atualizado com sucesso', updDetento })
  } catch (error) {
    console.error('Erro ao atulizar detento:', error)
    return res.status(500).send({ error: 'Erro interno do servidor' })
  }
}
