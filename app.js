import { join } from 'desm'
import jwt from 'fastify-jwt'
import Fastify from 'fastify'
import fastifyMongodb from 'fastify-mongodb'
const fastify = Fastify()

export default async function (app, opts) {
  app.register(jwt, {
    secret: process.env.JWT_SECRET
  })
  await fastify.register(fastifyMongodb, {
    forceClose: true,
    url: process.env.MONGO_CORE_URL,
    name: 'MONGO1'
  })

  fastify.ready(err => {
    if (err) {
      console.log('Error connecting mongodb. $$$$$$$$$$$$ ', err)
    }
    console.log('Connecting MongoDB')
  })

  global.mongodb = fastify.mongo.MONGO1.db


  app.decorate('authenticateAdmin', async function (request, reply) {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  })

  app.register(import('fastify-autoload'), {
    dir: join(import.meta.url, 'routes')
  })
}
