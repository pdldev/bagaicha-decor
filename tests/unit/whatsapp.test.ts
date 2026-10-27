import { describe, expect, it } from 'vitest'
import { buildWhatsAppUrl } from '@/lib/whatsapp/build-url'
import {
  basketMessage,
  contactFormMessage,
  greetingMessage,
  productOrderMessage,
  serviceBookingMessage,
} from '@/lib/whatsapp/message-templates'

describe('buildWhatsAppUrl', () => {
  it('encodes Nepali text and line breaks', () => {
    const url = buildWhatsAppUrl('नमस्ते\nFlowers & joy')
    expect(url).toContain('https://wa.me/')
    expect(decodeURIComponent(url.split('text=')[1])).toContain(
      'नमस्ते\nFlowers & joy',
    )
  })
  it('caps long messages', () =>
    expect(
      decodeURIComponent(buildWhatsAppUrl('x'.repeat(3000)).split('text=')[1])
        .length,
    ).toBeLessThanOrEqual(1500))
})

describe('message templates', () => {
  it('creates every template', () => {
    expect(greetingMessage()).toContain('Bagaicha')
    expect(serviceBookingMessage({ name: 'Pasni' })).toContain('Pasni')
    expect(productOrderMessage({ name: 'Bouquet' })).toContain('Bouquet')
    expect(
      basketMessage([{ id: '1', name: 'Rose', type: 'bouquet', qty: 2 }]),
    ).toContain('Rose x2')
    expect(
      contactFormMessage({
        name: 'Asha',
        phone: '980',
        eventType: 'Wedding',
        message: 'Hello',
      }),
    ).toContain('Asha')
  })
})
