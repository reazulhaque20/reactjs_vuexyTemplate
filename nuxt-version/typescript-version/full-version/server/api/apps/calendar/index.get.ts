import is from '@sindresorhus/is'
import { destr } from 'destr'
import { db } from '@/server/fake-db/apps/calendar'

export default defineEventHandler(event => {
  const queries = getQuery(event)

  const parsedCalendars = destr(queries.calendars)

  const calendars = is.array(parsedCalendars) ? parsedCalendars : parsedCalendars !== undefined ? [parsedCalendars] : undefined

  const events = db.events.filter(e => calendars?.includes(e.extendedProps.calendar))

  setResponseStatus(event, 200)

  return events
})
