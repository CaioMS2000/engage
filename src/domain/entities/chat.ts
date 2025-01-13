import { Entity } from '@/core/entities/entity'
import { Slug } from './value-objecs/slug'

// biome-ignore lint/style/useEnumInitializers:
enum ChatStatus {
	OPEN,
	CLOSED,
}

type ChatProps = {
	companyId: string
	clientId: string
	slug: Slug
	status: ChatStatus
}

export class Chat extends Entity<ChatProps> {
	get companyId(): string {
		return this.props.companyId
	}

	get clientId(): string {
		return this.props.clientId
	}

	get slug(): Slug {
		return this.props.slug
	}

	get status(): ChatStatus {
		return this.props.status
	}
}
