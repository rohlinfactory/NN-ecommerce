import type { CollectionConfig } from 'payload'
import { adminOnly } from '@/access/adminOnly'

export const NewsletterSubscribers: CollectionConfig = {
  slug: 'newsletter-subscribers',
  admin: {
    useAsTitle: 'email',
    group: 'Shop',
    defaultColumns: ['email', 'source', 'createdAt'],
  },
  access: {
    create: () => true,
    read: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'source',
      type: 'select',
      options: [
        { label: 'Footer', value: 'footer' },
        { label: 'Checkout', value: 'checkout' },
        { label: 'Popup', value: 'popup' },
      ],
      defaultValue: 'footer',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
