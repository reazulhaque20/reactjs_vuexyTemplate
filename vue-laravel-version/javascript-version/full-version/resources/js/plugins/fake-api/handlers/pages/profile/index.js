import { rest } from 'msw'
import { db } from '@db/pages/profile/db'

export const handlerPagesProfile = [
  // GET /pages/profile
  rest.get(('/api/pages/profile'), (req, res, ctx) => {
    const tab = req.url.searchParams.get('tab') || ''
    
    return res(ctx.status(200), ctx.json(db.data[tab]))
  }),

  // GET /pages/profile/header
  rest.get(('/api/pages/profile/header'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(db.data.profileHeader))
  }),
]
