import { expect, test } from '@playwright/test'

test('gallery lightbox navigates forward and backward and closes', async ({
  page,
}) => {
  await page.goto('/gallary')
  await page.getByRole('button', { name: 'Open image 1', exact: true }).click()

  const dialog = page.getByRole('dialog', { name: 'Gallery image' })
  const image = dialog.getByRole('img')
  await expect(image).toHaveAttribute('alt', 'Expanded gallery image 1')

  await dialog.getByRole('button', { name: 'Next image' }).click()
  await expect(image).toHaveAttribute('alt', 'Expanded gallery image 2')
  await dialog.getByRole('button', { name: 'Previous image' }).click()
  await expect(image).toHaveAttribute('alt', 'Expanded gallery image 1')

  await page.keyboard.press('ArrowRight')
  await expect(image).toHaveAttribute('alt', 'Expanded gallery image 2')
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()

  await page.getByRole('button', { name: 'Open image 1', exact: true }).click()
  await page.getByRole('button', { name: 'Close gallery' }).click()
  await expect(dialog).toBeHidden()
})

test('homepage gallery lightbox also supports arrow controls', async ({
  page,
}) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Open gallery image 1' }).click()

  const dialog = page.getByRole('dialog', { name: 'Gallery image' })
  const image = dialog.getByRole('img')
  await expect(image).toHaveAttribute(
    'alt',
    'Enlarged Bagaicha gallery image 1',
  )

  await dialog.getByRole('button', { name: 'Next image' }).click()
  await expect(image).toHaveAttribute(
    'alt',
    'Enlarged Bagaicha gallery image 2',
  )
  await dialog.getByRole('button', { name: 'Previous image' }).click()
  await expect(image).toHaveAttribute(
    'alt',
    'Enlarged Bagaicha gallery image 1',
  )
  await dialog.getByRole('button', { name: 'Close gallery' }).click()
  await expect(dialog).toBeHidden()
})
