import type { Metadata } from 'next'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import React from 'react'
import Link from 'next/link'
import { Media } from '@/components/Media'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Stories from the NakedNative community — surf, travel, and life outdoors.',
}

export default async function BlogPage() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    sort: '-publishedOn',
    limit: 20,
    where: {
      _status: { equals: 'published' },
    },
  })

  return (
    <div className="container py-16">
      <h1 className="text-4xl font-bold tracking-tight mb-4">Blog</h1>
      <p className="text-muted-foreground text-lg mb-12 max-w-2xl">
        Stories from the NakedNative community — surf, travel, and life outdoors.
      </p>

      {posts.docs.length === 0 ? (
        <p className="text-muted-foreground">No posts yet. Check back soon.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.docs.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group block overflow-hidden rounded-xl border border-border/50 transition-all hover:border-border hover:shadow-sm"
            >
              {post.featuredImage && typeof post.featuredImage === 'object' && (
                <div className="aspect-[3/2] overflow-hidden">
                  <Media
                    resource={post.featuredImage}
                    imgClassName="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-5">
                {post.category && (
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {post.category.replace('-', ' ')}
                  </span>
                )}
                <h2 className="mt-1 text-lg font-semibold tracking-tight group-hover:underline">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
