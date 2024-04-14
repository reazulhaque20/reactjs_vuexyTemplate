import { db } from '@/server/fake-db/apps/chat'
import type { Chat, ChatMessage } from '@/server/fake-db/apps/chat/types'

export default defineEventHandler(async event => {
  // Get user id from URL
  const chatId = getIntId(event, 'Chat id is required to send message')

  // Get message from post data
  const { message, senderId } = await readBody(event)

  let activeChat = db.chats.find(chat => chat.userId === chatId)

  const newMessageData: ChatMessage = {
    message,
    time: String(new Date()),
    senderId,
    feedback: {
      isSent: true,
      isDelivered: false,
      isSeen: false,
    },
  }

  // If there's new chat for user create one
  let isNewChat = false
  if (activeChat === undefined) {
    isNewChat = true

    db.chats.push({
      id: db.chats.length + 1,
      userId: chatId,
      unseenMsgs: 0,
      messages: [newMessageData],
    })
    activeChat = db.chats.at(-1)
  }
  else {
    activeChat.messages.push(newMessageData)
  }

  const response: { msg: ChatMessage; chat?: Chat } = { msg: newMessageData }

  if (isNewChat)
    response.chat = activeChat

  setResponseStatus(event, 201)

  return response
})
