import { destr } from 'destr'
import { rest } from 'msw'
import { db } from '@db/apps/email/db'

export const handlerAppsEmail = [
  // 👉 Get Email List
  rest.get(('/api/apps/email'), (req, res, ctx) => {
    const q = req.url.searchParams.get('q') || ''
    const filter = req.url.searchParams.get('filter') || 'inbox'
    const label = req.url.searchParams.get('label') || ''
    const queryLowered = q.toLowerCase()
    function isInFolder(email) {
      if (filter === 'trashed')
        return email.isDeleted
      if (filter === 'starred')
        return email.isStarred && !email.isDeleted
      
      return email.folder === (filter || email.folder) && !email.isDeleted
    }

    const filteredData = db.emails.filter(email => (email.from.name.toLowerCase().includes(queryLowered) || email.subject.toLowerCase().includes(queryLowered))
            && isInFolder(email)
            && (label ? email.labels.includes(label) : true))


    // ------------------------------------------------
    // Email Meta
    // ------------------------------------------------
    const emailsMeta = {
      inbox: db.emails.filter(email => !email.isDeleted && !email.isRead && email.folder === 'inbox').length,
      draft: db.emails.filter(email => email.folder === 'draft').length,
      spam: db.emails.filter(email => !email.isDeleted && !email.isRead && email.folder === 'spam').length,
    }

    return res(ctx.status(200), ctx.json({ emails: filteredData, emailsMeta }))
  }),

  // 👉 Update Email Meta
  rest.post(('/api/apps/email'), async (req, res, ctx) => {
    const { ids, data, label } = await req.json()
    const labelLocal = destr(label)
    if (!labelLocal) {
      const emailIdsLocal = destr(ids)
      function updateMailData(email) {
        Object.assign(email, data)
      }
      db.emails.forEach(email => {
        if (emailIdsLocal.includes(email.id))
          updateMailData(email)
      })
      
      return res(ctx.status(200))
    }
    else {
      function updateMailLabels(email) {
        const labelIndex = email.labels.indexOf(label)
        if (labelIndex === -1)
          email.labels.push(label)
        else
          email.labels.splice(labelIndex, 1)
      }
      db.emails.forEach(email => {
        if (Array.isArray(ids) ? ids.includes(email.id) : ids === email.id)
          updateMailLabels(email)
      })
      
      return res(ctx.status(200))
    }
  }),
]
