import { Entity } from '@/core/entities/entity'

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
}

export class Agent extends Entity<AgentProps> {
	get name(): string {
		return this.props.name
	}

	get email(): string {
		return this.props.email
	}

	get username(): string {
		return this.props.username
	}

	get passwordHash(): string {
		return this.props.passwordHash
	}

	get type(): AgentType {
		return this.props.type
	}

	get status(): AgentStatus {
		return this.props.status
	}

	get companyId(): string {
		return this.props.companyId
	}
}
