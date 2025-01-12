export class UserAlreadyExistsError extends Error {
	constructor() {
		super('User already exists')
	}
}

export class UserEmailAlreadyInUseError extends Error {
	constructor() {
		super('User email already in use')
	}
}

export class UserUsernameAlreadyInUseError extends Error {
	constructor() {
		super('User username already in use')
	}
}
