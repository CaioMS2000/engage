import { randomUUID } from 'node:crypto'

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
	createdAt: Date
	updatedAt: Date
}

export class Message {
	public id: string
	public chatId: string
	public authorId: string
	public authorType: AuthorType
	public content: string
	public sentAt: Date
	public createdAt: Date
	public updatedAt: Date

	constructor(props: MessageProps, id?: string) {
		const {
			chatId,
			authorId,
			authorType,
			content,
			sentAt,
			createdAt,
			updatedAt,
		} = props
		this.id = id ?? randomUUID().toString()
		this.chatId = chatId
		this.authorId = authorId
		this.authorType = authorType
		this.content = content
		this.sentAt = sentAt
		this.createdAt = createdAt ?? new Date()
		this.updatedAt = updatedAt ?? new Date()
	}
}
