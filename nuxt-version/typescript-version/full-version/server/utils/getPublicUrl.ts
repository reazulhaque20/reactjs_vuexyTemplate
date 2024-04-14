export const getPublicUrl = (path: string) => {
  const prefix = path.startsWith('/') ? '' : '/'

  return `http://localhost:3000${prefix}${path}`
}
