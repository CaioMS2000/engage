import { InMemoryAdminRepository } from '@/repositories/in-memory/in-memory-admin-repository'
import { InMemoryAgentRepository } from '@/repositories/in-memory/in-memory-agent-repository'
import { InMemoryCompanyRepository } from '@/repositories/in-memory/in-memory-company-repository'
import { compare, hash } from 'bcryptjs'
import { beforeEach, describe, expect, test } from 'vitest'
import {
	AgentEmailAlreadyInUseError,
	AgentUsernameAlreadyInUseError,
} from './errors/agent-already-exists'
import { RegisterAgent } from './register-agent'

let adminRepository: InMemoryAdminRepository
let agentRepository: InMemoryAgentRepository
let companyRepository: InMemoryCompanyRepository
let registerAgent: RegisterAgent

describe('Register Agent', () => {
	beforeEach(() => {
		adminRepository = new InMemoryAdminRepository()
		companyRepository = new InMemoryCompanyRepository(adminRepository)
		agentRepository = new InMemoryAgentRepository(companyRepository)
		registerAgent = new RegisterAgent(agentRepository)
	})

	test('should be able to register', async () => {
		const admin = await adminRepository.create({
			name: 'John Doe',
			username: 'johndoe',
			email: 'johndoe@example.com',
			passwordHash: await hash('123456', 6),
		})
		const company = await companyRepository.create({
			name: 'Company 1',
			cnpj: '12345678901234',
			phone: '12345678901',
			admins: {
				connect: {
					id: admin.id,
				},
			},
		})
		const { agent } = await registerAgent.exec({
			name: 'John Doe',
			email: 'johndoe@example.com',
			username: 'johndoe',
			password: '123456',
			companyId: company.id,
			type: 'PERSON',
		})

		expect(agent.id).toEqual(expect.any(String))
	})

	test('should hash user password upon registration', async () => {
		const admin = await adminRepository.create({
			name: 'John Doe',
			username: 'johndoe',
			email: 'johndoe@example.com',
			passwordHash: await hash('123456', 6),
		})
		const company = await companyRepository.create({
			name: 'Company 1',
			cnpj: '12345678901234',
			phone: '12345678901',
			admins: {
				connect: {
					id: admin.id,
				},
			},
		})
		const { agent } = await registerAgent.exec({
			name: 'John Doe',
			email: 'johndoe@example.com',
			username: 'johndoe',
			password: '123456',
			companyId: company.id,
			type: 'PERSON',
		})
		const isPasswordCorrectlyHashed = await compare('123456', agent.passwordHash)

		expect(isPasswordCorrectlyHashed).toBe(true)
	})

	test('should not be able to register with same email twice', async () => {
		const admin = await adminRepository.create({
			name: 'John Doe',
			username: 'johndoe',
			email: 'johndoe@example.com',
			passwordHash: await hash('123456', 6),
		})
		const company = await companyRepository.create({
			name: 'Company 1',
			cnpj: '12345678901234',
			phone: '12345678901',
			admins: {
				connect: {
					id: admin.id,
				},
			},
		})
		const email = 'johndoe@example.com'

		await registerAgent.exec({
			name: 'John Doe',
			email: email,
			username: 'johndoe',
			password: '123456',
			companyId: company.id,
			type: 'PERSON',
		})

		await expect(() =>
			registerAgent.exec({
				name: 'John Doe2',
				email: email,
				username: 'johndoe2',
				password: '123456',
				companyId: company.id,
				type: 'PERSON',
			})
		).rejects.toBeInstanceOf(AgentEmailAlreadyInUseError)
	})

	test('should not be able to register with same username twice', async () => {
		const admin = await adminRepository.create({
			name: 'John Doe',
			username: 'johndoe',
			email: 'johndoe@example.com',
			passwordHash: await hash('123456', 6),
		})
		const company = await companyRepository.create({
			name: 'Company 1',
			cnpj: '12345678901234',
			phone: '12345678901',
			admins: {
				connect: {
					id: admin.id,
				},
			},
		})
		const username = 'johndoe'

		await registerAgent.exec({
			name: 'John Doe',
			email: 'johndoe@example.com',
			username: username,
			password: '123456',
			companyId: company.id,
			type: 'PERSON',
		})

		await expect(() =>
			registerAgent.exec({
				name: 'John Doe2',
				email: 'johndoe2@example.com',
				username: username,
				password: '123456',
				companyId: company.id,
				type: 'PERSON',
			})
		).rejects.toBeInstanceOf(AgentUsernameAlreadyInUseError)
	})
})
