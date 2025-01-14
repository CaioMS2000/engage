import { Admin } from '../../enterprise/entities/admin'

export interface AdminRepository {
	create(admin: Admin): Promise<void>
}
