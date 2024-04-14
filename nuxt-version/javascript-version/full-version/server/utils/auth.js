import { getServerSession } from '#auth'

export async function setAuthOnlyRoute(event, statusMessage = 'You must be signed in to access this API.') {
  const session = await getServerSession(event)
  if (!session) {
    throw createError({
      statusCode: 403,
      statusMessage,
    })
  }

  return session
}
