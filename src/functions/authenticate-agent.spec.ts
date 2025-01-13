import { InMemoryAdminRepository } from '@/repositories/in-memory/in-memory-admin-repository'
import { InMemoryAgentRepository } from '@/repositories/in-memory/in-memory-agent-repository'
import { InMemoryCompanyRepository } from '@/repositories/in-memory/in-memory-company-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, test } from 'vitest'
import { AuthenticateAgent } from './authenticate-agent'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let agentRepository: InMemoryAgentRepository
let adminRepository: InMemoryAdminRepository
let companyRepository: InMemoryCompanyRepository
let authenticateAgent: AuthenticateAgent

describe('Authenticate Agent', () => {
	beforeEach(() => {
		adminRepository = new InMemoryAdminRepository()
		companyRepository = new InMemoryCompanyRepository(adminRepository)
		agentRepository = new InMemoryAgentRepository(companyRepository)
		authenticateAgent = new AuthenticateAgent(agentRepository, companyRepository)
	})

	test('should be able to authenticate', async () => {
		const admin = await adminRepository.create({
			name: 'John Doe',
			username: 'johndoe',
			email: 'johndoe@example.com',
			passwordHash: await hash('123456', 6),
		})
		const company = await companyRepository.create({
			id: 'company-1',
			name: 'Company 1',
			cnpj: '12345678901234',
			phone: '12345678901',
			admins: {
				connect: {
					id: admin.id,
				},
			},
		})
		const preAgent = await agentRepository.create({
			name: 'John Doe',
			username: 'johndoe',
			type: 'PERSON',
			email: 'johndoe@example.com',
			passwordHash: await hash('123456', 6),
			company: {
				connect: {
					id: company.id,
				},
			},
		})
		const { agent } = await authenticateAgent.exec({
			companyCNPJ: company.cnpj,
			email: preAgent.email,
			password: '123456',
		})

		expect(agent.id).toEqual(expect.any(String))
	})

	test('should not be able to authenticate with wrong email', async () => {
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

		await agentRepository.create({
			name: 'John Doe',
			username: 'johndoe',
			type: 'PERSON',
			email: 'johndoe@example.com',
			passwordHash: await hash('123456', 6),
			company: {
				connect: {
					id: company.id,
				},
			},
		})

		await expect(() =>
			authenticateAgent.exec({
				companyCNPJ: company.cnpj,
				email: 'johndoe2@example.com',
				password: '123456',
			})
		).rejects.toBeInstanceOf(InvalidCredentialsError)
	})

	test('should not be able to authenticate with wrong password', async () => {
		const admin = await adminRepository.create({
			name: 'John Doe',
			username: 'johndoe',
			email: 'johndoe@example.com',
			passwordHash: await hash('123456', 6),
		})
		const company = await companyRepository.create({
			id: 'company-1',
			name: 'Company 1',
			cnpj: '12345678901234',
			phone: '12345678901',
			admins: {
				connect: {
					id: admin.id,
				},
			},
		})

		await agentRepository.create({
			name: 'John Doe',
			username: 'johndoe',
			type: 'PERSON',
			email: 'johndoe@example.com',
			passwordHash: await hash('123456', 6),
			company: {
				connect: {
					id: company.id,
				},
			},
		})

		await expect(() =>
			authenticateAgent.exec({
				companyCNPJ: company.cnpj,
				email: 'johndoe@example.com',
				password: '1234567',
			})
		).rejects.toBeInstanceOf(InvalidCredentialsError)
	})
})
