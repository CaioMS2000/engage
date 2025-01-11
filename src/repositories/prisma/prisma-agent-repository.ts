import { prisma } from '@/lib/prisma'
import type { Agent, Prisma } from '@prisma/client'
import { AgentRepository } from '../agent-repository'

export class PrismaAgentRepository implements AgentRepository {
	async create(data: Prisma.AgentCreateInput) {
		return prisma.agent.create({
			data,
		})
	}

	findByEmail(email: string): Promise<Agent | null> {
		return prisma.agent.findUnique({
			where: {
				email,
			},
		})
	}

	findByUsername(username: string): Promise<Agent | null> {
		return prisma.agent.findUnique({
			where: {
				username,
			},
		})
	}

	findById(id: string): Promise<Agent | null> {
		return prisma.agent.findUnique({
			where: {
				id,
			},
		})
	}
}
