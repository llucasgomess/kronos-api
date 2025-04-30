type RegistroComData = {
  createdAt: string | Date
}

function PresoscontarPorMes(dados: RegistroComData[]) {
  const contagem: Record<string, number> = {}

  dados.forEach((item) => {
    const data = new Date(item.createdAt)
    const chave = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(
      2,
      '0'
    )}`

    contagem[chave] = (contagem[chave] || 0) + 1
  })

  return contagem
}
