import { FunctionError } from '@/core/errors/function-error'

export class NotAllowedError extends Error implements FunctionError {
	constructor(message = 'Not allowed') {
		super(message)
	}
}
