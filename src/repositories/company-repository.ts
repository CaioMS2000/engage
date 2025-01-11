import { Company, Prisma } from '@prisma/client'

export abstract class CompanyRepository {
	abstract create(data: Prisma.CompanyCreateInput): Promise<Company>
	abstract findByCNPJ(cnpj: string): Promise<Company | null>
}
