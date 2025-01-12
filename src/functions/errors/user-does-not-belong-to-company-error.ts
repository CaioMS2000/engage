export class UserDoesNotBelongToCompanyError extends Error {
	constructor() {
		super('User does not belong to company.')
	}
}
