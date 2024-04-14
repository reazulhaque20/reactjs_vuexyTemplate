import { database } from '@/server/fake-db/apps/invoice'

export default defineEventHandler(event => {
  // Get event id from URL
  const invoiceId = getIntId(event, 'User id is required to get user details')

  // Convert Id to number
  const id = Number(invoiceId)

  const invoiceIndex = database.findIndex(e => e.id === id)

  if (invoiceIndex >= 0) {
    database.splice(invoiceIndex, 1)
    setResponseStatus(event, 204)

    return null
  }

  setResponseStatus(event, 204)
})
