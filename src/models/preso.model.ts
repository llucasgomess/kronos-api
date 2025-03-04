import { Detento } from '@prisma/client'
import { prisma } from '../lib/prisma-client'

interface newDetento {
  nome: string
  idade: number
  cpf: string
  filiacao?: string
  foto?: string
  reincidencia?: boolean
  estadoCivil: string
}

interface updateDetento {
  nome?: string
  idade?: number
  cpf?: string
  filiacao?: string
  foto?: string
  reincidencia?: boolean
  estadoCivil?: string
}

//Criar um novo detento
export const createPrisonerModel = async (
  detentoProps: newDetento
): Promise<Detento> => {
  return await prisma.detento.create({
    data: {
      ...detentoProps,
    },
  })
}

//Buscar todos os detentos
export const getAllPrisonerModel = async (): Promise<Detento[]> => {
  return await prisma.detento.findMany()
}

//Buscar um detento por ID
export const getPrisonerByIdModel = async (
  detentoId: string
): Promise<Detento | null> => {
  return await prisma.detento.findUnique({
    where: { id: detentoId },
    include: {
      alocacoes: true,
      infracoes: true,
      transferencias: true,
      visitas: true,
    },
  })
}

//Atualizar um detento
export const updatePrisonerModel = async (
  id: string,
  detentoProps: updateDetento
): Promise<Detento> => {
  return await prisma.detento.update({
    where: { id },
    data: { ...detentoProps },
  })
}

//Deletar um detento
export const deletePrisonerModel = async (id: string): Promise<Detento> => {
  return await prisma.detento.delete({ where: { id } })
}
