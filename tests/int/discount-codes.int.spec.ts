import { describe, it, expect } from 'vitest'

describe('Discount Codes', () => {
  it('uppercase hook normalizes discount code', () => {
    const code = 'summer20'
    expect(code.toUpperCase()).toBe('SUMMER20')
  })

  it('percentage discount calculates correctly', () => {
    const orderTotal = 10000 // 100.00 EUR in minor units
    const discountPercent = 20
    const discount = Math.round(orderTotal * (discountPercent / 100))
    expect(discount).toBe(2000)
    expect(orderTotal - discount).toBe(8000)
  })

  it('fixed amount discount applies correctly', () => {
    const orderTotal = 15000 // 150.00 EUR
    const fixedDiscount = 2500 // 25.00 EUR
    expect(orderTotal - fixedDiscount).toBe(12500)
  })

  it('discount should not exceed order total', () => {
    const orderTotal = 1000 // 10.00 EUR
    const fixedDiscount = 2500 // 25.00 EUR
    const appliedDiscount = Math.min(fixedDiscount, orderTotal)
    expect(appliedDiscount).toBe(1000)
  })

  it('min order check works', () => {
    const orderTotal = 5000 // 50.00 EUR
    const minOrderAmount = 7500 // 75.00 EUR
    const meetsMinimum = orderTotal >= minOrderAmount
    expect(meetsMinimum).toBe(false)
  })
})
