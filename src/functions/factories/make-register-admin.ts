import { PrismaAdminRepository } from '@/repositories/prisma/prisma-admin-repository'
import { RegisterAdmin } from '../register-admin'

export function makeRegisterAdmin() {
	const adminRepository = new PrismaAdminRepository()
	const registerAdmin = new RegisterAdmin(adminRepository)

	return registerAdmin
}
