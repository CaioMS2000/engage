import { randomUUID } from 'node:crypto'

type CompanyProps = {
	name: string
	CNPJ: string
	phone: string
	aiConfig?: string
	email?: string
	createdAt?: Date
	updatedAt?: Date
}

export class Company {
	public id: string
	public name: string
	public CNPJ: string
	public aiConfig?: string
	public email?: string
	public phone: string
	public createdAt: Date
	public updatedAt: Date

	constructor(props: CompanyProps, id?: string) {
		const { name, CNPJ, aiConfig, email, phone, createdAt, updatedAt } = props
		this.id = id ?? randomUUID().toString()
		this.name = name
		this.CNPJ = CNPJ
		this.aiConfig = aiConfig
		this.email = email
		this.phone = phone
		this.createdAt = createdAt ?? new Date()
		this.updatedAt = updatedAt ?? new Date()
	}
}
