import { destr } from 'destr'
import { db } from '@/server/fake-db/apps/email'
import type { Email } from '@/server/fake-db/apps/email/types'

export default defineEventHandler(async event => {
  const { ids: emailIds, data: dataToUpdate, label } = await readBody(event)

  const labelLocal = destr(label)

  if (!labelLocal) {
    const emailIdsLocal = destr(emailIds) as unknown as Email['id'][]

    function updateMailData(email: Email) {
      Object.assign(email, dataToUpdate)
    }

    db.emails.forEach((email: Email) => {
      if (emailIdsLocal.includes(email.id))
        updateMailData(email)
    })

    setResponseStatus(event, 200)

    return null
  }
  else {
    function updateMailLabels(email: Email) {
      const labelIndex = email.labels.indexOf(label)

      if (labelIndex === -1)
        email.labels.push(label)
      else email.labels.splice(labelIndex, 1)
    }

    db.emails.forEach(email => {
      if (emailIds.includes(email.id))
        updateMailLabels(email)
    })
    setResponseStatus(event, 200)

    return null
  }
})
