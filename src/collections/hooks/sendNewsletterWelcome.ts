import type { CollectionAfterChangeHook } from 'payload'
import { newsletterWelcomeEmail } from '@/emails/newsletter-welcome'
import { getServerSideURL } from '@/utilities/getURL'

export const sendNewsletterWelcome: CollectionAfterChangeHook = async ({
  doc,
  operation,
  req,
}) => {
  if (operation !== 'create') return doc

  const email = doc.email
  if (!email) return doc

  try {
    const shopUrl = `${getServerSideURL()}/shop`
    await req.payload.sendEmail({
      to: email,
      subject: 'Welcome to NakedNative',
      html: newsletterWelcomeEmail({ shopUrl }),
    })
  } catch (err) {
    req.payload.logger.error({ err, msg: 'Failed to send newsletter welcome email' })
  }

  return doc
}
