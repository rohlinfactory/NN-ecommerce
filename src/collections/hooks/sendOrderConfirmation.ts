import type { CollectionAfterChangeHook } from 'payload'
import { orderConfirmationEmail } from '@/emails/order-confirmation'
import { getServerSideURL } from '@/utilities/getURL'

export const sendOrderConfirmation: CollectionAfterChangeHook = async ({
  doc,
  operation,
  req,
}) => {
  if (operation !== 'create') return doc

  const email =
    doc.orderedBy?.email ||
    (typeof doc.orderedBy?.value === 'object' ? doc.orderedBy.value.email : null) ||
    doc.contactDetails?.email

  if (!email) return doc

  const baseUrl = getServerSideURL()
  const orderId = String(doc.id)
  const accessToken = doc.accessToken || ''

  const orderUrl = doc.orderedBy?.value
    ? `${baseUrl}/orders/${orderId}`
    : `${baseUrl}/orders/${orderId}?email=${encodeURIComponent(email)}&accessToken=${accessToken}`

  const items: Array<{ title: string; quantity: number; price: string }> = []
  if (Array.isArray(doc.items)) {
    for (const item of doc.items) {
      const product = typeof item.product === 'object' ? item.product : null
      items.push({
        title: product?.title || item.productTitle || 'Product',
        quantity: item.quantity || 1,
        price: `€${((item.priceInEUR || item.price || 0) / 100).toFixed(2)}`,
      })
    }
  }

  const totalCents = doc.totals?.grandTotal ?? doc.totals?.itemsTotal ?? 0
  const total = `€${(totalCents / 100).toFixed(2)}`

  const customerName =
    doc.contactDetails?.firstName ||
    (typeof doc.orderedBy?.value === 'object' ? doc.orderedBy.value.name : null) ||
    'there'

  try {
    await req.payload.sendEmail({
      to: email,
      subject: `Order confirmed — #${orderId}`,
      html: orderConfirmationEmail({
        orderId,
        customerName,
        orderUrl,
        items,
        total,
      }),
    })
  } catch (err) {
    req.payload.logger.error({ err, msg: 'Failed to send order confirmation email' })
  }

  return doc
}
