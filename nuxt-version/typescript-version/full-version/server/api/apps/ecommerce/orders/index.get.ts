import is from '@sindresorhus/is'
import { destr } from 'destr'
import { db } from '@/server/fake-db/apps/ecommerce'
import { paginateArray } from '@/server/utils/paginateArray'

export default defineEventHandler(event => {
  const { q = '', sortBy, orderBy, page = 1, itemsPerPage = 10 } = getQuery(event)

  const searchQuery = is.string(q) ? q : undefined
  const queryLower = (searchQuery ?? '').toString().toLowerCase()

  const parsedSortBy = destr(sortBy)
  const sortByLocal = is.string(parsedSortBy) ? parsedSortBy : ''

  const parsedOrderBy = destr(orderBy)
  const orderByLocal = is.string(parsedOrderBy) ? parsedOrderBy : ''

  const parsedItemsPerPage = destr(itemsPerPage)
  const parsedPage = destr(page)

  const itemsPerPageLocal = is.number(parsedItemsPerPage) ? parsedItemsPerPage : 10
  const pageLocal = is.number(parsedPage) ? parsedPage : 1

  const filterOrders = db.orderData.filter(order => {
    return (
      order.customer.toLowerCase().includes(queryLower)
      || order.email.toLowerCase().includes(queryLower)
      || order.order.toString().includes(queryLower)
    )
  }).reverse()

  if (sortByLocal) {
    if (sortByLocal === 'order') {
      filterOrders.sort((a, b) => {
        if (orderByLocal === 'desc')
          return b.order - a.order
        else
          return a.order - b.order
      })
    }
    if (sortByLocal === 'customers') {
      filterOrders.sort((a, b) => {
        if (orderByLocal === 'desc')
          return b.customer.localeCompare(a.customer)
        else
          return a.customer.localeCompare(b.customer)
      })
    }

    if (sortByLocal === 'date') {
      filterOrders.sort((a, b) => {
        if (orderByLocal === 'desc')
          return Number(new Date(b.date)) - Number(new Date(a.date))
        else
          return Number(new Date(a.date)) - Number(new Date(b.date))
      })
    }

    if (sortByLocal === 'status') {
      filterOrders.sort((a, b) => {
        if (orderByLocal === 'desc')
          return b.status.localeCompare(a.status)
        else
          return a.status.localeCompare(b.status)
      })
    }

    if (sortByLocal === 'spent') {
      filterOrders.sort((a, b) => {
        if (orderByLocal === 'desc')
          return Number(b.spent) - Number(a.spent)
        else
          return Number(a.spent) - Number(b.spent)
      })
    }
  }

  return { orders: paginateArray(filterOrders, itemsPerPageLocal, pageLocal), total: filterOrders.length }
})
