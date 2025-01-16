import { AdminRepository } from '@/domain/application/repositories/admin-repository'
import { Admin } from '@/domain/enterprise/entities/admin'

export class InMemoryAdminRepository implements AdminRepository {
	public admins: Admin[] = []

	async create(admin: Admin): Promise<void> {
		this.admins.push(admin)
	}

	findByID(id: string): Promise<Admin | null> {
		const admin = this.admins.find(admin => admin.id.toString() === id)

		if (!admin) {
			return Promise.resolve(null)
		}

		return Promise.resolve(admin)
	}
}
