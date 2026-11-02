import { describe, expect, it } from 'vitest'
import { discountedPrice, formatNpr, getOfferPrice } from '@/lib/pricing'
import type { Offer } from '@/lib/schemas/offer'

const offer: Offer = {
  id: 'tihar-2083',
  festival: 'Tihar',
  title: 'Tihar offer',
  discountPercent: 20,
  startsAt: '2026-10-01T00:00:00.000Z',
  endsAt: '2026-11-30T23:59:59.000Z',
  productIds: ['rose', 'gift', 'second-gift'],
  featuredIds: ['rose', 'gift', 'second-gift'],
  heroImage: '/offer.jpg',
  active: true,
}

describe('offer pricing', () => {
  it('rounds discounted prices to the nearest Rs 10 and keeps a Rs 10 minimum', () => {
    expect(discountedPrice(1234, 20)).toBe(990)
    expect(discountedPrice(1000, 20)).toBe(800)
    expect(discountedPrice(10, 50)).toBe(10)
  })

  it('discounts only products named in the offer', () => {
    expect(getOfferPrice({ id: 'rose', price: 2000 }, offer)).toEqual({
      original: 2000,
      final: 1600,
      discounted: true,
    })
    expect(getOfferPrice({ id: 'other', price: 2000 }, offer)).toEqual({
      original: 2000,
      final: 2000,
      discounted: false,
    })
    expect(getOfferPrice({ id: 'rose', price: 2000 }, null).discounted).toBe(
      false,
    )
  })

  it('formats NPR with thousand separators', () => {
    expect(formatNpr(1250)).toBe('Rs. 1,250')
  })
})
