import is from '@sindresorhus/is'
import { destr } from 'destr'
import { db } from '@/server/fake-db/apps/ecommerce'
import { paginateArray } from '@/server/utils/paginateArray'

export default defineEventHandler(event => {
  const { q = '', sortBy, orderBy, itemsPerPage = 10, page = 1 } = getQuery(event)

  const parsedSortBy = destr(sortBy)
  const sortByLocal = is.string(parsedSortBy) ? parsedSortBy : ''

  const parsedOrderBy = destr(orderBy)
  const orderByLocal = is.string(parsedOrderBy) ? parsedOrderBy : ''

  const parsedItemsPerPage = destr(itemsPerPage)
  const parsedPage = destr(page)

  const itemsPerPageLocal = is.number(parsedItemsPerPage) ? parsedItemsPerPage : 10
  const pageLocal = is.number(parsedPage) ? parsedPage : 1

  const searchQuery = is.string(q) ? q : undefined
  const queryLower = (searchQuery ?? '').toString().toLowerCase()

  // Filtering Reviews

  const filteredReviews = db.reviews.filter(review => {
    const { product, reviewer, email } = review

    return (
      (product.toLowerCase().includes(queryLower) || reviewer.toLowerCase().includes(queryLower) || email.toLowerCase().includes(queryLower) || review.head.toLowerCase().includes(queryLower) || review.para.toLowerCase().includes(queryLower))
    )
  })

  // Sort
  if (sortByLocal) {
    if (sortByLocal === 'product') {
      filteredReviews.sort((a, b) => {
        if (orderByLocal === 'asc')
          return a.product.toLowerCase() > b.product.toLowerCase() ? 1 : -1
        else if (orderByLocal === 'desc')
          return a.product.toLowerCase() < b.product.toLowerCase() ? 1 : -1

        return 0
      })
    }

    if (sortByLocal === 'reviewer') {
      filteredReviews.sort((a, b) => {
        if (orderByLocal === 'asc')
          return a.reviewer.toLowerCase() > b.reviewer.toLowerCase() ? 1 : -1
        else if (orderByLocal === 'desc')
          return a.reviewer.toLowerCase() < b.reviewer.toLowerCase() ? 1 : -1

        return 0
      })
    }

    if (sortByLocal === 'date') {
      filteredReviews.sort((a, b) => {
        if (orderByLocal === 'desc')
          return Number(new Date(b.date)) - Number(new Date(a.date))
        else if (orderByLocal === 'asc')
          return Number(new Date(a.date)) - Number(new Date(b.date))

        return 0
      })
    }
  }

  if (sortByLocal === 'status') {
    filteredReviews.sort((a, b) => {
      if (orderByLocal === 'asc')
        return a.status.toLowerCase() > b.status.toLowerCase() ? 1 : -1
      else if (orderByLocal === 'desc')
        return a.status.toLowerCase() < b.status.toLowerCase() ? 1 : -1
      else
        return 0
    })
  }

  return { reviews: paginateArray(filteredReviews, itemsPerPageLocal, pageLocal), total: filteredReviews.length }
})
