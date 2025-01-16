import { CompanyRepository } from '@/domain/application/repositories/company-repository'
import { Company } from '@/domain/enterprise/entities/company'

export class InMemoryCompanyRepository implements CompanyRepository {
	public companies: Company[] = []

	async create(company: Company): Promise<void> {
		this.companies.push(company)
	}

	findByID(id: string): Promise<Company | null> {
		const company = this.companies.find(company => company.id.toString() === id)
		if (!company) {
			return Promise.resolve(null)
		}

		return Promise.resolve(company)
	}

	findByCNPJ(cnpj: string): Promise<Company | null> {
		const company = this.companies.find(company => company.CNPJ === cnpj)
		if (!company) {
			return Promise.resolve(null)
		}

		return Promise.resolve(company)
	}
}
