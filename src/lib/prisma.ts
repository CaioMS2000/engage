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
	}
	prisma = global.cachedPrism
}

export { prisma }
