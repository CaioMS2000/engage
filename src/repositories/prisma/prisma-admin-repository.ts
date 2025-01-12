import { prisma } from '@/lib/prisma'
import type { Admin, Prisma } from '@prisma/client'
import { AdminRepository } from '../admin-repository'

export class PrismaAdminRepository implements AdminRepository {
	async create(data: Prisma.AdminCreateInput) {
		return prisma.admin.create({
			data,
		})
	}

	findByEmail(email: string): Promise<Admin | null> {
		return prisma.admin.findUnique({
			where: {
				email,
			},
		})
	}

	findByUsername(username: string): Promise<Admin | null> {
		return prisma.admin.findUnique({
			where: {
				username,
			},
		})
	}

	findById(id: string): Promise<Admin | null> {
		return prisma.admin.findUnique({
			where: {
				id,
			},
		})
	}
}
