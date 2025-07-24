import type { FastifyInstance } from 'fastify'
import { createQuestionsRoute } from './create-question.ts'
import { createRoomsRoute } from './create-rooms.ts'
import { getRoomQuestionsRoute } from './get-room-questions.ts'
import { getRoomsRoute } from './get-rooms.ts'

export function routes(app: FastifyInstance) {
  app.register(getRoomsRoute)
  app.register(createRoomsRoute)
  app.register(getRoomQuestionsRoute)
  app.register(createQuestionsRoute)
}
