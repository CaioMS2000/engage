import { AgentRepository } from '@/repositories/agent-repository'
import { CompanyRepository } from '@/repositories/company-repository'
import type { Agent } from '@prisma/client'
import { CompanyNotFoundError } from './errors/company-not-found-error'
import { UserDoesNotBelongToCompanyError } from './errors/user-does-not-belong-to-company-error'
import { UserNotFoundError } from './errors/user-not-found-error'

interface GetAgentProfileRequest {
	agentId: string
	companyId: string
}

interface GetAgentProfileResponse {
	agent: Agent
}

export class GetAgentProfile {
	constructor(
		private agentRepository: AgentRepository,
		private companyRepository: CompanyRepository
	) {}

	async exec(data: GetAgentProfileRequest): Promise<GetAgentProfileResponse> {
		const { agentId, companyId } = data
		const agent = await this.agentRepository.findById(agentId)

		if (!agent) {
			throw new UserNotFoundError()
		}

		const company = await this.companyRepository.findById(companyId)

		if (!company) {
			throw new CompanyNotFoundError()
		}

		if (company.agents.find(agent => agent.id === agentId) === undefined) {
			throw new UserDoesNotBelongToCompanyError()
		}

		return {
			agent,
		}
	}
}
