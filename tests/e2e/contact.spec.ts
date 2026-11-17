import { expect, test } from '@playwright/test'

test('empty contact submission announces validation errors', async ({
  page,
}) => {
  await page.goto('/contact')
  const form = page.locator('form')
  await expect(form.getByRole('alert')).toHaveCount(0)
  await page.getByRole('button', { name: /^submit$/i }).click()
  await expect(form.getByRole('alert')).toHaveCount(6)
})

test('valid contact enquiry opens a WhatsApp URL with submitted details', async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'open', {
      configurable: true,
      value: (url: string | URL) => {
        window.sessionStorage.setItem('contact-whatsapp-url', String(url))
        return null
      },
    })
  })
  await page.goto('/contact')
  await page.getByLabel('Name', { exact: true }).fill('Asha Thapa')
  await page.getByLabel('Phone', { exact: true }).fill('+977 9800000000')
  await page.getByLabel('Event type').selectOption({ label: 'Wedding' })
  await page.getByLabel('Event date').fill('2099-12-31')
  await page.getByLabel('Venue or location').fill('Pokhara')
  await page
    .getByLabel('Message', { exact: true })
    .fill('We are planning a garden wedding.')
  await page.getByRole('button', { name: /^submit$/i }).click()

  await expect(page.getByText('Opening WhatsApp...')).toBeVisible()
  const openedUrl = await page.evaluate(() =>
    window.sessionStorage.getItem('contact-whatsapp-url'),
  )
  if (!openedUrl) throw new Error('Expected WhatsApp to open from the enquiry.')
  expect(openedUrl).toContain('https://wa.me/')
  const message = new URL(openedUrl).searchParams.get('text')
  expect(message).toContain('Asha Thapa')
  expect(message).toContain('Wedding')
})

test('map iframe is titled and loads on viewport entry', async ({ page }) => {
  await page.goto('/contact')
  const mapFrame = page.getByTitle(
    'Bagaicha Flower Decor and Events location map',
  )
  await expect(page.getByTestId('map-placeholder')).toBeVisible()
  expect(await mapFrame.getAttribute('src')).toBeNull()
  await mapFrame.scrollIntoViewIfNeeded()
  await expect(mapFrame).toHaveAttribute('src', /google\.com\/maps/)
  await expect(mapFrame).toHaveAttribute('loading', 'lazy')
})

test('FAQ deep links open the selected question', async ({ page }) => {
  await page.goto('/contact#faq-advance-payment')
  const paymentQuestion = page.locator('#faq-advance-payment')
  await expect(paymentQuestion).toHaveJSProperty('open', true)
  await expect(paymentQuestion).toContainText('How do advance payments work?')
})

test('contact layout has no horizontal overflow at target widths', async ({
  page,
}) => {
  for (const width of [375, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/contact')
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true)
  }
})

test('contact page does not opt into scroll-reveal animations', async ({
  page,
}) => {
  await page.goto('/contact')
  await expect(page.locator('main [data-motion]')).toHaveCount(0)
  await expect(page.locator('main .motion-copy, main .reveal')).toHaveCount(0)
})

test('contact metadata and LocalBusiness schema use the contact details', async ({
  page,
}) => {
  await page.goto('/contact')
  await expect(page).toHaveTitle(
    'Contact | Bagaicha Flower Decor and Events, Pokhara',
  )
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    'Contact Bagaicha Flower Decor and Events in Pokhara for weddings, pasni, bratabandha and celebrations. Message us on WhatsApp for a quick reply.',
  )
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    /placeholder\.jpg/,
  )

  const jsonLd = await page
    .locator('script[type="application/ld+json"]')
    .textContent()
  if (!jsonLd) throw new Error('Expected the LocalBusiness JSON-LD script.')
  const business = JSON.parse(jsonLd)
  expect(business.telephone).toBe('+977 9869552940')
  expect(business.address.streetAddress).toBe('Pokhara, Gandaki Pradesh, Nepal')
  expect(business.openingHours).toBe('Su-Sa 07:00-19:00')
})
