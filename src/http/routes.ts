import { FastifyInstance } from 'fastify'
import { registerCompanyController } from './controllers/register-company.controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/company', registerCompanyController)
}
