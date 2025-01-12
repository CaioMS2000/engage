import { AdminRepository } from '@/repositories/admin-repository'
import { Admin } from '@prisma/client'
import { hash } from 'bcryptjs'
import {
	UserEmailAlreadyInUseError,
	UserUsernameAlreadyInUseError,
} from './errors/user-already-exists-error'

interface RegisterAdminRequest {
	name: string
	email: string
	password: string
	username: string
}

interface RegisterAdminResponse {
	admin: Admin
}

export class RegisterAdmin {
	constructor(private adminRepository: AdminRepository) {}

	async exec(data: RegisterAdminRequest): Promise<RegisterAdminResponse> {
		const { username, password, email } = data
		const adminWithSameEmail = await this.adminRepository.findByEmail(email)

		if (adminWithSameEmail) {
			throw new UserEmailAlreadyInUseError()
		}

		const adminWithSameUsername =
			await this.adminRepository.findByUsername(username)

		if (adminWithSameUsername) {
			throw new UserUsernameAlreadyInUseError()
		}

		const passwordHash = await hash(password, 6)
		const newAdmin = await this.adminRepository.create({
			email,
			name: data.name,
			passwordHash,
			username,
		})

		return {
			admin: newAdmin,
		}
	}
}
