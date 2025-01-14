import { UniqueID } from './unique-id'

export class Entity<Props> {
	private id_: UniqueID
	protected createdAt: Date
	protected updatedAt: Date
	protected props: Props

	get id() {
		return this.id_
	}

	protected constructor(props: Props, id?: UniqueID) {
		this.props = props
		this.id_ = id ?? new UniqueID()
		this.createdAt = new Date()
		this.updatedAt = new Date()
	}
}
