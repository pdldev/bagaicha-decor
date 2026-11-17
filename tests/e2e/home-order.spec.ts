import { expect, test } from '@playwright/test'

test('home product order opens the flower and gifts enquiry form', async ({
  page,
}) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Order', exact: true }).first().click()

  const form = page.getByRole('dialog')
  await expect(form).toBeVisible()
  await expect(
    form.getByRole('textbox', { name: 'Delivery area' }),
  ).toBeVisible()
  await expect(
    form.getByRole('textbox', { name: 'Delivery date or time' }),
  ).toBeVisible()
  await expect(form.getByRole('button', { name: 'Submit order' })).toBeVisible()
})

test('flower and gifts product form remains available', async ({ page }) => {
  await page.goto('/flowers-gifts')
  await page
    .getByRole('button', { name: /^View / })
    .first()
    .click()

  const form = page.getByRole('dialog')
  await expect(form).toBeVisible()
  await expect(form.getByRole('button', { name: 'Submit order' })).toBeVisible()
})
