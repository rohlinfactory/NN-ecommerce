'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const NewsletterSignup: React.FC<{ source?: string }> = ({ source = 'footer' }) => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')

    try {
      const res = await fetch('/api/newsletter-subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      })

      if (res.ok || res.status === 201) {
        setStatus('success')
        setMessage('Welcome to the tribe.')
        setEmail('')
      } else {
        const data = await res.json().catch(() => null)
        const isDuplicate = data?.errors?.some((e: any) =>
          e?.message?.toLowerCase().includes('unique'),
        )
        if (isDuplicate) {
          setStatus('success')
          setMessage("You're already on the list.")
        } else {
          setStatus('error')
          setMessage('Something went wrong. Try again.')
        }
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Try again.')
    }
  }

  return (
    <div className="w-full max-w-sm">
      <h3 className="text-sm font-semibold mb-2">Stay in the loop</h3>
      <p className="text-xs text-muted-foreground mb-3">
        New drops, surf stories, and community news.
      </p>
      {status === 'success' ? (
        <p className="text-sm text-foreground">{message}</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 h-9 text-sm"
          />
          <Button type="submit" size="sm" disabled={status === 'loading'} className="h-9">
            {status === 'loading' ? '...' : 'Join'}
          </Button>
        </form>
      )}
      {status === 'error' && <p className="text-xs text-destructive mt-1">{message}</p>}
    </div>
  )
}
