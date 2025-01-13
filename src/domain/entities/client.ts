import { randomUUID } from 'node:crypto'

type ClientProps = {
	id: number
	name: string
	email?: string
	phone: string
	createdAt: Date
	updatedAt: Date
}

export class Client {
	public id: string
	public name: string
	public email?: string
	public phone: string
	public createdAt: Date
	public updatedAt: Date

	constructor(props: ClientProps, id?: string) {
		const { name, email, phone, createdAt, updatedAt } = props
		this.id = id ?? randomUUID().toString()
		this.name = name
		this.email = email
		this.phone = phone
		this.createdAt = createdAt ?? new Date()
		this.updatedAt = updatedAt ?? new Date()
	}
}
