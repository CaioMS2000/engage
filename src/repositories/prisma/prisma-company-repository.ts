import { prisma } from '@/lib/prisma'
import type { Prisma } from '@prisma/client'
import { CompanyRepository } from '../company-repository'

export class PrismaCompanyRepository implements CompanyRepository {
	async create(data: Prisma.CompanyCreateInput) {
		return prisma.company.create({
			data,
		})
	}

	async findByCNPJ(cnpj: string) {
		return prisma.company.findUnique({
			where: {
				cnpj,
			},
		})
	}

	async findById(id: string) {
		return prisma.company.findUnique({
			where: {
				id,
			},
			include: {
				agents: true,
				admins: true,
			},
		})
	}
}
