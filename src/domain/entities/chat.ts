import { Entity } from '@/core/entities/entity'
import { UniqueID } from '@/core/entities/unique-id'
import { Slug } from './value-objecs/slug'

// biome-ignore lint/style/useEnumInitializers:
enum ChatStatus {
	OPEN,
	CLOSED,
}

type ChatProps = {
	companyId: UniqueID
	clientId: UniqueID
	slug: Slug
	status: ChatStatus
}

export class Chat extends Entity<ChatProps> {
	get companyId() {
		return this.props.companyId
	}

	get clientId() {
		return this.props.clientId
	}

	get slug(): Slug {
		return this.props.slug
	}

	get status(): ChatStatus {
		return this.props.status
	}
}
