export const getIntId = (event, msg404 = 'Id is required to get item details') => {
  const id = Number(event.context.params?.id)
  if (!id || !Number.isInteger(id)) {
    throw createError({
      statusCode: 404,
      statusMessage: msg404,
    })
  }

  return id
}
