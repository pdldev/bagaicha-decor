import { expect, test, type Page } from '@playwright/test'

async function scrollThroughAndCheck(page: Page, selector: string) {
  const targets = page.locator(selector)
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto'
  })

  for (const target of await targets.all()) {
    await target.evaluate((element) =>
      element.scrollIntoView({ block: 'center' }),
    )
    if (await target.getAttribute('data-motion')) {
      await expect(target).toHaveClass(/motion-visible/)
    }
  }

  await page.waitForTimeout(2000)
  const styles = await targets.evaluateAll((elements: HTMLElement[]) =>
    elements.map((element) => {
      const style = getComputedStyle(element)
      return {
        opacity: style.opacity,
        transform: style.transform,
      }
    }),
  )

  expect(
    styles.filter(
      ({ opacity, transform }) => opacity !== '1' || transform !== 'none',
    ),
  ).toEqual([])
}

test('home section animations finish after scrolling into view', async ({
  page,
}) => {
  await page.goto('/')
  await scrollThroughAndCheck(
    page,
    '[data-motion^="why-"], .motion-image-scale',
  )
  await scrollThroughAndCheck(
    page,
    '[data-motion="how-label"], [data-motion="how-heading"], [data-motion="timeline-line"], [data-motion^="step-"]',
  )
})

test('home motion is visible without animation when reduced motion is requested', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')

  const styles = await page
    .locator('[data-motion], .motion-image-scale')
    .evaluateAll((elements: HTMLElement[]) =>
      elements.map((element) => {
        const style = getComputedStyle(element)
        return { opacity: style.opacity, transform: style.transform }
      }),
    )

  expect(
    styles.every(
      ({ opacity, transform }) => opacity === '1' && transform === 'none',
    ),
  ).toBe(true)
})

test('home motion content remains visible with JavaScript disabled', async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 375, height: 812 },
  })
  const page = await context.newPage()
  await page.goto('/')

  const styles = await page
    .locator('[data-motion], .motion-image-scale')
    .evaluateAll((elements: HTMLElement[]) =>
      elements.map((element) => {
        const style = getComputedStyle(element)
        return { opacity: style.opacity, transform: style.transform }
      }),
    )

  expect(
    styles.every(
      ({ opacity, transform }) => opacity === '1' && transform === 'none',
    ),
  ).toBe(true)
  await context.close()
})

test('home sections do not overflow at mobile, tablet, or desktop widths', async ({
  page,
}) => {
  for (const width of [375, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    await page.locator('[data-motion="why-label"]').scrollIntoViewIfNeeded()
    await page.locator('[data-motion="how-label"]').scrollIntoViewIfNeeded()

    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true)
    await page.waitForTimeout(1800)
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true)
  }
})
