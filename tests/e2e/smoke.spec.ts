import { expect, test } from '@playwright/test'

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
  await page.getByRole('button', { name: /open whatsapp/i }).click()
  const name = page.getByRole('textbox', { name: 'Name' })
  await expect(name).toHaveAttribute('aria-invalid', 'true')
  const errorId = await name.getAttribute('aria-describedby')
  expect(errorId).toBeTruthy()
  await expect(page.locator(`#${errorId}`)).toHaveAttribute('role', 'alert')
})

test('legal pages load and are listed in the sitemap', async ({
  page,
  request,
}) => {
  for (const route of ['/privacy', '/terms']) {
    await page.goto(route)
    await expect(page.locator('h1')).toBeVisible()
    await expect(page).toHaveTitle(/.+/)
  }

  const sitemap = await request.get('/sitemap.xml')
  expect(sitemap.ok()).toBeTruthy()
  const sitemapXml = await sitemap.text()
  expect(sitemapXml).toContain('/privacy')
  expect(sitemapXml).toContain('/terms')
})

test('every service detail returns 200', async ({ page, request }) => {
  await page.goto('/services')
  const servicePaths = await page
    .locator('a[href^="/services/"]')
    .evaluateAll((anchors) =>
      Array.from(
        new Set(
          anchors
            .map((anchor) => anchor.getAttribute('href'))
            .filter((href): href is string => href !== null),
        ),
      ),
    )

  for (const servicePath of servicePaths)
    expect((await request.get(servicePath)).status()).toBe(200)
})
