import { db } from '@/server/fake-db/apps/chat'

export default defineEventHandler(async event => {
  const userId = getIntId(event, 'User id is required to get chat messages')

  const chat = db.chats.find(c => c.userId === userId)

  if (chat)
    chat.unseenMsgs = 0

  return {
    chat,
    contact: db.contacts.find(c => c.id === userId),
  }
})
