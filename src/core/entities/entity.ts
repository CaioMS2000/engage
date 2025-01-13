import { randomUUID } from 'node:crypto'
import { UniqueID } from './unique-id'

export class Entity<Props> {
	private id_: UniqueID
	protected createdAt: Date
	protected updatedAt: Date
	protected props: Props

	get id() {
		return this.id_
	}

	constructor(props: Props, id?: string) {
		this.props = props
		this.id_ = new UniqueID(id)
		this.createdAt = new Date()
		this.updatedAt = new Date()
	}
}
