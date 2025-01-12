import { PrismaAgentRepository } from '@/repositories/prisma/prisma-agent-repository'
import { PrismaCompanyRepository } from '@/repositories/prisma/prisma-company-repository'
import { AuthenticateAgent } from '../authenticate-agent'

export function makeAuthenticateAgent() {
	const agentRepository = new PrismaAgentRepository()
	const companyRepository = new PrismaCompanyRepository()
	const authenticateAgent = new AuthenticateAgent(
		agentRepository,
		companyRepository
	)

	return authenticateAgent
}
