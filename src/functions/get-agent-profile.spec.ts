import { InMemoryAdminRepository } from '@/repositories/in-memory/in-memory-admin-repository'
import { InMemoryAgentRepository } from '@/repositories/in-memory/in-memory-agent-repository'
import { InMemoryCompanyRepository } from '@/repositories/in-memory/in-memory-company-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { UserNotFoundError } from './errors/user-not-found-error'
import { GetAgentProfile } from './get-agent-profile'

let agentRepository: InMemoryAgentRepository
let adminRepository: InMemoryAdminRepository
let companyRepository: InMemoryCompanyRepository
let getAgentProfile: GetAgentProfile

describe('Get agent profile', () => {
	beforeEach(() => {
		adminRepository = new InMemoryAdminRepository()
		companyRepository = new InMemoryCompanyRepository(adminRepository)
		agentRepository = new InMemoryAgentRepository(companyRepository)
		getAgentProfile = new GetAgentProfile(agentRepository, companyRepository)
	})

	it('should be able to get agent profile', async () => {
		const admin = await adminRepository.create({
			name: 'John Doe',
			username: 'johndoe',
			email: 'johndoe@example.com',
			passwordHash: await hash('123456', 6),
		})
		const createdCompany = await companyRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			cnpj: '12345678901234',
			phone: '12345678901',
			admins: {
				connect: {
					id: admin.id,
				},
			},
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
		const admin = await adminRepository.create({
			name: 'John Doe',
			username: 'johndoe',
			email: 'johndoe@example.com',
			passwordHash: await hash('123456', 6),
		})
		const createdCompany = await companyRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			cnpj: '12345678901234',
			phone: '12345678901',
			admins: {
				connect: {
					id: admin.id,
				},
			},
		})
		await expect(() =>
			getAgentProfile.exec({
				agentId: 'non-existing-id',
				companyId: createdCompany.id,
			})
		).rejects.toBeInstanceOf(UserNotFoundError)
	})
})
