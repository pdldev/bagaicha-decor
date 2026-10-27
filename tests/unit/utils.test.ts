import { describe, expect, it } from 'vitest'
import { formatPrice } from '@/lib/utils'

describe('formatPrice', () => {
  it('formats Nepali rupees', () =>
    expect(formatPrice(1250)).toContain('1,250'))
})
