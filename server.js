import fastify from 'fastify'
import dotenv from 'dotenv'
dotenv.config()
const app = fastify({ logger: true })
app.register(import('./app.js'))
app.listen(process.env.PORT || 3000)
