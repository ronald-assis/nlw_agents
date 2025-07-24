import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'

export const createRoomsRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms',
    {
      schema: {
        body: z.object({
          name: z.string().min(1, 'Room name is required'),
          description: z.string(),
        }),
      },
    },
    async ({ body }, reply) => {
      const { name, description } = body

      const result = await db
        .insert(schema.rooms)
        .values({
          name,
          description,
        })
        .returning()

      const inserteRoom = result[0]

      if (!inserteRoom) {
        throw new Error('Failed to create new room')
      }

      return reply.status(201).send({ roomId: inserteRoom.id })
    }
  )
}
