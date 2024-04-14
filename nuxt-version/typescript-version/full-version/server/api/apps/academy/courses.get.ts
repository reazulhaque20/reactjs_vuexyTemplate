import is from '@sindresorhus/is'
import { destr } from 'destr'
import { db } from '@/server/fake-db/apps/academy'
import { paginateArray } from '@/server/utils/paginateArray'

export default defineEventHandler(event => {
  const { q, hideCompleted, page = 1, itemsPerPage = 10, sortBy, orderBy, label = 'All Courses' } = getQuery(event)

  // console.log(sortBy, orderBy);
  const searchQuery = is.string(q) ? q : undefined
  const queryLowered = (searchQuery ?? '').toString().toLowerCase()

  const parsedHideCompleted = destr(hideCompleted)
  const hideCompletedLocal = is.boolean(parsedHideCompleted) ? parsedHideCompleted : false

  const parsedSortBy = destr(sortBy)
  const sortByLocal = is.string(parsedSortBy) ? parsedSortBy : ''

  const parsedOrderBy = destr(orderBy)
  const orderByLocal = is.string(parsedOrderBy) ? parsedOrderBy : ''

  const parsedItemsPerPage = destr(itemsPerPage)
  const parsedPage = destr(page)

  const itemsPerPageLocal = is.number(parsedItemsPerPage) ? parsedItemsPerPage : 10
  const pageLocal = is.number(parsedPage) ? parsedPage : 1

  const parsedLabel = destr(label)
  const labelLocal = is.string(parsedLabel) ? parsedLabel : 'All Courses'

  const filteredCourses = db.courses.filter(course => {
    return (
      (
        course.courseTitle.toLowerCase().includes(queryLowered)
                || course.user.toLowerCase().includes(queryLowered)
      )
            && !((course.completedTasks === course.totalTasks) && hideCompletedLocal)
            && (labelLocal !== 'All Courses' ? course.tags.toLocaleLowerCase() === labelLocal?.toLowerCase() : true)
    )
  })

  if (sortByLocal) {
    if (sortByLocal === 'courseName') {
      filteredCourses.sort((a, b) => {
        if (orderByLocal === 'asc')
          return a.courseTitle.localeCompare(b.courseTitle)
        else
          return b.courseTitle.localeCompare(a.courseTitle)
      })
    }
    if (sortByLocal === 'progress') {
      filteredCourses.sort((a, b) => {
        if (orderByLocal === 'asc')
          return (a.completedTasks / a.totalTasks) - (b.completedTasks / b.totalTasks)
        else
          return (b.completedTasks / b.totalTasks) - (a.completedTasks / a.totalTasks)
      })
    }
  }

  setResponseStatus(event, 200)

  return { courses: paginateArray(filteredCourses, itemsPerPageLocal, pageLocal), total: filteredCourses.length }
})
