import { InMemoryAgentRepository } from '@/repositories/in-memory/in-memory-agent-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { UserNotFoundError } from './errors/user-not-found-error'
import { GetAgentProfile } from './get-agent-profile'

let agentRepository: InMemoryAgentRepository
let getAgentProfile: GetAgentProfile

describe('Get agent profile', () => {
	beforeEach(() => {
		agentRepository = new InMemoryAgentRepository()
		getAgentProfile = new GetAgentProfile(agentRepository)
	})

	it('should be able to get agent profile', async () => {
		const createdAgent = await agentRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			passwordHash: '123456',
			username: 'johndoe',
			type: 'PERSON',
			company: {},
		})
		const { agent } = await getAgentProfile.exec({
			agentId: createdAgent.id,
		})

		expect(agent.id).toEqual(expect.any(String))
	})

	it('should not be able to get agent profile with wrong id', async () => {
		await expect(() =>
			getAgentProfile.exec({
				agentId: 'non-existing-id',
			})
		).rejects.toBeInstanceOf(UserNotFoundError)
	})
})
