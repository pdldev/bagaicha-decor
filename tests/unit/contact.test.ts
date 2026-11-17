import { describe, expect, it } from 'vitest'
import { contactFormSchema } from '@/lib/contact/contact-form-schema'
import {
  getContactOpeningStatus,
  getKathmanduDate,
} from '@/lib/contact/opening-hours'
import { contactEnquiryMessage } from '@/lib/whatsapp'

const validEnquiry = {
  name: 'Asha',
  phone: '+977 9800000000',
  eventType: 'Wedding',
  date: '2099-12-31',
  venue: 'Pokhara',
  message: 'We are planning a small garden wedding.',
}

describe('contact form validation', () => {
  it('requires all enquiry fields', () => {
    expect(contactFormSchema.safeParse({}).success).toBe(false)
  })

  it('accepts a complete enquiry', () => {
    expect(contactFormSchema.safeParse(validEnquiry).success).toBe(true)
  })

  it('validates phone format and field length limits', () => {
    expect(
      contactFormSchema.safeParse({ ...validEnquiry, phone: 'call me' })
        .success,
    ).toBe(false)
    expect(
      contactFormSchema.safeParse({
        ...validEnquiry,
        name: 'A'.repeat(81),
      }).success,
    ).toBe(false)
    expect(
      contactFormSchema.safeParse({
        ...validEnquiry,
        venue: 'V'.repeat(151),
      }).success,
    ).toBe(false)
    expect(
      contactFormSchema.safeParse({
        ...validEnquiry,
        message: 'M'.repeat(501),
      }).success,
    ).toBe(false)
  })

  it('rejects event dates in the past', () => {
    expect(
      contactFormSchema.safeParse({
        ...validEnquiry,
        date: '2000-01-01',
      }).success,
    ).toBe(false)
  })
})

describe('contact WhatsApp enquiry message', () => {
  it('includes the submitted contact and event details', () => {
    const message = contactEnquiryMessage(validEnquiry)
    expect(message).toContain('Asha')
    expect(message).toContain('Wedding')
    expect(message).toContain('2099-12-31')
    expect(message).toContain('Pokhara')
  })
})

describe('Kathmandu contact hours', () => {
  it('calculates the open status in Asia/Kathmandu time', () => {
    expect(getContactOpeningStatus(new Date('2026-01-02T04:15:00Z'))).toEqual({
      isOpen: true,
      label: 'Open now',
    })
    expect(getContactOpeningStatus(new Date('2026-01-02T01:15:00Z'))).toEqual({
      isOpen: true,
      label: 'Open now',
    })
    expect(getContactOpeningStatus(new Date('2026-01-02T00:45:00Z'))).toEqual({
      isOpen: false,
      label: 'Closed now',
    })
    expect(getContactOpeningStatus(new Date('2026-01-02T13:15:00Z'))).toEqual({
      isOpen: false,
      label: 'Closed now',
    })
    expect(getKathmanduDate(new Date('2026-01-02T18:30:00Z'))).toBe(
      '2026-01-03',
    )
  })
})
