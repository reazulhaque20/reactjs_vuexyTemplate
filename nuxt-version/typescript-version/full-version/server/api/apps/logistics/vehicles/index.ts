import is from '@sindresorhus/is'
import { destr } from 'destr'
import { db } from '@/server/fake-db/apps/logistics'

export default defineEventHandler(event => {
  const { sortBy, page = 1, itemsPerPage = 10, orderBy } = getQuery(event)

  const parsedSortBy = destr(sortBy)
  const sortByLocal = is.string(parsedSortBy) ? parsedSortBy : ''

  const parsedOrderBy = destr(orderBy)
  const orderByLocal = is.string(parsedOrderBy) ? parsedOrderBy : ''

  const parsedItemsPerPage = destr(itemsPerPage)
  const parsedPage = destr(page)

  const itemsPerPageLocal = is.number(parsedItemsPerPage) ? parsedItemsPerPage : 10
  const pageLocal = is.number(parsedPage) ? parsedPage : 1

  // Sorting Vehicles

  if (sortByLocal && sortByLocal === 'location') {
    db.vehicles = db.vehicles.sort((a, b) => {
      if (orderByLocal === 'asc')
        return a.location - b.location

      return b.location - a.location
    })
  }

  if (sortByLocal && sortByLocal === 'startRoute') {
    db.vehicles = db.vehicles.sort((a, b) => {
      if (orderByLocal === 'asc')
        return a.startCity.localeCompare(b.startCity)

      return b.startCity.localeCompare(a.startCity)
    })
  }

  if (sortByLocal && sortByLocal === 'endRoute') {
    db.vehicles = db.vehicles.sort((a, b) => {
      if (orderByLocal === 'asc')
        return a.endCity.localeCompare(b.endCity)

      return b.endCity.localeCompare(a.endCity)
    })
  }

  if (sortByLocal && sortByLocal === 'warnings') {
    db.vehicles = db.vehicles.sort((a, b) => {
      if (orderByLocal === 'asc')
        return a.warnings.localeCompare(b.warnings)

      return b.warnings.localeCompare(a.warnings)
    })
  }

  if (sortByLocal && sortByLocal === 'progress') {
    db.vehicles = db.vehicles.sort((a, b) => {
      if (orderByLocal === 'asc')
        return a.progress - b.progress

      return b.progress - a.progress
    })
  }

  return { vehicles: paginateArray(db.vehicles, itemsPerPageLocal, pageLocal), totalVehicles: db.vehicles.length }
})
