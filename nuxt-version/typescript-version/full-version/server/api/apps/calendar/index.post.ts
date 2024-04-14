import { db } from '@/server/fake-db/apps/calendar'

export default defineEventHandler(async event => {
  const eventToAdd = await readBody(event)

  // Add the data to the database once validated
  db.events.push({
    ...eventToAdd,
    id: genId(db.events),
  })

  setResponseStatus(event, 201)

  return { body: eventToAdd }
})
