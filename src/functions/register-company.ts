import { CompanyRepository } from '@/repositories/company-repository'

interface RgisterCompanyRequest {
	name: string
	email?: string
	phone: string
	cnpj: string
	aiConfig?: string
}

export class RgisterCompany {
	constructor(private companyRepository: CompanyRepository) {}

	async exec(data: RgisterCompanyRequest) {
		const { cnpj } = data

		const companyWithSameCNPJ = await this.companyRepository.findByCNPJ(cnpj)

		if (companyWithSameCNPJ) {
			throw new Error('Company already registered')
		}

		return this.companyRepository.create(data)
	}
}
