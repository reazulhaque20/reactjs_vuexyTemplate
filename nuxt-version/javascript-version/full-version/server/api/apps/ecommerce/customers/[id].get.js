import { db } from '@/server/fake-db/apps/ecommerce'

export default defineEventHandler(event => {
  const customerId = getIntId(event, 'Customer id is required to get customer details')
  const id = Number(customerId)
  const customerIndex = db.customerData.findIndex(e => e.customerId === id)
  const customer = db.customerData[customerIndex]

  Object.assign(customer, {
    status: 'Active',
    contact: '+1 (234) 567 890',
  })
  if (customer)
    return customer
  else
    setResponseStatus(event, 404)
})
