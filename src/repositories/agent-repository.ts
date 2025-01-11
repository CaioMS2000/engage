import type { Agent, Prisma } from '@prisma/client'

export abstract class AgentRepository {
	abstract create(data: Prisma.AgentCreateInput): Promise<Agent>
	abstract findById(id: string): Promise<Agent | null>
	abstract findByEmail(email: string): Promise<Agent | null>
	abstract findByUsername(username: string): Promise<Agent | null>
}
