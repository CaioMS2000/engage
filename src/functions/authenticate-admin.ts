import { AdminRepository } from '@/repositories/admin-repository'
import type { Admin } from '@prisma/client'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface AuthenticateAdminRequest {
	email: string
	password: string
}

interface AuthenticateAdminResponse {
	admin: Admin
}

export class AuthenticateAdmin {
	constructor(private adminRepository: AdminRepository) {}

	async exec({
		email,
		password,
	}: AuthenticateAdminRequest): Promise<AuthenticateAdminResponse> {
		const admin = await this.adminRepository.findByEmail(email)

		if (!admin) {
			throw new InvalidCredentialsError()
		}

		const doesPasswordMatches = await compare(password, admin.passwordHash)

		if (!doesPasswordMatches) {
			throw new InvalidCredentialsError()
		}

		return {
			admin,
		}
	}
}
