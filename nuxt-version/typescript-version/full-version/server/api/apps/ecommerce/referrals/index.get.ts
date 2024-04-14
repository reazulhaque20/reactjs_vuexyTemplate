import is from '@sindresorhus/is'
import { destr } from 'destr'
import { db } from '@/server/fake-db/apps/ecommerce'
import { paginateArray } from '@/server/utils/paginateArray'

export default defineEventHandler(event => {
  const { sortBy, itemsPerPage = 10, page = 1, orderBy } = getQuery(event)

  const parsedSortBy = destr(sortBy)
  const sortByLocal = is.string(parsedSortBy) ? parsedSortBy : ''

  const parsedOrderBy = destr(orderBy)
  const orderByLocal = is.string(parsedOrderBy) ? parsedOrderBy : ''

  const parsedItemsPerPage = destr(itemsPerPage)
  const parsedPage = destr(page)

  const itemsPerPageLocal = is.number(parsedItemsPerPage) ? parsedItemsPerPage : 10
  const pageLocal = is.number(parsedPage) ? parsedPage : 1

  const filteredReferrals = db.referrals
  if (sortByLocal) {
    if (sortByLocal === 'users') {
      filteredReferrals.sort((a, b) => {
        if (orderByLocal === 'asc')
          return a.user.toLowerCase() > b.user.toLowerCase() ? 1 : -1
        else if (orderByLocal === 'desc')
          return a.user.toLowerCase() < b.user.toLowerCase() ? 1 : -1

        return 0
      })
    }

    if (sortByLocal === 'referred-id') {
      filteredReferrals.sort((a, b) => {
        if (orderByLocal === 'asc')
          return a.referredId - b.referredId
        else if (orderByLocal === 'desc')
          return b.referredId - a.referredId

        return 0
      })
    }

    if (sortByLocal === 'earning') {
      filteredReferrals.sort((a, b) => {
        if (orderByLocal === 'asc')
          return Number(a.earning.slice(1)) - Number(b.earning.slice(1))
        else if (orderByLocal === 'desc')
          return Number(b.earning.slice(1)) - Number(a.earning.slice(1))

        return 0
      })
    }
  }

  return { referrals: paginateArray(filteredReferrals, itemsPerPageLocal, pageLocal), total: filteredReferrals.length }
})
