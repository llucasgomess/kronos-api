import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import allocationRoutes from './routes/allocation.route'
import cellRoutes from './routes/cela.route'
import prisonersRoutes from './routes/preso.route'

//Instaciar o servidor
const server: FastifyInstance = fastify().withTypeProvider<ZodTypeProvider>()

//Configurações
server.setSerializerCompiler(serializerCompiler)
server.setValidatorCompiler(validatorCompiler)

//Plugins
server.register(fastifyCors)
server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'API Kronos',
      version: '0.0.1',
    },
  },
  transform: jsonSchemaTransform,
})

server.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

//rotas
server.get('/', (req: FastifyRequest, replay: FastifyReply) => {
  replay.status(200).send({ message: 'servidor ok' })
})

//rotas
server.register(prisonersRoutes)
server.register(allocationRoutes)
server.register(cellRoutes)

//configurações de porta
server.listen(
  {
    port: 3000,
  },
  () => {
    console.log('Server runnig port 3000')
  }
)
