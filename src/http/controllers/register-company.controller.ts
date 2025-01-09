import { registerCompany } from '@/functions/register-company'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function registerCompanyController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const registerCompanyBodySchema = z.object({
    name: z.string(),
    email: z.string().email().optional(),
    phone: z.string(),
    cnpj: z
      .string()
      .length(14, { message: 'CNPJ deve ter 14 dígitos' })
      .regex(/^\d+$/, { message: 'CNPJ deve conter apenas números' }),
    aiConfig: z.string().optional(),
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
