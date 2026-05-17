import { test, expect } from '@playwright/test'

test.describe('Smoke tests', () => {
  test('homepage loads', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/NakedNative/)
  })

  test('shop page loads and shows heading', async ({ page }) => {
    await page.goto('/shop')
    await expect(page.getByRole('heading', { name: 'Shop' })).toBeVisible()
  })

  test('blog page loads and shows heading', async ({ page }) => {
    await page.goto('/blog')
    await expect(page.getByRole('heading', { name: 'Blog' })).toBeVisible()
  })

  test('login page loads', async ({ page }) => {
    await page.goto('/login')
    await expect(page.getByRole('heading', { name: 'Log in' })).toBeVisible()
  })

  test('create account page loads', async ({ page }) => {
    await page.goto('/create-account')
    await expect(page.getByRole('heading', { name: 'Create Account' })).toBeVisible()
  })

  test('admin panel loads', async ({ page }) => {
    await page.goto('/admin')
    await page.waitForLoadState('networkidle')
    await expect(page).toHaveURL(/\/admin/)
  })
})

test.describe('Navigation', () => {
  test('header is visible and contains logo', async ({ page }) => {
    await page.goto('/')
    const header = page.locator('header')
    await expect(header).toBeVisible()
    await expect(header.getByRole('link', { name: 'NakedNative' })).toBeVisible()
  })

  test('footer is visible with newsletter signup', async ({ page }) => {
    await page.goto('/')
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
    await expect(footer.getByText('Stay in the loop')).toBeVisible()
  })
})

test.describe('Newsletter signup', () => {
  test('newsletter form is visible in footer', async ({ page }) => {
    await page.goto('/')
    const footer = page.locator('footer')
    await expect(footer.getByPlaceholder('your@email.com')).toBeVisible()
    await expect(footer.getByRole('button', { name: 'Join' })).toBeVisible()
  })
})
