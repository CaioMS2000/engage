import { registerCompany } from '@/functions/register-company'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function registerCompanyController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const registerCompanyBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    cnpj: z.string(),
    aiConfig: z.string(),
  })

  const data = registerCompanyBodySchema.parse(request.body)

  try {
    await registerCompany({
      aiConfig: data.aiConfig,
      cnpj: data.cnpj,
      email: data.email,
      name: data.name,
      phone: data.phone,
    })
  } catch (err) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
