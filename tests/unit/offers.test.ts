import { describe, expect, it, vi } from 'vitest'
import { getActiveOffer } from '@/lib/content'
import { offerQuerySchema, offerSchema } from '@/lib/schemas/offer'
import { offers } from '@/data/offers'
import { bouquets } from '@/data/bouquets'
import { gifts } from '@/data/gifts'

vi.mock('@/data/services', () => ({ services: [] }))

describe('festival offers', () => {
  it('returns an active offer only within its date window', () => {
    expect(getActiveOffer(new Date('2026-09-30T23:59:59.000Z'))).toBeNull()
    expect(getActiveOffer(new Date('2026-11-02T12:00:00.000Z'))?.id).toBe(
      'tihar-2083',
    )
    expect(getActiveOffer(new Date('2026-12-01T00:00:00.000Z'))).toBeNull()
  })

  it('validates offers and rejects invalid date ranges and discounts', () => {
    const seed = offers[0]
    expect(offerSchema.safeParse(seed).success).toBe(true)
    expect(
      offerSchema.safeParse({
        ...seed,
        startsAt: '2026-12-01T00:00:00.000Z',
        endsAt: '2026-11-01T00:00:00.000Z',
      }).success,
    ).toBe(false)
    expect(offerSchema.safeParse({ ...seed, discountPercent: 0 }).success).toBe(
      false,
    )
    expect(
      offerSchema.safeParse({ ...seed, discountPercent: 51 }).success,
    ).toBe(false)
    expect(
      offerSchema.safeParse({ ...seed, discountPercent: 12.5 }).success,
    ).toBe(true)
    expect(
      offerSchema.safeParse({ ...seed, featuredIds: ['marigold-mala'] })
        .success,
    ).toBe(false)
  })

  it('references products and popup products that exist', () => {
    const productIds = new Set(
      [...bouquets, ...gifts].map((product) => product.id),
    )
    for (const offer of offers) {
      expect(offer.productIds.every((id) => productIds.has(id))).toBe(true)
      expect(offer.featuredIds.every((id) => productIds.has(id))).toBe(true)
    }
  })

  it('validates offer query IDs', () => {
    expect(offerQuerySchema.safeParse('tihar-2083').success).toBe(true)
    expect(offerQuerySchema.safeParse('tihar%3Cscript%3E').success).toBe(false)
  })
})
