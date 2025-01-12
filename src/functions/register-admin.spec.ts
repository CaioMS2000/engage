import { InMemoryAdminRepository } from '@/repositories/in-memory/in-memory-admin-repository'
import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, test } from 'vitest'
import {
	UserEmailAlreadyInUseError,
	UserUsernameAlreadyInUseError,
} from './errors/user-already-exists-error'
import { RegisterAdmin } from './register-admin'

let adminRepository: InMemoryAdminRepository
let registerAdmin: RegisterAdmin

describe('Register Admin', () => {
	beforeEach(() => {
		adminRepository = new InMemoryAdminRepository()
		registerAdmin = new RegisterAdmin(adminRepository)
	})

	test('should be able to register', async () => {
		const { admin } = await registerAdmin.exec({
			name: 'John Doe',
			email: 'johndoe@example.com',
			username: 'johndoe',
			password: '123456',
		})

		expect(admin.id).toEqual(expect.any(String))
	})

	test('should hash user password upon registration', async () => {
		const { admin } = await registerAdmin.exec({
			name: 'John Doe',
			email: 'johndoe@example.com',
			username: 'johndoe',
			password: '123456',
		})
		const isPasswordCorrectlyHashed = await compare('123456', admin.passwordHash)

		expect(isPasswordCorrectlyHashed).toBe(true)
	})

	test('should not be able to register with same email twice', async () => {
		const email = 'johndoe@example.com'

		await registerAdmin.exec({
			name: 'John Doe',
			email: email,
			username: 'johndoe',
			password: '123456',
		})

		await expect(() =>
			registerAdmin.exec({
				name: 'John Doe2',
				email: email,
				username: 'johndoe2',
				password: '123456',
			})
		).rejects.toBeInstanceOf(UserEmailAlreadyInUseError)
	})

	test('should not be able to register with same username twice', async () => {
		const username = 'johndoe'

		await registerAdmin.exec({
			name: 'John Doe',
			email: 'johndoe@example.com',
			username: username,
			password: '123456',
		})

		await expect(() =>
			registerAdmin.exec({
				name: 'John Doe2',
				email: 'johndoe2@example.com',
				username: username,
				password: '123456',
			})
		).rejects.toBeInstanceOf(UserUsernameAlreadyInUseError)
	})
})
