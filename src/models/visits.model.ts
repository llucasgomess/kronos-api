import { prisma } from '../lib/prisma-client'

export const createVisitsModel = async (
  detentoId: string,
  visitanteId: string,
  advogadoId: string,
  dataVisita: Date
) => {
  return await prisma.visita.create({
    data: {
      detentoId,
      visitanteId,
      advogadoId,
      dataVisita,
    },
  })
}

export const updateVisitsModel = async (id: string, dataVisita: Date) => {
  return await prisma.visita.update({
    where: { id },
    data: { dataVisita },
  })
}
export const deleteVisitsModel = async (id: string) => {
  return await prisma.visita.delete({
    where: { id },
  })
}
