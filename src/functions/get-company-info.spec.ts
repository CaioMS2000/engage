import { InMemoryCompanyRepository } from '@/repositories/in-memory/in-memory-company-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CompanyNotFoundError } from './errors/company-not-found-error'
import { GetCompanyInfo } from './get-company-info'

let companyRepository: InMemoryCompanyRepository
let getCompanyInfo: GetCompanyInfo

describe('Get Company info', () => {
	beforeEach(() => {
		companyRepository = new InMemoryCompanyRepository()
		getCompanyInfo = new GetCompanyInfo(companyRepository)
	})

	it('should be able to get company info', async () => {
		const createdCompany = await companyRepository.create({
			cnpj: '12345678901234',
			name: 'Company 1',
			email: 'company1@example.com',
			phone: '123456789',
		})
		const { company } = await getCompanyInfo.exec({
			companyId: createdCompany.id,
		})

		expect(company.id).toEqual(expect.any(String))
	})

	it('should not be able to get company info with wrong id', async () => {
		await expect(() =>
			getCompanyInfo.exec({
				companyId: 'non-existing-id',
			})
		).rejects.toBeInstanceOf(CompanyNotFoundError)
	})
})
