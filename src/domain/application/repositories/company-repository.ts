import { Company } from '@/domain/enterprise/entities/company'

export abstract class CompanyRepository {
	abstract create(company: Company): Promise<void>
	abstract findByID(id: string): Promise<Company | null>
	abstract findByCNPJ(cnpj: string): Promise<Company | null>
}
