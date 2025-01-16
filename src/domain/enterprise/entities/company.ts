import { Entity } from '@/core/entities/entity'
import { UniqueID } from '@/core/entities/unique-id'

type CompanyProps = {
	adminId: UniqueID
	name: string
	CNPJ: string
	phone: string
	aiConfig?: string
	email?: string
}

export class Company extends Entity<CompanyProps> {
	get adminId() {
		return this.props.adminId
	}

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

	static create(props: CompanyProps, id?: UniqueID) {
		return new Company({ ...props }, id)
	}
}
