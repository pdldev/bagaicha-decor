import { describe, expect, it } from 'vitest'
import { bouquets } from '@/data/bouquets'

describe('listed bouquet products', () => {
  it('includes each selected numbered bouquet product at its listed price', () => {
    const expectedPrices: Record<string, number> = {
      b1: 3100,
      b2: 750,
      b4: 2100,
      b6: 3000,
      b7: 3500,
      b8: 2500,
      b9: 2250,
      b11: 3200,
      b15: 5500,
      b16: 3500,
      b18: 2450,
      b20: 2100,
      b21: 2500,
      b24: 2000,
      b25: 1200,
      b26: 2500,
      b27: 1800,
      b28: 1200,
      b29: 800,
      b31: 2500,
      b32: 1200,
      b33: 2000,
    }

    const selectedIds = Object.keys(expectedPrices)

    expect(bouquets.map((bouquet) => bouquet.id)).toEqual(selectedIds)
    for (const bouquet of bouquets) {
      expect(bouquet.price).toBe(expectedPrices[bouquet.id])
      const imageSource =
        typeof bouquet.image === 'string' ? bouquet.image : bouquet.image.src
      expect(imageSource).toContain(`/app/bouquet/${bouquet.id}.png`)
    }
  })
})
