import { randomUUID } from 'node:crypto'
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
	createdAt: Date
	updatedAt: Date
}

export class Chat {
	public id: string
	public companyId: string
	public slug: Slug
	public clientId: string
	public status: ChatStatus
	public createdAt: Date
	public updatedAt: Date

	constructor(props: ChatProps, id?: string) {
		const { companyId, clientId, status, createdAt, updatedAt, slug } = props
		this.id = id ?? randomUUID().toString()
		this.companyId = companyId
		this.clientId = clientId
		this.status = status
		this.slug = slug
		this.createdAt = createdAt ?? new Date()
		this.updatedAt = updatedAt ?? new Date()
	}
}
