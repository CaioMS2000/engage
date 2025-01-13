import { Entity } from '@/core/entities/entity'

type AdminProps = {
	name: string
	email: string
	username: string
	passwordHash: string
}

export class Admin extends Entity<AdminProps> {
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
}
