import { Admin } from '@/domain/entities/admin'
import { AdminRepository } from '@/domain/repositories/admin-repository'

export class InMemoryAdminRepository implements AdminRepository {
	public admins: Admin[] = []

	async create(admin: Admin): Promise<void> {
		this.admins.push(admin)
	}
}
