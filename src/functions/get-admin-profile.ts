import { AdminRepository } from '@/repositories/admin-repository'
import { Admin } from '@prisma/client'
import { UserNotFoundError } from './errors/user-not-found-error'

interface GetAdminProfileRequest {
	adminId: string
}

interface GetAdminProfileResponse {
	admin: Admin
}

export class GetAdminProfile {
	constructor(private adminRepository: AdminRepository) {}

	async exec(data: GetAdminProfileRequest): Promise<GetAdminProfileResponse> {
		const { adminId } = data
		const admin = await this.adminRepository.findById(adminId)

		if (!admin) {
			throw new UserNotFoundError()
		}

		return {
			admin,
		}
	}
}
