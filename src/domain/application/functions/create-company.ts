import { Either, right } from '@/core/either'
import { UniqueID } from '@/core/entities/unique-id'
import { Company } from '@/domain/enterprise/entities/company'
import { CompanyRepository } from '../repositories/company-repository'

type CreateCompanyRequest = {
	adminId: string
	name: string
	email?: string
	phone: string
	cnpj: string
	aiConfig?: string
}

type CreateCompanyResponse = Either<
	null,
	{
		company: Company
	}
>

export class CreateCompany {
	constructor(private companyRepository: CompanyRepository) {}

	async exec(request: CreateCompanyRequest): Promise<CreateCompanyResponse> {
		const { cnpj, adminId } = request

		const company = Company.create({
			adminId: new UniqueID(adminId),
			CNPJ: cnpj,
			name: request.name,
			email: request.email,
			phone: request.phone,
			aiConfig: request.aiConfig,
		})

		await this.companyRepository.create(company)

		return right({ company })
	}
}
