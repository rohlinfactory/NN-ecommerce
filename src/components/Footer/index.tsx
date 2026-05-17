import type { Footer } from '@/payload-types'

import { FooterMenu } from '@/components/Footer/menu'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React, { Suspense } from 'react'
import { LogoIcon } from '@/components/icons/logo'

const { COMPANY_NAME, SITE_NAME } = process.env

export async function Footer() {
  const footer: Footer = await getCachedGlobal('footer', 1)()
  const menu = footer.navItems || []
  const currentYear = new Date().getFullYear()
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '')

  const copyrightName = COMPANY_NAME || SITE_NAME || ''

  return (
    <footer className="text-sm text-muted-foreground border-t">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="flex flex-col gap-4">
            <Link className="flex items-center text-foreground" href="/">
              <LogoIcon className="w-10" />
            </Link>
            <p className="text-xs leading-relaxed max-w-xs">
              Ponchos, surf gear, and clothing for those who live free.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground">
              Navigate
            </h4>
            <Suspense fallback={null}>
              <FooterMenu menu={menu} />
            </Suspense>
          </div>

          <div className="flex flex-col gap-4">
            <NewsletterSignup />
          </div>
        </div>
      </div>
      <div className="border-t py-5">
        <div className="container flex flex-col items-center justify-between gap-2 md:flex-row">
          <p className="text-xs">
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith('.') ? '.' : ''} All rights reserved.
          </p>
          <ThemeSelector />
        </div>
      </div>
    </footer>
  )
}
