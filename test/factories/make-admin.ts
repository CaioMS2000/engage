import { UniqueID } from '@/core/entities/unique-id'
import { Admin, AdminProps } from '@/domain/enterprise/entities/admin'
import { faker } from '@faker-js/faker'
import { hashSync } from 'bcryptjs'

export function makeAdmin(override: Partial<AdminProps> = {}, id?: UniqueID) {
	const pre: AdminProps = {
		name: faker.person.fullName(),
		email: faker.internet.email(),
		username: faker.internet.username(),
		passwordHash: faker.internet.password(),
		...override,
	}

	return Admin.create(
		{
			...pre,
			passwordHash: hashSync(pre.passwordHash, 6),
		},
		id
	)
}
