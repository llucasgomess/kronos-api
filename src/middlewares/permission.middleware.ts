import { FastifyReply, FastifyRequest } from 'fastify'

export const permission = (rolesPermitidas: string[]) => {
  return async (req: FastifyRequest, res: FastifyReply) => {
    const authHeader = req.headers.authorization

    const token = authHeader?.split(' ')[1]

    if (!token) {
      res.status(401).send({ error: 'Token não fornecido' })
      return
    }

    const { cargo, id } = await req.jwtVerify<{
      id: string
      cargo: string
    }>()

    if (!cargo) {
      res.status(401).send({ error: 'Dados do usuário ausentes' })
      return
    }

    if (!rolesPermitidas.includes(cargo)) {
      console.error(
        `Permissão negada: esperado ${rolesPermitidas}, recebeu ${cargo}`
      )
      res.status(403).send({ error: 'Acesso negado' })
      return
    }

    return
  }
}
