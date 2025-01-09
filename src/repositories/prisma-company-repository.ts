import { prisma } from '@/lib/prisma'
import type { Prisma } from '@prisma/client'

export class PrismaCompanyRepository {
  async create(data: Prisma.CompanyCreateInput) {
    return prisma.company.create({
      data,
    })
  }
}
