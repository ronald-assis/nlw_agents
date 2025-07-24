import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'

export const createQuestionsRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms/:roomId/questions',
    {
      schema: {
        params: z.object({
          roomId: z.string().uuid('Invalid room ID format'),
        }),
        body: z.object({
          question: z.string().min(1),
        }),
      },
    },
    async ({ body, params }, reply) => {
      const { roomId } = params
      const { question } = body

      const result = await db
        .insert(schema.questions)
        .values({
          roomId,
          question,
        })
        .returning()

      const inserteQuestion = result[0]

      if (!inserteQuestion) {
        throw new Error('Failed to create new room')
      }

      return reply.status(201).send({ questionId: inserteQuestion.id })
    }
  )
}
