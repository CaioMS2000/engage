import { prisma } from '@/lib/prisma'

interface RgisterRequest {
  name: string
  email: string
  phone: string
  cnpj: string
  aiConfig: string
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

  await prisma.company.create({
    data,
  })
}
