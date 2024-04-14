import { db } from '@/server/fake-db/apps/chat'
import type { ChatContact, ChatContactWithChat } from '@/server/fake-db/apps/chat/types'

export default defineEventHandler(async event => {
  const { q = '' }: { q?: string } = getQuery(event)

  const qLowered = q.toLowerCase()

  const chatsContacts: ChatContactWithChat[] = db.chats
    .map(chat => {
      const contact = JSON.parse(JSON.stringify((db.contacts.find(c => c.id === chat.userId) as ChatContact)))

      contact.chat = { id: chat.id, unseenMsgs: chat.unseenMsgs, lastMessage: chat.messages.at(-1) }

      return contact
    })
    .reverse()

  const profileUserData: ChatContact = db.profileUser

  return {
    chatsContacts: chatsContacts.filter(c => c.fullName.toLowerCase().includes(qLowered)),
    contacts: db.contacts.filter(c => c.fullName.toLowerCase().includes(qLowered)),
    profileUser: profileUserData,
  }
})
