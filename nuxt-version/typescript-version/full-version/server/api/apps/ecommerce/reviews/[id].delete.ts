import { db } from '@/server/fake-db/apps/ecommerce'

export default defineEventHandler(event => {
  const reviewId = getIntId(event, 'Review id is required to get review details')

  const id = Number(reviewId)

  const reviewIndex = db.reviews.findIndex(e => e.id === id)

  if (reviewIndex >= 0) {
    db.reviews.splice(reviewIndex, 1)
    setResponseStatus(event, 204)

    return null
  }

  setResponseStatus(event, 204)
})
