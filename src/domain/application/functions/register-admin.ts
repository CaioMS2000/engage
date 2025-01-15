import { Either, right } from '@/core/either'
import { AdminRepository } from '@/domain/application/repositories/admin-repository'
import { Admin } from '@/domain/enterprise/entities/admin'
import { hash } from 'bcryptjs'

type RegisterAdminRequest = {
	name: string
	email: string
	username: string
	password: string
}

type RegisterAdminResponse = Either<
	null,
	{
		admin: Admin
	}
>

export class RegisterAdmin {
	constructor(private adminRepository: AdminRepository) {}

	async exec(request: RegisterAdminRequest): Promise<RegisterAdminResponse> {
		const { name, email, username, password } = request
		const passwordHash = await hash(password, 6)
		const admin = Admin.create({ name, email, username, passwordHash })

		await this.adminRepository.create(admin)

		return right({ admin })
	}
}
