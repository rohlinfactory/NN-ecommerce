import clsx from 'clsx'
import React from 'react'

export function LogoIcon(props: React.ComponentProps<'span'>) {
  return (
    <span
      aria-label="NakedNative"
      {...props}
      className={clsx(
        'text-lg font-bold tracking-tight text-black dark:text-white',
        props.className,
      )}
    >
      NN
    </span>
  )
}
