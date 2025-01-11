import { AgentRepository } from '@/repositories/agent-repository'
import type { Agent } from '@prisma/client'
import { hash } from 'bcryptjs'
import {
	AgentEmailAlreadyInUseError,
	AgentUsernameAlreadyInUseError,
} from './errors/agent-already-exists'

interface RgisterAgentRequest {
	name: string
	email: string
	password: string
	username: string
	companyId: string
	type: 'AI' | 'PERSON'
	status?: 'ACTIVE' | 'INACTIVE'
}

interface RegisterAgentResponse {
	agent: Agent
}

export class RegisterAgent {
	constructor(private agentRepository: AgentRepository) {}

	async exec(data: RgisterAgentRequest): Promise<RegisterAgentResponse> {
		const { email, username, password } = data

		const agentWithSameEmail = await this.agentRepository.findByEmail(email)

		if (agentWithSameEmail) {
			throw new AgentEmailAlreadyInUseError()
		}

		const agentWithSameUsername =
			await this.agentRepository.findByUsername(username)

		if (agentWithSameUsername) {
			throw new AgentUsernameAlreadyInUseError()
		}

		const passwordHash = await hash(password, 6)

		const newAgent = await this.agentRepository.create({
			email,
			name: data.name,
			passwordHash,
			type: data.type,
			username,
			status: data.status,
			company: {
				connect: {
					id: data.companyId,
				},
			},
		})

		return {
			agent: newAgent,
		}
	}
}
