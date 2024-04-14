import is from '@sindresorhus/is'
import { destr } from 'destr'
import { database } from '@/server/fake-db/apps/invoice'

export default defineEventHandler(event => {
  const { q, status, selectedDateRange, sortBy = '', page = 1, itemsPerPage = 10, orderBy } = getQuery(event)
  const searchQuery = is.string(q) ? q : undefined
  const queryLowered = (searchQuery ?? '').toString().toLowerCase()

  const parsedSortBy = destr(sortBy)
  const sortByLocal = is.string(parsedSortBy) ? parsedSortBy : ''

  const parsedOrderBy = destr(orderBy)
  const orderByLocal = is.string(parsedOrderBy) ? parsedOrderBy : ''

  const parsedItemsPerPage = destr(itemsPerPage)
  const parsedPage = destr(page)

  const itemsPerPageLocal = is.number(parsedItemsPerPage) ? parsedItemsPerPage : 10
  const pageLocal = is.number(parsedPage) ? parsedPage : 1

  const parsedDateRange = destr(selectedDateRange) as unknown as { start?: string; end?: string }
  const startDateLocal = parsedDateRange?.start
  const endDateLocal = parsedDateRange?.end

  // Filtering invoices
  let filteredInvoices = database.filter(
    invoice => (
      (
        invoice.client.name.toLowerCase().includes(queryLowered)
        || invoice.client.companyEmail.toLowerCase().includes(queryLowered) || invoice.id.toString().includes(queryLowered)
      )
      && invoice.invoiceStatus === (status || invoice.invoiceStatus)
    ),
  ).reverse()

  // Sorting invoices
  if (sortByLocal) {
    if (sortByLocal === 'client') {
      filteredInvoices = filteredInvoices.sort((a, b) => {
        if (orderByLocal === 'asc')
          return a.client.name.localeCompare(b.client.name)

        return b.client.name.localeCompare(a.client.name)
      })
    }
    else if (sortByLocal === 'total') {
      filteredInvoices = filteredInvoices.sort((a, b) => {
        if (orderByLocal === 'asc')
          return a.total - b.total

        return b.total - a.total
      })
    }
    else if (sortByLocal === 'id') {
      filteredInvoices = filteredInvoices.sort((a, b) => {
        if (orderByLocal === 'asc')
          return a.id - b.id

        return b.id - a.id
      })
    }
    else if (sortByLocal === 'date') {
      filteredInvoices = filteredInvoices.sort((a, b) => {
        if (orderByLocal === 'asc')
          return new Date(a.issuedDate).getTime() - new Date(b.issuedDate).getTime()

        return new Date(b.issuedDate).getTime() - new Date(a.issuedDate).getTime()
      })
    }
    else if (sortByLocal === 'balance') {
      filteredInvoices = filteredInvoices.sort((a, b) => {
        if (orderByLocal === 'asc')
          return a.balance - b.balance

        return b.balance - a.balance
      })
    }
  }

  // filtering invoices by date
  if (startDateLocal && endDateLocal) {
    filteredInvoices = filteredInvoices.filter(invoiceObj => {
      const start = new Date(startDateLocal).getTime()
      const end = new Date(endDateLocal).getTime()
      const issuedDate = new Date(invoiceObj.issuedDate).getTime()

      return issuedDate >= start && issuedDate <= end
    })
  }

  const totalInvoices = filteredInvoices.length

  return { invoices: paginateArray(filteredInvoices, itemsPerPageLocal, pageLocal), totalInvoices, page: pageLocal > Math.ceil(totalInvoices / itemsPerPageLocal) ? 1 : page }
})
