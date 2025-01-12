import { PrismaAgentRepository } from '@/repositories/prisma/prisma-agent-repository'
import { RegisterAgent } from '../register-agent'

export function makeRegisterAgent() {
	const agentRepository = new PrismaAgentRepository()
	const registerAgent = new RegisterAgent(agentRepository)

	return registerAgent
}
