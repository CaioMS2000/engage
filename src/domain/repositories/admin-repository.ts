import { Admin } from '../entities/admin'

export interface AdminRepository {
	create(admin: Admin): Promise<void>
}
