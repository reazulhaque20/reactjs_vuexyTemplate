import { db } from '@/server/fake-db/dashboard/index'

export default defineEventHandler(async event => {
  setResponseStatus(event, 200)

  return db.analytics
})
