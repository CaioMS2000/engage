import { InMemoryCompanyRepository } from '@/repositories/in-memory/in-memory-company-repository'
import { describe, expect, test } from 'vitest'
import { RegisterCompany } from './register-company'

describe('Register Company', () => {
	test('should be able to register', async () => {
		const companyRepository = new InMemoryCompanyRepository()
		const registerCompany = new RegisterCompany(companyRepository)
		const { company } = await registerCompany.exec({
			name: 'Super Cool Company',
			cnpj: '00000000000000',
			phone: '1234567890',
		})

		expect(company.id).toEqual(expect.any(String))
	})
})
