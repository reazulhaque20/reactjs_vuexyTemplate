import { database } from '@/server/fake-db/apps/invoice'

export default defineEventHandler(event => {
  // Get event id from URL
  const invoiceId = getIntId(event, 'User id is required to get user details')

  // Convert Id to number
  const id = Number(invoiceId)

  const invoice = database.find(e => e.id === id)

  if (!invoice) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Invoice not found',
    })
  }

  return {
    invoice,
    paymentDetails: {
      totalDue: '$12,110.55',
      bankName: 'American Bank',
      country: 'United States',
      iban: 'ETD95476213874685',
      swiftCode: 'BR91905',
    },
  }
})
