import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { prisma } from '../lib/prisma-client'
import {
  createAllocationsModel,
  deleteAllocationsModel,
  getAllocationsByIdDetentoModel,
} from '../models/allocation.model'
import { getCellByIdUUiModel } from '../models/cell.model'
import { getPrisonerByIdModel } from '../models/preso.model'
import {
  createTransferPrisonerModel,
  deleteTransferPrisonerModel,
  getAllTransferPrisonerModel,
  getTransferByIdPrisonerModel,
  updateTransferPrisonerModel,
} from '../models/transfer.model'

export const createTransferPrisonerService = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const validationBody = z.object({
    detentoId: z.string().uuid(),
    celaDestinoId: z.string().uuid(),
  })
  const { detentoId, celaDestinoId } = validationBody.parse(req.body)

  try {
    const detento = await getPrisonerByIdModel(detentoId)

    //1º verificar se o detento existe
    if (!detento) {
      return res.status(404).send({ message: 'Detento não encontrado' })
    }

    const alocacao = await getAllocationsByIdDetentoModel(detentoId)

    //2º verificar se o detento está alocado em alguma cela
    if (!alocacao) {
      return res
        .status(400)
        .send({ message: 'Detento não está alocado em nenhuma cela' })
    }

    const celaDestino = await getCellByIdUUiModel(celaDestinoId)

    //3º verificar se a cela de destino existe
    if (!celaDestino) {
      return res.status(404).send({ message: 'Cela de destino não encontrada' })
    }

    //4º verificar se a cela de destino é diferente da cela atual
    if (celaDestinoId === alocacao.celaId) {
      return res
        .status(400)
        .send({ message: 'Cela de destino não pode ser a mesma que a atual' })
    }

    if (detento.alocacoes && detento.alocacoes.length > 0) {
      await deleteAllocationsModel(detento.alocacoes[0].id)
    } else {
      return res
        .status(400)
        .send({ message: 'Detento não possui alocações válidas' })
    }

    await createAllocationsModel(detento.id, celaDestinoId)

    await createTransferPrisonerModel(detentoId, alocacao.celaId, celaDestinoId)

    // await updateTransferPrisonerModel(detentoId, celaDestinoId)

    return res
      .status(201)
      .send({ message: 'Transferência registrada com sucesso' })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ error: 'Erro ao registrar transferência' })
  }
}
export const getAllTransferPrisonerService = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  try {
    const tranferencias = await getAllTransferPrisonerModel()
    // console.log(tranferencias)

    return res.status(200).send({ tranferencias })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ error: 'Erro ao buscar transferências' })
  }
}
export const updateTransferPrisonerService = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const validationBody = z.object({
    celaDestinoId: z.string().uuid(),
  })
  const validationParams = z.object({
    id: z.string().uuid(),
  })

  const { id } = validationParams.parse(req.params)
  const { celaDestinoId } = validationBody.parse(req.body)

  try {
    const transferencia = await getTransferByIdPrisonerModel(id)

    if (!transferencia) {
      return res.status(404).send({ message: 'Transferência não encontrada' })
    }

    const celaDestino = await getCellByIdUUiModel(celaDestinoId)

    if (!celaDestino) {
      return res.status(404).send({ message: 'Cela de destino não encontrada' })
    }

    await updateTransferPrisonerModel(id, celaDestinoId)

    prisma.transferencia.update({
      where: { id },
      data: { celaDestinoId },
    })

    return res
      .status(200)
      .send({ message: 'Transferência atualizada com sucesso' })
  } catch (error) {}
}
export const deleteTransferPrisonerService = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const validationParams = z.object({
    id: z.string().uuid(),
  })

  const { id } = validationParams.parse(req.params)

  try {
    const transferencia = await getTransferByIdPrisonerModel(id)
    if (!transferencia) {
      return res.status(404).send({ message: 'Transferência não encontrada' })
    }

    await deleteTransferPrisonerModel(id)
    return res.status(200).send({ message: 'Transferência deletada' })
  } catch (error) {}
}
