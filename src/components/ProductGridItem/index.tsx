import type { Product, Variant } from '@/payload-types'

import Link from 'next/link'
import React from 'react'
import clsx from 'clsx'
import { Media } from '@/components/Media'
import { Price } from '@/components/Price'

type Props = {
  product: Partial<Product>
}

export const ProductGridItem: React.FC<Props> = ({ product }) => {
  const { gallery, priceInEUR, title } = product

  let price = priceInEUR

  const variants = product.variants?.docs

  if (variants && variants.length > 0) {
    const variant = variants[0]
    if (
      variant &&
      typeof variant === 'object' &&
      variant?.priceInEUR &&
      typeof variant.priceInEUR === 'number'
    ) {
      price = variant.priceInEUR
    }
  }

  const image =
    gallery?.[0]?.image && typeof gallery[0]?.image !== 'string' ? gallery[0]?.image : false

  return (
    <Link className="relative inline-block h-full w-full group" href={`/products/${product.slug}`}>
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
        {image ? (
          <Media
            className="relative h-full w-full"
            height={480}
            imgClassName={clsx('h-full w-full object-cover', {
              'transition duration-500 ease-out group-hover:scale-[1.03]': true,
            })}
            resource={image}
            width={360}
          />
        ) : (
          <div className="h-full w-full bg-muted" />
        )}
      </div>

      <div className="mt-3">
        <span className="text-sm font-medium text-foreground">{title}</span>
        {typeof price === 'number' && (
          <Price amount={price} className="block text-sm text-muted-foreground mt-0.5" />
        )}
      </div>
    </Link>
  )
}
