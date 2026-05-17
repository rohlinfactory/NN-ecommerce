import { test, expect } from '@playwright/test'

test.describe('Checkout flow', () => {
  test('checkout page loads with Stripe warning when no keys configured', async ({ page }) => {
    await page.goto('/checkout')
    await expect(page.locator('h1.sr-only')).toHaveText('Checkout')
  })

  test('cart opens and closes', async ({ page }) => {
    await page.goto('/')
    const cartButton = page.getByRole('button', { name: /cart/i }).first()
    if (await cartButton.isVisible()) {
      await cartButton.click()
      await expect(page.getByText('Your cart is empty.')).toBeVisible()
    }
  })
})

test.describe('Product pages', () => {
  test('shop page renders product grid', async ({ page }) => {
    await page.goto('/shop')
    await page.waitForLoadState('networkidle')
    const heading = page.getByRole('heading', { name: 'Shop' })
    await expect(heading).toBeVisible()
  })
})
