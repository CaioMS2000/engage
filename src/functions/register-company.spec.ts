import { InMemoryCompanyRepository } from '@/repositories/in-memory/in-memory-company-repository'
import { beforeEach, describe, expect, test } from 'vitest'
import { RegisterCompany } from './register-company'

let companyRepository: InMemoryCompanyRepository
let registerCompany: RegisterCompany

describe('Register Company', () => {
	beforeEach(() => {
		companyRepository = new InMemoryCompanyRepository()
		registerCompany = new RegisterCompany(companyRepository)
	})

	test('should be able to register', async () => {
		const { company } = await registerCompany.exec({
			name: 'Super Cool Company',
			cnpj: '00000000000000',
			phone: '1234567890',
		})

		expect(company.id).toEqual(expect.any(String))
	})
})
