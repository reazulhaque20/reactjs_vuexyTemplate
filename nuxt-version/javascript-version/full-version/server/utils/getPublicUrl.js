export const getPublicUrl = path => {
  const prefix = path.startsWith('/') ? '' : '/'

  return `http://localhost:3000${prefix}${path}`
}
