import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RgisterRequest {
  name: string
  email: string
  password: string
}

export async function register({ email, name, password }: RgisterRequest) {
  const userWithSameEmail = await prisma.agent.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('Email already registered')
  }

  const passwordHash = await hash(password, 6)

  await prisma.agent.create({
    data: {
      name,
      email,
      passwordHash,
    },
  })
}
