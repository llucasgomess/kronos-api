import { FastifyReply, FastifyRequest } from 'fastify'

export function verificarPermissao(rolesPermitidas: string[]) {
  return async (req: FastifyRequest, res: FastifyReply, done: () => void) => {
    try {
      console.log('Entrou no verificarPermissao')

      // Certifique-se de que request.user esteja definido
      if (!req.user) {
        console.error('Dados do usuário não encontrados no request')
        res.status(401).send({ error: 'Dados do usuário ausentes' })
        return done()
      }

      const { cargo } = req.user as { cargo: string }

      console.log({ usuario: cargo })

      if (!rolesPermitidas.includes(cargo)) {
        console.error(
          `Permissão negada: esperado ${rolesPermitidas}, recebeu ${cargo}`
        )
        res.status(403).send({ error: 'Acesso negado' })
        done()
      }

      done()
    } catch (error) {
      console.error('Erro no middleware de verificação de permissão:', error)
      res.status(500).send({ error: 'Erro interno no servidor' })
      done()
    }
  }
}
