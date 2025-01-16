import { Admin } from '../../enterprise/entities/admin'

export abstract class AdminRepository {
	abstract create(admin: Admin): Promise<void>
	abstract findByID(id: string): Promise<Admin | null>
}
