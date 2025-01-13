import { randomUUID } from 'node:crypto'

// biome-ignore lint/style/useEnumInitializers:
enum ChatStatus {
	OPEN,
	CLOSED,
}

type ChatProps = {
	companyId: string
	clientId: string
	status: ChatStatus
	createdAt: Date
	updatedAt: Date
}

export class Chat {
	public id: string
	public companyId: string
	public clientId: string
	public status: ChatStatus
	public createdAt: Date
	public updatedAt: Date

	constructor(props: ChatProps, id?: string) {
		const { companyId, clientId, status, createdAt, updatedAt } = props
		this.id = id ?? randomUUID().toString()
		this.companyId = companyId
		this.clientId = clientId
		this.status = status
		this.createdAt = createdAt ?? new Date()
		this.updatedAt = updatedAt ?? new Date()
	}
}
