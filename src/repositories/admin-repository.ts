import type { Admin, Prisma } from '@prisma/client'

export abstract class AdminRepository {
	abstract create(data: Prisma.AdminCreateInput): Promise<Admin>
	abstract findById(id: string): Promise<Admin | null>
	abstract findByEmail(email: string): Promise<Admin | null>
	abstract findByUsername(username: string): Promise<Admin | null>
}
