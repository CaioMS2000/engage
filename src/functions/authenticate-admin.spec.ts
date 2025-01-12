import { InMemoryAdminRepository } from '@/repositories/in-memory/in-memory-admin-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, test } from 'vitest'
import { AuthenticateAdmin } from './authenticate-admin'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let adminRepository: InMemoryAdminRepository
let authenticateAdmin: AuthenticateAdmin

describe('Authenticate Admin', () => {
	beforeEach(() => {
		adminRepository = new InMemoryAdminRepository()
		authenticateAdmin = new AuthenticateAdmin(adminRepository)
	})

	test('should be able to authenticate', async () => {
		const preAdmin = await adminRepository.create({
			name: 'John Doe',
			username: 'johndoe',
			email: 'johndoe@example.com',
			passwordHash: await hash('123456', 6),
		})
		const { admin } = await authenticateAdmin.exec({
			email: preAdmin.email,
			password: '123456',
		})

		expect(admin.id).toEqual(expect.any(String))
	})

	test('should not be able to authenticate with wrong email', async () => {
		await adminRepository.create({
			name: 'John Doe',
			username: 'johndoe',
			email: 'johndoe@example.com',
			passwordHash: await hash('123456', 6),
		})

		await expect(() =>
			authenticateAdmin.exec({
				email: 'johndoe2@example.com',
				password: '123456',
			})
		).rejects.toBeInstanceOf(InvalidCredentialsError)
	})

	test('should not be able to authenticate with wrong password', async () => {
		await adminRepository.create({
			name: 'John Doe',
			username: 'johndoe',
			email: 'johndoe@example.com',
			passwordHash: await hash('123456', 6),
		})

		await expect(() =>
			authenticateAdmin.exec({
				email: 'johndoe@example.com',
				password: '1234567',
			})
		).rejects.toBeInstanceOf(InvalidCredentialsError)
	})
})
