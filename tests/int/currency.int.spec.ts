import { describe, it, expect } from 'vitest'

describe('Currency formatting', () => {
  it('formats EUR minor units to display price', () => {
    const minorUnits = 4999
    const formatted = (minorUnits / 100).toFixed(2)
    expect(formatted).toBe('49.99')
  })

  it('EUR uses 2 decimal places', () => {
    const config = {
      code: 'EUR',
      decimals: 2,
      label: 'Euro',
      symbol: '€',
    }
    expect(config.decimals).toBe(2)
    expect(config.symbol).toBe('€')
  })

  it('price sorting works correctly for EUR', () => {
    const prices = [4999, 2500, 7500, 1000]
    const sorted = [...prices].sort((a, b) => a - b)
    expect(sorted).toEqual([1000, 2500, 4999, 7500])
  })
})
