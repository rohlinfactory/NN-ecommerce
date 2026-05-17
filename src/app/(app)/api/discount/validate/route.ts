import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { code, cartTotal } = await req.json()

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ valid: false, error: 'No code provided' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'discount-codes',
      where: {
        code: { equals: code.trim().toUpperCase() },
      },
      limit: 1,
      overrideAccess: true,
    })

    if (!result.docs.length) {
      return NextResponse.json({ valid: false, error: 'Invalid discount code' })
    }

    const discount = result.docs[0]

    if (!discount.enabled) {
      return NextResponse.json({ valid: false, error: 'This code is no longer active' })
    }

    const now = new Date()
    if (discount.validFrom && new Date(discount.validFrom) > now) {
      return NextResponse.json({ valid: false, error: 'This code is not yet active' })
    }
    if (discount.validUntil && new Date(discount.validUntil) < now) {
      return NextResponse.json({ valid: false, error: 'This code has expired' })
    }

    if (discount.maxUses && (discount.currentUses ?? 0) >= discount.maxUses) {
      return NextResponse.json({ valid: false, error: 'This code has reached its usage limit' })
    }

    if (
      discount.minOrderAmountMinor &&
      typeof cartTotal === 'number' &&
      cartTotal < discount.minOrderAmountMinor
    ) {
      const min = (discount.minOrderAmountMinor / 100).toFixed(2)
      return NextResponse.json({
        valid: false,
        error: `Minimum order of €${min} required`,
      })
    }

    let discountAmount = 0
    if (typeof cartTotal === 'number' && cartTotal > 0) {
      if (discount.type === 'percentage') {
        discountAmount = Math.round(cartTotal * (discount.value / 100))
        if (discount.maxDiscountMinor && discountAmount > discount.maxDiscountMinor) {
          discountAmount = discount.maxDiscountMinor
        }
      } else {
        discountAmount = Math.min(discount.value, cartTotal)
      }
    }

    return NextResponse.json({
      valid: true,
      discount: {
        id: discount.id,
        code: discount.code,
        type: discount.type,
        value: discount.value,
        discountAmount,
        label:
          discount.type === 'percentage' ? `${discount.value}% off` : `€${(discount.value / 100).toFixed(2)} off`,
      },
    })
  } catch {
    return NextResponse.json({ valid: false, error: 'Something went wrong' }, { status: 500 })
  }
}
