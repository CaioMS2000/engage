import { InMemoryAgentRepository } from '@/repositories/in-memory/in-memory-agent-repository'
import { InMemoryCompanyRepository } from '@/repositories/in-memory/in-memory-company-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { UserNotFoundError } from './errors/user-not-found-error'
import { GetAgentProfile } from './get-agent-profile'

let agentRepository: InMemoryAgentRepository
let companyRepository: InMemoryCompanyRepository
let getAgentProfile: GetAgentProfile

describe('Get agent profile', () => {
	beforeEach(() => {
		companyRepository = new InMemoryCompanyRepository()
		agentRepository = new InMemoryAgentRepository(companyRepository)
		getAgentProfile = new GetAgentProfile(agentRepository, companyRepository)
	})

	it('should be able to get agent profile', async () => {
		const createdCompany = await companyRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			cnpj: '12345678901234',
			phone: '12345678901',
		})
		const createdAgent = await agentRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			passwordHash: '123456',
			username: 'johndoe',
			type: 'PERSON',
			company: {
				connect: {
					id: createdCompany.id,
				},
			},
		})
		const { agent } = await getAgentProfile.exec({
			agentId: createdAgent.id,
			companyId: createdCompany.id,
		})

		expect(agent.id).toEqual(expect.any(String))
	})

	it('should not be able to get agent profile with wrong id', async () => {
		const createdCompany = await companyRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			cnpj: '12345678901234',
			phone: '12345678901',
		})
		await expect(() =>
			getAgentProfile.exec({
				agentId: 'non-existing-id',
				companyId: createdCompany.id,
			})
		).rejects.toBeInstanceOf(UserNotFoundError)
	})
})
