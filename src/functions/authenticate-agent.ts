import { AgentRepository } from '@/repositories/agent-repository'
import { CompanyRepository } from '@/repositories/company-repository'
import { Agent } from '@prisma/client'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { UserDoesNotBelongToCompanyError } from './errors/user-does-not-belong-to-company-error'

interface AuthenticateAgentRequest {
	email: string
	password: string
	companyCNPJ: string
}

interface AuthenticateAgentResponse {
	agent: Agent
}

export class AuthenticateAgent {
	constructor(
		private agentRepository: AgentRepository,
		private companyRepository: CompanyRepository
	) {}

	async exec({
		email,
		password,
		companyCNPJ,
	}: AuthenticateAgentRequest): Promise<AuthenticateAgentResponse> {
		const agent = await this.agentRepository.findByEmail(email)

		if (!agent) {
			throw new InvalidCredentialsError()
		}

		const doesPasswordMatches = await compare(password, agent.passwordHash)

		if (!doesPasswordMatches) {
			throw new InvalidCredentialsError()
		}

		const company = await this.companyRepository.findByCNPJ(companyCNPJ)

		if (!company) {
			throw new UserDoesNotBelongToCompanyError()
		}

		if (company.id !== agent.companyId) {
			throw new UserDoesNotBelongToCompanyError()
		}

		return {
			agent,
		}
	}
}
