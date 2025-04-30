type RegistroVisita = {
  dataVisita: string | Date
  detentoId: string
  visitanteId: string
}

function contarVisitasPorData(visitas: RegistroVisita[]) {
  const contagemPorData: Record<string, number> = {}

  visitas.forEach((visita) => {
    const data = new Date(visita.dataVisita)
    const chave = data.toISOString().split('T')[0] // Ex: '2025-02-01'

    contagemPorData[chave] = (contagemPorData[chave] || 0) + 1
  })

  return contagemPorData
}
