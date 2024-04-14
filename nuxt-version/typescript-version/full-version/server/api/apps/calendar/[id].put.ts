import { db } from '@/server/fake-db/apps/calendar'

export default defineEventHandler(async event => {
  const updatedEvent = await readBody(event)

  updatedEvent.id = Number(updatedEvent.id)

  // Find the index of the event in the database
  const currentEvent = db.events.find(e => e.id === updatedEvent.id)

  // update event
  if (currentEvent) {
    Object.assign(currentEvent, updatedEvent)

    setResponseStatus(event, 200)

    return currentEvent
  }

  setResponseStatus(event, 400)

  return { message: 'Something went wrong' }
})
