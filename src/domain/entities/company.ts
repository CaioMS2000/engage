import { Entity } from '@/core/entities/entity'

type CompanyProps = {
	name: string
	CNPJ: string
	phone: string
	aiConfig?: string
	email?: string
}

export class Company extends Entity<CompanyProps> {
	get name(): string {
		return this.props.name
	}

	get CNPJ(): string {
		return this.props.CNPJ
	}

	get phone(): string {
		return this.props.phone
	}

	get aiConfig(): string | undefined {
		return this.props.aiConfig
	}

	get email(): string | undefined {
		return this.props.email
	}
}
