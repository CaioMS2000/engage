import { CompanyRepository } from '@/repositories/company-repository'
import type { Company } from '@prisma/client'
import { CompanyAlreadyExistsError } from './errors/company-already-exists'

interface RgisterCompanyRequest {
	name: string
	email?: string
	phone: string
	cnpj: string
	aiConfig?: string
}

interface RegisterCompanyResponse {
	company: Company
}

export class RegisterCompany {
	constructor(private companyRepository: CompanyRepository) {}

	async exec(data: RgisterCompanyRequest): Promise<RegisterCompanyResponse> {
		const { cnpj } = data

		const companyWithSameCNPJ = await this.companyRepository.findByCNPJ(cnpj)

		if (companyWithSameCNPJ) {
			throw new CompanyAlreadyExistsError()
		}

		const company = await this.companyRepository.create(data)

		return {
			company,
		}
	}
}
