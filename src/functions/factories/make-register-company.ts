import { PrismaAdminRepository } from '@/repositories/prisma/prisma-admin-repository'
import { PrismaCompanyRepository } from '@/repositories/prisma/prisma-company-repository'
import { RegisterCompany } from '../register-company'

export function makeRegisterCompany() {
	const companyRepository = new PrismaCompanyRepository()
	const adminRepository = new PrismaAdminRepository()
	const registerCompany = new RegisterCompany(companyRepository, adminRepository)

	return registerCompany
}
