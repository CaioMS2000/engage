import { AdminRepository } from '@/repositories/admin-repository'
import { CompanyRepository } from '@/repositories/company-repository'
import type { Company } from '@prisma/client'
import { CompanyAlreadyExistsError } from './errors/company-already-exists'
import { UserNotFoundError } from './errors/user-not-found-error'

interface RgisterCompanyRequest {
	adminEmail: string
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
	constructor(
		private companyRepository: CompanyRepository,
		private adminRepository: AdminRepository
	) {}

	async exec(data: RgisterCompanyRequest): Promise<RegisterCompanyResponse> {
		const { cnpj } = data
		const companyWithSameCNPJ = await this.companyRepository.findByCNPJ(cnpj)

		if (companyWithSameCNPJ) {
			throw new CompanyAlreadyExistsError()
		}

		const admin = await this.adminRepository.findByEmail(data.adminEmail)

		if (!admin) {
			throw new UserNotFoundError()
		}

		const company = await this.companyRepository.create({
			...data,
			admins: {
				connect: {
					id: admin.id,
				},
			},
		})

		return {
			company,
		}
	}
}
