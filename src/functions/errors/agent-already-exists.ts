export class AgentAlreadyExistsError extends Error {
	constructor() {
		super('Agent already exists')
	}
}

export class AgentEmailAlreadyInUseError extends Error {
	constructor() {
		super('Agent email already in use')
	}
}

export class AgentUsernameAlreadyInUseError extends Error {
	constructor() {
		super('Agent username already in use')
	}
}
