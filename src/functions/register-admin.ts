import { Admin } from '@/domain/entities/admin'
import { hash } from 'bcryptjs'

type RegisterAdminRequest = {
	name: string
	email: string
	username: string
	password: string
}

type RegisterAdminResponse = {
	admin: Admin
}

export class RegisterAdmin {
	async exec(request: RegisterAdminRequest): Promise<RegisterAdminResponse> {
		const { name, email, username, password } = request
		const passwordHash = await hash(password, 6)
		const admin = new Admin({ name, email, username, passwordHash })

		return { admin }
	}
}
