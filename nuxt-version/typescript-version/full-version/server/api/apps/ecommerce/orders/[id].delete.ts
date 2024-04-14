import { db } from '@/server/fake-db/apps/ecommerce'

export default defineEventHandler(event => {
  const orderId = getIntId(event, 'Order id is required to get order details')

  const id = Number(orderId)

  const orderIndex = db.orderData.findIndex(e => e.id === id)

  if (orderIndex >= 0) {
    db.orderData.splice(orderIndex, 1)
    setResponseStatus(event, 204)

    return null
  }

  setResponseStatus(event, 204)
})
