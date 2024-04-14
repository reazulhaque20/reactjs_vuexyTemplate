import { database } from '@/server/fake-db/apps/invoice'

export default defineEventHandler(event => {
  const clients = database.map(invoice => invoice.client)

  setResponseStatus(event, 200)

  return clients.splice(0, 5)
})
