import is from '@sindresorhus/is'
import { destr } from 'destr'
import { db } from '@/server/fake-db/apps/ecommerce'
import { paginateArray } from '@/server/utils/paginateArray'

export default defineEventHandler(event => {
  const { q = '', stock = null, category = null, status = null, sortBy, orderBy, itemsPerPage = 10, page = 1 } = getQuery(event)

  const searchQuery = is.string(q) ? q : undefined
  const queryLower = (searchQuery ?? '').toString().toLowerCase()

  const parsedStock = destr(stock)
  const stockLocal = is.boolean(parsedStock) ? parsedStock : undefined

  const parsedSortBy = destr(sortBy)
  const sortByLocal = is.string(parsedSortBy) ? parsedSortBy : ''

  const parsedOrderBy = destr(orderBy)
  const orderByLocal = is.string(parsedOrderBy) ? parsedOrderBy : ''

  const parsedItemsPerPage = destr(itemsPerPage)
  const parsedPage = destr(page)

  const itemsPerPageLocal = is.number(parsedItemsPerPage) ? parsedItemsPerPage : 10
  const pageLocal = is.number(parsedPage) ? parsedPage : 1

  // Filtering Products
  let filteredProducts = db.products.filter(product => (
    (product.productName.toLowerCase().includes(queryLower) || product.productBrand.toLowerCase().includes(queryLower))
      && product.category === (category || product.category)
      && (product.status === (status || product.status))
      && (typeof stockLocal === 'undefined' ? true : (product.stock === stockLocal))
  )).reverse()

  // Sort
  if (sortByLocal) {
    if (sortByLocal === 'product') {
      filteredProducts = filteredProducts.sort((a, b) => {
        if (orderByLocal === 'asc')
          return a.productName.toLowerCase() > b.productName.toLowerCase() ? 1 : -1
        else if (orderByLocal === 'desc')
          return a.productName.toLowerCase() < b.productName.toLowerCase() ? 1 : -1

        return 0
      })
    }

    if (sortByLocal === 'category') {
      filteredProducts = filteredProducts.sort((a, b) => {
        if (orderByLocal === 'asc')
          return a.category > b.category ? 1 : -1
        else if (orderByLocal === 'desc')
          return a.category < b.category ? 1 : -1

        return 0
      })
    }

    if (sortByLocal === 'status') {
      filteredProducts = filteredProducts.sort((a, b) => {
        if (orderByLocal === 'asc')
          return a.status > b.status ? 1 : -1
        else if (orderByLocal === 'desc')
          return a.status < b.status ? 1 : -1

        return 0
      })
    }

    if (sortByLocal === 'price') {
      filteredProducts = filteredProducts.sort((a, b) => {
        if (orderByLocal === 'asc')
          return Number(a.price.slice(1)) > Number(b.price.slice(1)) ? 1 : -1
        else if (orderByLocal === 'desc')
          return Number(a.price.slice(1)) < Number(b.price.slice(1)) ? 1 : -1

        return 0
      })
    }

    if (sortByLocal === 'qty') {
      filteredProducts = filteredProducts.sort((a, b) => {
        if (orderByLocal === 'asc')
          return a.qty > b.qty ? 1 : -1
        else if (orderByLocal === 'desc')
          return a.qty < b.qty ? 1 : -1

        return 0
      })
    }

    if (sortByLocal === 'sku') {
      filteredProducts = filteredProducts.sort((a, b) => {
        if (orderByLocal === 'asc')
          return a.sku > b.sku ? 1 : -1
        else if (orderByLocal === 'desc')
          return a.sku < b.sku ? 1 : -1

        return 0
      })
    }
  }

  return { products: paginateArray(filteredProducts, itemsPerPageLocal, pageLocal), total: filteredProducts.length }
})
