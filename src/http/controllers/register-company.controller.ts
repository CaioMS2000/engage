import { CompanyAlreadyExistsError } from '@/functions/errors/company-already-exists'
import { RgisterCompany } from '@/functions/register-company'
import { PrismaCompanyRepository } from '@/repositories/prisma/prisma-company-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

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
		const companyRepository = new PrismaCompanyRepository()
		const registerCompany = new RgisterCompany(companyRepository)

		await registerCompany.exec({
			cnpj: data.cnpj,
			name: data.name,
			email: data.email,
			phone: data.phone,
			aiConfig: data.aiConfig,
		})
	} catch (err) {
		if (err instanceof CompanyAlreadyExistsError) {
			return reply.status(409).send({ message: err.message })
		}

		throw err
	}

	return reply.status(201).send()
}
