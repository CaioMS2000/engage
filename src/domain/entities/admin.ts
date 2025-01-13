import { randomUUID } from 'node:crypto'

type AdminProps = {
	name: string
	email: string
	username: string
	passwordHash: string
	createdAt?: Date
	updatedAt?: Date
}

export class Admin {
	public id: string
	public name: string
	public email: string
	public username: string
	public passwordHash: string
	public createdAt: Date
	public updatedAt: Date

	constructor(props: AdminProps, id?: string) {
		const { name, email, username, passwordHash, createdAt, updatedAt } = props
		this.id = id ?? randomUUID().toString()
		this.name = name
		this.email = email
		this.username = username
		this.passwordHash = passwordHash
		this.createdAt = createdAt ?? new Date()
		this.updatedAt = updatedAt ?? new Date()
	}
}
