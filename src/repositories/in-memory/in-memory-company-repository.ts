import { Admin, Agent, Company, Prisma } from '@prisma/client'
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

	findById(id: string): Promise<
		| (Company & {
				agents: Agent[]
				admins: Admin[]
		  })
		| null
	> {
		const company = this.items.find(item => item.id === id)

		if (!company) {
			return Promise.resolve(null)
		}

		const fullCompany = {
			...company,
			agents: [],
			admins: [],
		}

		return Promise.resolve(fullCompany)
	}
}

// type Agent = {
// 	name: string
// 	id: string
// 	email: string
// 	createdAt: Date
// 	updatedAt: Date
// 	username: string
// 	passwordHash: string
// 	type: $Enums.AgentType
// 	status: $Enums.AgentStatus
// 	companyId: string
// }

// type Admin = {
// 	name: string
// 	id: string
// 	email: string
// 	createdAt: Date
// 	updatedAt: Date
// 	username: string
// 	passwordHash: string
// }
