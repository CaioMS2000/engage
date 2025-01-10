import { env } from '@/env'
import { PrismaClient } from '@prisma/client'

declare global {
	var cachedPrism: PrismaClient
}

let prisma: PrismaClient
if (process.env.NODE_ENV === 'production') {
	prisma = new PrismaClient({
		log: env.NODE_ENV === 'dev' ? ['query'] : [],
	})
} else {
	if (!global.cachedPrism) {
		global.cachedPrism = new PrismaClient({
			log: env.NODE_ENV === 'dev' ? ['query'] : [],
		})

		console.log('\x1b[32m[NEW DATABASE CONNECTION]\x1b[0m')
	}
	prisma = global.cachedPrism
}

export { prisma }
