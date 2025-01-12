import { AgentRepository } from '@/repositories/agent-repository'
import { Agent } from '@prisma/client'
import { UserNotFoundError } from './errors/user-not-found-error'

interface GetAgentProfileRequest {
	agentId: string
}

interface GetAgentProfileResponse {
	agent: Agent
}

export class GetAgentProfile {
	constructor(private agentRepository: AgentRepository) {}

	async exec(data: GetAgentProfileRequest): Promise<GetAgentProfileResponse> {
		const { agentId } = data
		const agent = await this.agentRepository.findById(agentId)

		if (!agent) {
			throw new UserNotFoundError()
		}

		return {
			agent,
		}
	}
}
