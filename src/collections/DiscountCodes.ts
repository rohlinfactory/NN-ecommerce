import type { CollectionConfig } from 'payload'
import { adminOnly } from '@/access/adminOnly'

export const DiscountCodes: CollectionConfig = {
  slug: 'discount-codes',
  admin: {
    useAsTitle: 'code',
    group: 'Shop',
    defaultColumns: ['code', 'type', 'value', 'enabled', 'currentUses', 'validUntil'],
  },
  access: {
    create: adminOnly,
    read: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.code && typeof data.code === 'string') {
          data.code = data.code.trim().toUpperCase()
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'code',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'Unique code customers enter at checkout (stored uppercase).',
      },
    },
    {
      name: 'description',
      type: 'text',
      admin: {
        description: 'Internal description (not shown to customers).',
      },
    },
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Percentage (%)', value: 'percentage' },
        { label: 'Fixed amount (cents)', value: 'fixed_amount' },
      ],
      defaultValue: 'percentage',
    },
    {
      name: 'value',
      type: 'number',
      required: true,
      admin: {
        description: 'Percentage (e.g. 10 = 10%) or fixed amount in cents (e.g. 1000 = €10.00).',
      },
    },
    {
      name: 'minOrderAmountMinor',
      type: 'number',
      label: 'Minimum order amount (cents)',
      admin: {
        description: 'Minimum cart total in cents for this code to apply. Leave empty for no minimum.',
      },
    },
    {
      name: 'maxDiscountMinor',
      type: 'number',
      label: 'Maximum discount (cents)',
      admin: {
        description: 'Cap for percentage discounts in cents. Leave empty for no cap.',
      },
    },
    {
      name: 'maxUses',
      type: 'number',
      label: 'Total usage limit',
      admin: {
        description: 'Total times this code can be used. Leave empty for unlimited.',
      },
    },
    {
      name: 'currentUses',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
        description: 'Updated automatically when the code is redeemed.',
      },
    },
    {
      name: 'maxUsesPerCustomer',
      type: 'number',
      label: 'Per-customer limit',
      defaultValue: 1,
    },
    {
      name: 'validFrom',
      type: 'date',
      admin: {
        description: 'Leave empty if the code should be valid immediately.',
      },
    },
    {
      name: 'validUntil',
      type: 'date',
      admin: {
        description: 'Leave empty for no expiry.',
      },
    },
    {
      name: 'applicableCategories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        description:
          'Limit this discount to specific categories. Leave empty to apply to all products.',
      },
    },
  ],
}
