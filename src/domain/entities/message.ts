import { Entity } from '@/core/entities/entity'

// biome-ignore lint/style/useEnumInitializers:
enum AuthorType {
	CLIENT,
	AGENT,
	ADMIN,
}

type MessageProps = {
	chatId: string
	authorId: string
	authorType: AuthorType
	content: string
	sentAt: Date
}

export class Message extends Entity<MessageProps> {
	get chatId(): string {
		return this.props.chatId
	}

	get authorId(): string {
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
}
