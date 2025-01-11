import { Company, Prisma } from '@prisma/client'
import { CompanyRepository } from '../company-repository'

export class InMemoryCompanyRepository implements CompanyRepository {
	private items: Company[] = []

	create(data: Prisma.CompanyCreateInput): Promise<Company> {
		const company: Company = {
			cnpj: data.cnpj,
			aiConfig: data.aiConfig,
			name: data.name,
			id: 'any-id',
			createdAt: new Date(),
			updatedAt: new Date(),
			email: data.email,
			phone: data.phone,
		}

		this.items.push(company)

		return Promise.resolve(company)
	}

	findByCNPJ(cnpj: string): Promise<Company | null> {
		return Promise.resolve(this.items.find(item => item.cnpj === cnpj) ?? null)
	}
}
