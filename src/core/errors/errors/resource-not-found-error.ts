import { FunctionError } from '@/core/errors/function-error'

export class ResourceNotFoundError extends Error implements FunctionError {
	constructor(message = 'Resource not found') {
		super(message)
	}
}
