import { Entity } from '@/core/entities/entity'
import { UniqueID } from '@/core/entities/unique-id'

type ClientProps = {
	name: string
	email?: string
	phone: string
}

export class Client extends Entity<ClientProps> {
	get name(): string {
		return this.props.name
	}

	get email(): string | undefined {
		return this.props.email
	}

	get phone(): string {
		return this.props.phone
	}

	static create(props: ClientProps, id?: UniqueID) {
		return new Client({ ...props }, id)
	}
}
