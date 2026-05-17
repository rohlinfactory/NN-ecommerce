'use client'
import { CMSLink } from '@/components/Link'
import { Cart } from '@/components/Cart'
import { OpenCartButton } from '@/components/Cart/OpenCart'
import Link from 'next/link'
import React, { Suspense } from 'react'

import { MobileMenu } from './MobileMenu'
import type { Header } from 'src/payload-types'

import { LogoIcon } from '@/components/icons/logo'
import { usePathname } from 'next/navigation'
import { cn } from '@/utilities/cn'

type Props = {
  header: Header
}

export function HeaderClient({ header }: Props) {
  const menu = header.navItems || []
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md">
      <nav className="container grid grid-cols-[auto_1fr_auto] items-center h-14 gap-6">
        <Link className="flex items-center" href="/">
          <LogoIcon className="w-10 h-auto" />
        </Link>

        <div className="hidden md:flex items-center justify-center">
          {menu.length ? (
            <ul className="flex gap-6 text-xs font-medium uppercase tracking-widest">
              {menu.map((item) => (
                <li key={item.id}>
                  <CMSLink
                    {...item.link}
                    size={'clear'}
                    className={cn('relative navLink', {
                      active:
                        item.link.url && item.link.url !== '/'
                          ? pathname.includes(item.link.url)
                          : false,
                    })}
                    appearance="nav"
                  />
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="flex items-center justify-end gap-4">
          <div className="block md:hidden">
            <Suspense fallback={null}>
              <MobileMenu menu={menu} />
            </Suspense>
          </div>
          <Suspense fallback={<OpenCartButton />}>
            <Cart />
          </Suspense>
        </div>
      </nav>
    </header>
  )
}
