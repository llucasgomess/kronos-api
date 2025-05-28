import { prisma } from '../lib/prisma-client'

type createVisitsModelProps = {
  detentoId: string
  visitanteId: string
  dataVisita: Date
}
export const createVisitsModel = async (data: createVisitsModelProps) => {
  return await prisma.visita.create({
    data: {
      ...data,
    },
  })
}

export const updateVisitsModel = async (id: string) => {
  return await prisma.visita.update({
    where: { id },
    data: { dataVisitaFim: new Date() },
  })
}
export const deleteVisitsModel = async (id: string) => {
  return await prisma.visita.delete({
    where: { id },
  })
}
