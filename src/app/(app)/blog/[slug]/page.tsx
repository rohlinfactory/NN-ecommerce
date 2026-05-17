import type { Metadata } from 'next'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import React from 'react'
import { notFound } from 'next/navigation'
import { RichText } from '@/components/RichText'
import { Media } from '@/components/Media'
import { generateMeta } from '@/utilities/generateMeta'
import { format } from 'date-fns'

type Args = {
  params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    where: {
      slug: { equals: slug },
      _status: { equals: 'published' },
    },
    limit: 1,
  })

  const post = result.docs[0]

  if (!post) {
    notFound()
  }

  const author = typeof post.author === 'object' ? post.author : null

  return (
    <article className="container py-16">
      <header className="max-w-3xl mx-auto mb-12">
        {post.category && (
          <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            {post.category.replace('-', ' ')}
          </span>
        )}
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">{post.title}</h1>
        {post.excerpt && (
          <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>
        )}
        <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
          {author?.name && <span>{author.name}</span>}
          {post.publishedOn && (
            <time dateTime={post.publishedOn}>
              {format(new Date(post.publishedOn), 'MMMM d, yyyy')}
            </time>
          )}
        </div>
      </header>

      {post.featuredImage && typeof post.featuredImage === 'object' && (
        <div className="max-w-4xl mx-auto mb-12 overflow-hidden rounded-xl">
          <Media resource={post.featuredImage} imgClassName="w-full h-auto" />
        </div>
      )}

      <div className="max-w-3xl mx-auto prose dark:prose-invert">
        {post.content && <RichText data={post.content} enableGutter={false} />}
      </div>
    </article>
  )
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    limit: 100,
    select: { slug: true },
    where: { _status: { equals: 'published' } },
  })

  return posts.docs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const post = result.docs[0]

  return generateMeta({ doc: post as any })
}
