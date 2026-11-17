import type { Offer } from '@/lib/schemas/offer'

export const offers: Offer[] = [
  {
    id: 'tihar-2083',
    festival: 'Tihar',
    title: 'Tihar 20% off selected flowers and gifts',
    discountPercent: 20,
    startsAt: '2026-10-01T00:00:00.000Z',
    endsAt: '2026-11-30T23:59:59.000Z',
    productIds: ['b2', 'b11', 'phool-mithai-combo'],
    featuredIds: ['b2', 'b11', 'phool-mithai-combo'],
    heroImage:
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=85',
    active: true,
  },
  {
    id: 'dashain-2083',
    festival: 'Dashain',
    title: 'Dashain flowers and gifts offer',
    discountPercent: 20,
    startsAt: '2026-09-01T00:00:00.000Z',
    endsAt: '2026-10-15T23:59:59.000Z',
    productIds: ['b18', 'b24', 'celebrate-box'],
    featuredIds: ['b18', 'b24', 'celebrate-box'],
    heroImage:
      'https://images.unsplash.com/photo-1487070183336-b863922373d4?auto=format&fit=crop&w=1200&q=85',
    active: false,
  },
]
