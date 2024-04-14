import { db } from '@/server/fake-db/apps/academy'

export default defineEventHandler(() => {
  // return course Details
  return db.courseDetails
})
