import { AuthenticateAgent } from '@/functions/authenticate-agent'
import { InvalidCredentialsError } from '@/functions/errors/invalid-credentials-error'
import { UserDoesNotBelongToCompanyError } from '@/functions/errors/user-does-not-belong-to-company-error'
import { PrismaAgentRepository } from '@/repositories/prisma/prisma-agent-repository'
import { PrismaCompanyRepository } from '@/repositories/prisma/prisma-company-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticateAgentController(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const authenticateAgentBodySchema = z.object({
		email: z.string().email(),
		password: z.string().min(6),
		companyCNPJ: z.string().length(14),
	})
	const { email, password, companyCNPJ } = authenticateAgentBodySchema.parse(
		request.body
	)

	try {
		const agentRepository = new PrismaAgentRepository()
		const companyRepository = new PrismaCompanyRepository()
		const authenticateAgent = new AuthenticateAgent(
			agentRepository,
			companyRepository
		)

		const { agent } = await authenticateAgent.exec({
			email,
			password,
			companyCNPJ,
		})
	} catch (error) {
		if (error instanceof InvalidCredentialsError) {
			return reply.status(400).send({ message: error.message })
		}

		if (error instanceof UserDoesNotBelongToCompanyError) {
			return reply.status(400).send({ message: error.message })
		}

		throw error
	}

	return reply.status(200).send()
}
