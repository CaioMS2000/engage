import { Entity } from '@/core/entities/entity'
import { UniqueID } from '@/core/entities/unique-id'

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

	static create(props: AdminProps, id?: UniqueID) {
		return new Admin({ ...props }, id)
	}
}
