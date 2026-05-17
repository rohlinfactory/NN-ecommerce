import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

export function LogoIcon({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span aria-label="NakedNative" className={clsx('inline-block', className)} {...props}>
      <Image
        src="/site-icon-NN.png"
        alt="NakedNative"
        width={48}
        height={34}
        className="h-auto w-full dark:invert"
      />
    </span>
  )
}
