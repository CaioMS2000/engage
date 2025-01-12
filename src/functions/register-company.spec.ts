import { InMemoryAdminRepository } from '@/repositories/in-memory/in-memory-admin-repository'
import { InMemoryCompanyRepository } from '@/repositories/in-memory/in-memory-company-repository'
import { beforeEach, describe, expect, test } from 'vitest'
import { RegisterCompany } from './register-company'

let companyRepository: InMemoryCompanyRepository
let adminRepository: InMemoryAdminRepository
let registerCompany: RegisterCompany

describe('Register Company', () => {
	beforeEach(() => {
		companyRepository = new InMemoryCompanyRepository()
		adminRepository = new InMemoryAdminRepository()
		registerCompany = new RegisterCompany(companyRepository, adminRepository)
	})

	test('should be able to register', async () => {
		const admin = await adminRepository.create({
			name: 'John Doe',
			username: 'johndoe',
			email: 'johndoe@example.com',
			passwordHash: '123456',
		})
		const { company } = await registerCompany.exec({
			name: 'Super Cool Company',
			cnpj: '00000000000000',
			phone: '1234567890',
			adminEmail: admin.email,
		})

		expect(company.id).toEqual(expect.any(String))
	})
})
