import { RegisterAdmin } from './register-admin'

let fn: RegisterAdmin

describe('Register admin', () => {
	beforeEach(() => {
		fn = new RegisterAdmin()
	})

	it('should register an admin', async () => {
		const { admin } = await fn.exec({
			name: 'John Doe',
			email: 'john.doe@example.com',
			username: 'johndoe',
			password: '123456',
		})

		expect(admin.id).toBeDefined()
		expect(admin.id).toEqual(expect.any(String))
	})
})
