import { Agent, Prisma } from '@prisma/client'
import { AgentRepository } from '../agent-repository'

export class InMemoryAgentRepository implements AgentRepository {
	private items: Agent[] = []

	create(data: Prisma.AgentCreateInput): Promise<Agent> {
		const agent: Agent = {
			id: 'any-id',
			name: data.name,
			email: data.email,
			username: data.username,
			passwordHash: data.passwordHash,
			type: data.type,
			createdAt: new Date(),
			updatedAt: new Date(),
			status: data.status,
			companyId: 'any-id',
		}

		this.items.push(agent)

		return Promise.resolve(agent)
	}

	findById(id: string): Promise<Agent | null> {
		return Promise.resolve(this.items.find(item => item.id === id) ?? null)
	}

	findByEmail(email: string): Promise<Agent | null> {
		return Promise.resolve(this.items.find(item => item.email === email) ?? null)
	}

	findByUsername(username: string): Promise<Agent | null> {
		return Promise.resolve(
			this.items.find(item => item.username === username) ?? null
		)
	}
}
