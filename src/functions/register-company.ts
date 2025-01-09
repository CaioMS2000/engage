import { prisma } from '@/lib/prisma'
import { PrismaCompanyRepository } from '@/repositories/prisma-company-repository'

interface RgisterRequest {
  name: string
  email?: string
  phone: string
  cnpj: string
  aiConfig?: string
}

export async function registerCompany(data: RgisterRequest) {
  const { cnpj } = data

  const companyWithSameCNPJ = await prisma.company.findUnique({
    where: {
      cnpj,
    },
  })

  if (companyWithSameCNPJ) {
    throw new Error('Company already registered')
  }

  const prismaCompanyRepository = new PrismaCompanyRepository()

  return prismaCompanyRepository.create(data)
}
