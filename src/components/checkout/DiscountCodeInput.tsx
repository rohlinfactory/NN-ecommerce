'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X } from 'lucide-react'

export type AppliedDiscount = {
  id: number | string
  code: string
  type: 'percentage' | 'fixed_amount'
  value: number
  discountAmount: number
  label: string
}

type Props = {
  cartTotal: number
  onApply: (discount: AppliedDiscount) => void
  onRemove: () => void
  appliedDiscount: AppliedDiscount | null
}

export const DiscountCodeInput: React.FC<Props> = ({
  cartTotal,
  onApply,
  onRemove,
  appliedDiscount,
}) => {
  const [code, setCode] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleApply = async () => {
    if (!code.trim()) return
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/discount/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.trim(), cartTotal }),
      })
      const data = await res.json()

      if (data.valid && data.discount) {
        onApply(data.discount)
        setStatus('idle')
      } else {
        setStatus('error')
        setErrorMsg(data.error || 'Invalid code')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Something went wrong')
    }
  }

  if (appliedDiscount) {
    return (
      <div className="flex items-center justify-between gap-2 bg-accent/50 p-3 text-sm">
        <div>
          <span className="font-mono font-medium">{appliedDiscount.code}</span>
          <span className="text-muted-foreground ml-2">{appliedDiscount.label}</span>
        </div>
        <button
          onClick={onRemove}
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Remove discount"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Discount code"
          value={code}
          onChange={(e) => {
            setCode(e.target.value)
            if (status === 'error') setStatus('idle')
          }}
          onKeyDown={(e) => e.key === 'Enter' && handleApply()}
          className="flex-1 h-9 text-sm uppercase"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleApply}
          disabled={status === 'loading' || !code.trim()}
          className="h-9"
        >
          {status === 'loading' ? '...' : 'Apply'}
        </Button>
      </div>
      {status === 'error' && <p className="text-xs text-destructive mt-1">{errorMsg}</p>}
    </div>
  )
}
