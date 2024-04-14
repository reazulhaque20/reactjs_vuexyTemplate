import { db } from '@/server/fake-db/apps/calendar'

export default defineEventHandler(event => {
  const eventId = getIntId(event, 'event Id is required to delete a event')

  // Find the index of the event in the database
  const eventIndex = db.events.findIndex(e => Number(e.id) === eventId)

  // Remove event from the database
  db.events.splice(eventIndex, 1)

  setResponseStatus(event, 204)

  return null
})
