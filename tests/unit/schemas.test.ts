import { describe, expect, it } from 'vitest'
import {
  bouquetSchema,
  enquiryItemSchema,
  giftSchema,
  serviceSchema,
} from '@/lib/schemas/content'

describe('content schemas', () => {
  it('accepts valid enquiry items and rejects invalid quantities', () => {
    expect(
      enquiryItemSchema.safeParse({
        id: '1',
        name: 'Rose',
        type: 'bouquet',
        qty: 1,
      }).success,
    ).toBe(true)
    expect(
      enquiryItemSchema.safeParse({
        id: '1',
        name: 'Rose',
        type: 'bouquet',
        qty: 0,
      }).success,
    ).toBe(false)
  })
  it('requires complete product and service content', () => {
    expect(
      bouquetSchema.safeParse({
        id: 'x',
        name: 'Rose',
        description: 'Fresh',
        price: 500,
        image: '/rose.jpg',
        category: 'Rose',
        occasions: [],
        inStock: true,
      }).success,
    ).toBe(true)
    expect(
      giftSchema.safeParse({
        id: 'x',
        name: 'Gift',
        description: 'Kind',
        price: 500,
        image: '/gift.jpg',
        category: 'Cakes',
        tags: [],
      }).success,
    ).toBe(true)
    expect(
      serviceSchema.safeParse({
        slug: 'x',
        name: 'Wedding',
        category: 'Weddings',
        shortDescription: 'A',
        longDescription: 'B',
        heroImage: '/x.jpg',
        gallery: [],
        inclusions: [],
        idealFor: 'All',
        startingPrice: 'Rs. 1',
        whatsappTemplate: 'Hi',
      }).success,
    ).toBe(true)
  })
})
