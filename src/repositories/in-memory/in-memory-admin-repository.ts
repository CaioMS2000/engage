import { randomUUID } from 'node:crypto'
import type { Admin, Company, Prisma } from '@prisma/client'
import { AdminRepository } from '../admin-repository'

export class InMemoryAdminRepository implements AdminRepository {
	public items: (Admin & { companies: Company[] })[] = []

	create(data: Prisma.AdminCreateInput): Promise<Admin> {
		const admin: Admin = {
			id: randomUUID(),
			name: data.name,
			email: data.email,
			username: data.username,
			passwordHash: data.passwordHash,
			createdAt: new Date(),
			updatedAt: new Date(),
		}

		this.items.push({ ...admin, companies: [] })

		return Promise.resolve(admin)
	}

	findById(id: string): Promise<Admin | null> {
		return Promise.resolve(this.items.find(item => item.id === id) ?? null)
	}

	findByEmail(email: string): Promise<Admin | null> {
		return Promise.resolve(this.items.find(item => item.email === email) ?? null)
	}

	findByUsername(username: string): Promise<Admin | null> {
		return Promise.resolve(
			this.items.find(item => item.username === username) ?? null
		)
	}
}
