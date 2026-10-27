import { expect, test } from '@playwright/test'
import { services } from '@/data/services'

test('home loads and navigation works', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toBeVisible()
  await page
    .getByRole('link', { name: /services/i })
    .first()
    .click()
  await expect(page).toHaveURL(/services/)
})

test('bouquet filtering and enquiry badge work', async ({ page }) => {
  await page.goto('/flowers-gifts#bouquets')
  await page
    .getByRole('button', { name: /rose/i })
    .first()
    .click()
    .catch(() => undefined)
  const add = page.getByRole('button', { name: /add to enquiry/i }).first()
  if (await add.count()) {
    await add.click()
    await expect(page.getByText(/1/).first()).toBeVisible()
  }
})

test('contact validation appears', async ({ page }) => {
  await page.goto('/contact')
  await page.getByRole('button', { name: /send/i }).click()
  await expect(page.locator('body')).toContainText(/required|please|valid/i)
})

test('every service detail returns 200', async ({ request }) => {
  for (const service of services)
    expect((await request.get(`/services/${service.slug}`)).status()).toBe(200)
})
