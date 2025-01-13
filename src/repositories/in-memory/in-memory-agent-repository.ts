import { randomUUID } from 'node:crypto'
import { Agent, Prisma } from '@prisma/client'
import { AgentRepository } from '../agent-repository'
import { InMemoryCompanyRepository } from './in-memory-company-repository'

export class InMemoryAgentRepository implements AgentRepository {
	public items: Agent[] = []

	constructor(private companyRepository: InMemoryCompanyRepository) {}

	create(data: Prisma.AgentCreateInput): Promise<Agent> {
		const cpId = data.company.connect.id
		const agent: Agent = {
			id: randomUUID(),
			name: data.name,
			email: data.email,
			username: data.username,
			passwordHash: data.passwordHash,
			type: data.type,
			createdAt: new Date(),
			updatedAt: new Date(),
			status: data.status,
			companyId: cpId,
		}
		const company = this.companyRepository.items.find(item => item.id === cpId)

		if (!company) {
			throw new Error('Company not found')
		}

		company.agents.push(agent)

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
