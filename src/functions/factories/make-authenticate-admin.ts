import { PrismaAdminRepository } from '@/repositories/prisma/prisma-admin-repository'
import { AuthenticateAdmin } from '../authenticate-admin'

export function makeAuthenticateAdmin() {
	const adminRepository = new PrismaAdminRepository()
	const authenticateAdmin = new AuthenticateAdmin(adminRepository)

	return authenticateAdmin
}
