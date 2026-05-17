'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import { motion } from 'motion/react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

function extractText(richText: any): { heading: string; subtitle: string } {
  const heading =
    richText?.root?.children
      ?.find((n: any) => n.type === 'heading')
      ?.children?.map((c: any) => c.text)
      .join('') || ''
  const subtitle =
    richText?.root?.children
      ?.find((n: any) => n.type === 'paragraph')
      ?.children?.map((c: any) => c.text)
      .join('') || ''
  return { heading, subtitle }
}

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  const { heading, subtitle } = extractText(richText)
  const words = heading.split(/\s+/).filter(Boolean)

  return (
    <div
      className="relative -mt-14 flex items-end justify-center text-white overflow-hidden"
      data-theme="dark"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-[1]" />

      <div className="container pb-20 md:pb-28 z-10 relative flex items-center justify-center">
        <div className="max-w-2xl md:text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
            {words.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.25em]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + i * 0.15,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {subtitle && (
            <motion.p
              className="mt-5 text-base md:text-lg text-white/70 max-w-md mx-auto"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.3 + words.length * 0.15 + 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {subtitle}
            </motion.p>
          )}

          {Array.isArray(links) && links.length > 0 && (
            <motion.ul
              className="flex md:justify-center gap-4 mt-8"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.3 + words.length * 0.15 + 0.3,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {links.map(({ link }, i) => (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              ))}
            </motion.ul>
          )}
        </div>
      </div>

      <div className="min-h-[90vh] select-none">
        {media && typeof media === 'object' && (
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
          </motion.div>
        )}
      </div>
    </div>
  )
}
