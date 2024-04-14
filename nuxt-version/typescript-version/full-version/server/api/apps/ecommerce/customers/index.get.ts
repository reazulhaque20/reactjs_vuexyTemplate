import is from '@sindresorhus/is'
import { destr } from 'destr'
import { db } from '@/server/fake-db/apps/ecommerce'
import { paginateArray } from '@/server/utils/paginateArray'

export default defineEventHandler(event => {
  const { q = '', page = 1, itemsPerPage = 10, sortBy, orderBy } = getQuery(event)

  const parsedSortBy = destr(sortBy)
  const sortByLocal = is.string(parsedSortBy) ? parsedSortBy : ''

  const parsedOrderBy = destr(orderBy)
  const orderByLocal = is.string(parsedOrderBy) ? parsedOrderBy : ''

  const parsedItemsPerPage = destr(itemsPerPage)
  const parsedPage = destr(page)

  const itemsPerPageLocal = is.number(parsedItemsPerPage) ? parsedItemsPerPage : 10
  const pageLocal = is.number(parsedPage) ? parsedPage : 1

  const searchQuery = is.string(q) ? q : undefined
  const queryLowered = (searchQuery ?? '').toString().toLowerCase()

  const filteredCustomers = db.customerData.filter(customer => {
    return (
      customer.customer.toLowerCase().includes(queryLowered)
            || customer.country.toLowerCase().includes(queryLowered)
            || customer.email.toLowerCase().includes(queryLowered)
    )
  }).reverse()

  // Sort Customers
  if (sortByLocal) {
    if (sortByLocal === 'customer') {
      filteredCustomers.sort((a, b) => {
        if (orderByLocal === 'asc')
          return a.customer.localeCompare(b.customer)

        return b.customer.localeCompare(a.customer)
      })
    }
    if (sortByLocal === 'country') {
      filteredCustomers.sort((a, b) => {
        if (orderByLocal === 'asc')
          return a.country.localeCompare(b.country)

        return b.country.localeCompare(a.country)
      })
    }

    if (sortByLocal === 'customerId') {
      filteredCustomers.sort((a, b) => {
        if (orderByLocal === 'asc')
          return a.customerId - b.customerId

        return b.customerId - a.customerId
      })
    }

    if (sortByLocal === 'orders') {
      filteredCustomers.sort((a, b) => {
        if (orderByLocal === 'asc')
          return a.order - b.order

        return b.order - a.order
      })
    }

    if (sortByLocal === 'totalSpent') {
      filteredCustomers.sort((a, b) => {
        if (orderByLocal === 'asc')
          return a.totalSpent - b.totalSpent

        return b.totalSpent - a.totalSpent
      })
    }
  }

  return { customers: paginateArray(filteredCustomers, itemsPerPageLocal, pageLocal), total: filteredCustomers.length }
})
