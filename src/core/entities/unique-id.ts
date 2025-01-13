import { randomUUID } from 'node:crypto'

export class UniqueID {
	private value: string

	constructor(id?: string) {
		this.value = id ?? randomUUID().toString()
	}

	toString(): string {
		return this.value
	}

	toValue(): string {
		return this.value
	}
}
