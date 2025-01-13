import { CompanyRepository } from '@/repositories/company-repository'
import type { Admin, Agent, Company } from '@prisma/client'
import { CompanyNotFoundError } from './errors/company-not-found-error'

interface GetCompanyInfoRequest {
	companyId: string
}

interface GetCompanyInfoResponse {
	// company: Company
	company: Company & {
		agents: Agent[]
		admins: Admin[]
	}
}

export class GetCompanyInfo {
	constructor(private companyRepository: CompanyRepository) {}

	async exec(data: GetCompanyInfoRequest): Promise<GetCompanyInfoResponse> {
		const { companyId } = data
		const company = await this.companyRepository.findById(companyId)

		if (!company) {
			throw new CompanyNotFoundError()
		}

		return {
			company,
		}
	}
}
