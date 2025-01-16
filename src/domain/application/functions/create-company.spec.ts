import { InMemoryCompanyRepository } from 'test/repositories/in-memory-company-repository'
import { CreateCompany } from './create-company'

let fn: CreateCompany
let inMemoryCompanyRepository: InMemoryCompanyRepository

describe('Create company', () => {
	beforeEach(() => {
		inMemoryCompanyRepository = new InMemoryCompanyRepository()
		fn = new CreateCompany(inMemoryCompanyRepository)
	})

	it('should create a company', async () => {
		const result = await fn.exec({
			adminId: '1',
			name: 'Company name',
			email: 'company@email.com',
			phone: '123456789',
			cnpj: '12345678901234',
		})

		expect(result.isRight()).toBe(true)
		expect(result.isLeft()).toBe(false)
		expect(result.value.company.id).toBeDefined()
		expect(inMemoryCompanyRepository.companies[0]).toEqual(result.value.company)
	})
})
