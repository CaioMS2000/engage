import { randomUUID } from 'node:crypto'

// biome-ignore lint/style/useEnumInitializers:
enum AgentType {
	PERSON,
	INACTIVE,
}

// biome-ignore lint/style/useEnumInitializers:
enum AgentStatus {
	ACTIVE,
	INACTIVE,
}

type AgentProps = {
	name: string
	email: string
	username: string
	passwordHash: string
	type: AgentType
	status: AgentStatus
	companyId: string
	createdAt?: Date
	updatedAt?: Date
}

export class Agent {
	public id: string
	public name: string
	public email: string
	public username: string
	public passwordHash: string
	public type: AgentType
	public status: AgentStatus
	public companyId: string
	public createdAt: Date
	public updatedAt: Date

	constructor(props: AgentProps, id?: string) {
		const {
			name,
			email,
			username,
			passwordHash,
			type,
			status,
			companyId,
			createdAt,
			updatedAt,
		} = props
		this.id = id ?? randomUUID().toString()
		this.name = name
		this.email = email
		this.username = username
		this.passwordHash = passwordHash
		this.type = type
		this.status = status
		this.companyId = companyId
		this.createdAt = createdAt ?? new Date()
		this.updatedAt = updatedAt ?? new Date()
	}
}
