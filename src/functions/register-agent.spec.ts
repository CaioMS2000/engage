import { InMemoryAgentRepository } from '@/repositories/in-memory/in-memory-agent-repository'
import { compare } from 'bcryptjs'
import { describe, expect, test } from 'vitest'
import {
	AgentEmailAlreadyInUseError,
	AgentUsernameAlreadyInUseError,
} from './errors/agent-already-exists'
import { RegisterAgent } from './register-agent'

describe('Register Agent', () => {
	test('should be able to register', async () => {
		const agentRepository = new InMemoryAgentRepository()
		const registerAgent = new RegisterAgent(agentRepository)
		const { agent } = await registerAgent.exec({
			name: 'John Doe',
			email: 'johndoe@example.com',
			username: 'johndoe',
			password: '123456',
			companyId: 'any-id',
			type: 'PERSON',
		})

		expect(agent.id).toEqual(expect.any(String))
	})

	test('should hash user password upon registration', async () => {
		const agentRepository = new InMemoryAgentRepository()
		const registerAgent = new RegisterAgent(agentRepository)
		const { agent } = await registerAgent.exec({
			name: 'John Doe',
			email: 'johndoe@example.com',
			username: 'johndoe',
			password: '123456',
			companyId: 'any-id',
			type: 'PERSON',
		})
		const isPasswordCorrectlyHashed = await compare('123456', agent.passwordHash)

		expect(isPasswordCorrectlyHashed).toBe(true)
	})

	test('should not be able to register with same email twice', async () => {
		const agentRepository = new InMemoryAgentRepository()
		const registerAgent = new RegisterAgent(agentRepository)
		const email = 'johndoe@example.com'

		await registerAgent.exec({
			name: 'John Doe',
			email: email,
			username: 'johndoe',
			password: '123456',
			companyId: 'any-id',
			type: 'PERSON',
		})

		await expect(() =>
			registerAgent.exec({
				name: 'John Doe2',
				email: email,
				username: 'johndoe2',
				password: '123456',
				companyId: 'any-id',
				type: 'PERSON',
			})
		).rejects.toBeInstanceOf(AgentEmailAlreadyInUseError)
	})

	test('should not be able to register with same username twice', async () => {
		const agentRepository = new InMemoryAgentRepository()
		const registerAgent = new RegisterAgent(agentRepository)
		const username = 'johndoe'

		await registerAgent.exec({
			name: 'John Doe',
			email: 'johndoe@example.com',
			username: username,
			password: '123456',
			companyId: 'any-id',
			type: 'PERSON',
		})

		await expect(() =>
			registerAgent.exec({
				name: 'John Doe2',
				email: 'johndoe2@example.com',
				username: username,
				password: '123456',
				companyId: 'any-id',
				type: 'PERSON',
			})
		).rejects.toBeInstanceOf(AgentUsernameAlreadyInUseError)
	})
})
