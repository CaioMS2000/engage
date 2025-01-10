import { CompanyRepository } from '@/repositories/company-repository'
import { CompanyAlreadyExistsError } from './errors/company-already-exists'

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
			throw new CompanyAlreadyExistsError()
		}

		return this.companyRepository.create(data)
	}
}
