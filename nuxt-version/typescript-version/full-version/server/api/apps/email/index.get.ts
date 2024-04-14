import { destr } from 'destr'
import { db } from '@/server/fake-db/apps/email'
import type { Email, FetchEmailsPayload } from '@/server/fake-db/apps/email/types'

export default defineEventHandler(event => {
  const { q = '', filter = 'inbox', label } = destr(getQuery(event)) as FetchEmailsPayload

  const queryLowered = q.toLowerCase()

  function isInFolder(email: Email) {
    if (filter === 'trashed')
      return email.isDeleted
    if (filter === 'starred')
      return email.isStarred && !email.isDeleted

    return email.folder === (filter || email.folder) && !email.isDeleted
  }

  const filteredData = db.emails.filter(
    email =>
      (email.from.name.toLowerCase().includes(queryLowered) || email.subject.toLowerCase().includes(queryLowered))
            && isInFolder(email as Email)
            && (label ? email.labels.includes(label) : true),
  )

  // ------------------------------------------------
  // Email Meta
  // ------------------------------------------------
  const emailsMeta = {
    inbox: db.emails.filter(email => !email.isDeleted && !email.isRead && email.folder === 'inbox').length,
    draft: db.emails.filter(email => email.folder === 'draft').length,
    spam: db.emails.filter(email => !email.isDeleted && !email.isRead && email.folder === 'spam').length,
  }

  setResponseStatus(event, 200)

  return { emails: filteredData, emailsMeta }
})
