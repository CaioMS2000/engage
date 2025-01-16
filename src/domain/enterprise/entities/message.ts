import { Entity } from '@/core/entities/entity'
import { UniqueID } from '@/core/entities/unique-id'

// biome-ignore lint/style/useEnumInitializers:
enum AuthorType {
	CLIENT,
	AGENT,
	ADMIN,
}

type MessageProps = {
	chatId: UniqueID
	authorId: UniqueID
	authorType: AuthorType
	content: string
	sentAt: Date
}

export class Message extends Entity<MessageProps> {
	get chatId() {
		return this.props.chatId
	}

	get authorId() {
		return this.props.authorId
	}

	get authorType(): AuthorType {
		return this.props.authorType
	}

	get content(): string {
		return this.props.content
	}

	get sentAt(): Date {
		return this.props.sentAt
	}

	static create(props: MessageProps, id?: UniqueID) {
		return new Message({ ...props }, id)
	}
}
