import { FastifyReply, FastifyRequest } from 'fastify'
import { z, ZodError } from 'zod'

// Importando o schema de criação de alocação
const allocationCreateSchema = z.object({
  celaId: z.string().uuid(),
  detentoId: z.string().uuid(),
})

export async function validateAllocationCreate(
  req: FastifyRequest,
  res: FastifyReply
) {
  try {
    // Valida o corpo da requisição
    const validatedBody = await allocationCreateSchema.parseAsync(req.body)
    req.body = validatedBody // Se a validação for bem-sucedida, passa os dados validados para a requisição
  } catch (error) {
    // Tipando o erro como ZodError
    if (error instanceof ZodError) {
      return res.status(400).send({
        error: 'Dados inválidos no corpo da requisição',
        details: error.errors, // Aqui você pode acessar o erro detalhado
      })
    }
  }
}

// Importando o schema de parâmetros de alocação (para deletar)
const allocationDeleteParamsSchema = z.object({
  id: z.string().uuid(),
})

export async function validateAllocationDelete(
  req: FastifyRequest,
  res: FastifyReply
) {
  try {
    // Valida o parâmetro 'id' da URL
    const validatedParams = await allocationDeleteParamsSchema.parseAsync(
      req.params
    )
    req.params = validatedParams // Se a validação for bem-sucedida, passa os dados validados para a requisição
  } catch (error) {
    if (error instanceof ZodError) {
      return res
        .status(400)
        .send({ error: 'ID inválido no parâmetro', details: error.errors })
    }
  }
}
