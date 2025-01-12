import { FastifyInstance } from 'fastify'
import { authenticateAgentController } from './controllers/authenticate-agent.controller'
import { registerCompanyController } from './controllers/register-company.controller'

export async function appRoutes(app: FastifyInstance) {
	app.post('/company', registerCompanyController)
	app.post('/sessions', authenticateAgentController)
}
