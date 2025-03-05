import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
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
import attorneyRoutes from './routes/attorney.route'
import authRoutes from './routes/auth.route'
import cellRoutes from './routes/cela.route'
import infringementRoutes from './routes/infringement.route'
import prisonersRoutes from './routes/preso.route'
import transferRoutes from './routes/transfer.route'
import userRoutes from './routes/user.route'
import visitRoutes from './routes/visit.route'
import visitsRoutes from './routes/visits.route'

//Instaciar o servidor
const server: FastifyInstance = fastify().withTypeProvider<ZodTypeProvider>()

//Configurações
server.setSerializerCompiler(serializerCompiler)
server.setValidatorCompiler(validatorCompiler)

//Plugins
server.register(fastifyJwt, {
  secret: process.env.JWT_SECRET || 'supersecret',
})
server.register(fastifyCors)
server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'API Kronos',
      version: '0.0.1',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', // Especifica que é um JWT
        },
      },
    },
    security: [{ bearerAuth: [] }], // Aplica o esquema de segurança globalmente
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
server.register(infringementRoutes)
server.register(transferRoutes)
server.register(visitsRoutes)
server.register(visitRoutes)
server.register(attorneyRoutes)
server.register(userRoutes)

server.register(authRoutes)

//configurações de porta
server.listen(
  {
    port: 3000,
  },
  () => {
    console.log('Server runnig port 3000')
  }
)
