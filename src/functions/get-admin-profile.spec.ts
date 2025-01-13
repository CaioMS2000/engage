import { InMemoryAdminRepository } from '@/repositories/in-memory/in-memory-admin-repository'
import { UserNotFoundError } from './errors/user-not-found-error'
import { GetAdminProfile } from './get-admin-profile'

let adminRepository: InMemoryAdminRepository
let getAdminProfile: GetAdminProfile

describe('Get admin profile', () => {
	beforeEach(() => {
		adminRepository = new InMemoryAdminRepository()
		getAdminProfile = new GetAdminProfile(adminRepository)
	})

	it('should be able to get admin profile', async () => {
		const createdAdmin = await adminRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			passwordHash: '123456',
			username: 'johndoe',
		})
		const { admin } = await getAdminProfile.exec({
			adminId: createdAdmin.id,
		})

		expect(admin.id).toEqual(expect.any(String))
	})

	it('should not be able to get admin profile with wrong id', async () => {
		await expect(() =>
			getAdminProfile.exec({
				adminId: 'non-existing-id',
			})
		).rejects.toBeInstanceOf(UserNotFoundError)
	})
})
