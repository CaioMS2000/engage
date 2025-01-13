import { AdminRepository } from '@/domain/repositories/admin-repository'
import { InMemoryAdminRepository } from 'test/repositories/in-memory-admin-repository'
import { RegisterAdmin } from './register-admin'

let fn: RegisterAdmin
let adminRepository: AdminRepository

describe('Register admin', () => {
	beforeEach(() => {
		adminRepository = new InMemoryAdminRepository()
		fn = new RegisterAdmin(adminRepository)
	})

	it('should register an admin', async () => {
		const { admin } = await fn.exec({
			name: 'John Doe',
			email: 'john.doe@example.com',
			username: 'johndoe',
			password: '123456',
		})

		expect(admin.id).toBeDefined()
		expect(admin.id).toEqual(
			expect.objectContaining({ value: expect.any(String) })
		)
	})
})
