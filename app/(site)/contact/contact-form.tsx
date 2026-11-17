'use client'

import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  contactEventTypes,
  contactFormSchema,
} from '@/lib/contact/contact-form-schema'
import type {
  ContactFormInput,
  ContactFormValues,
} from '@/lib/contact/contact-form-schema'
import { buildWhatsAppUrl, contactEnquiryMessage } from '@/lib/whatsapp'
import { trackEvent } from '@/lib/analytics'

export function ContactForm({ earliestDate }: { earliestDate: string }) {
  const [sentUrl, setSentUrl] = useState('')
  const form = useForm<ContactFormInput, unknown, ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      phone: '',
      eventType: '',
      date: '',
      venue: '',
      message: '',
    },
  })

  const message = useWatch({ control: form.control, name: 'message' }) ?? ''

  function onSubmit(values: ContactFormValues) {
    const url = buildWhatsAppUrl(contactEnquiryMessage(values))
    setSentUrl(url)
    trackEvent('contact_submit', { source: 'contact' })
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  if (sentUrl) {
    return (
      <div
        role="status"
        className="border-line flex min-h-80 flex-col justify-center border p-6 sm:p-8"
      >
        <p className="eyebrow">Enquiry ready</p>
        <p className="mt-3 text-sm leading-6">Opening WhatsApp...</p>
        <a
          href={sentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-maroon mt-5 w-fit border-b border-current pb-1 text-sm"
        >
          If nothing opens, tap here
        </a>
      </div>
    )
  }

  const errors = form.formState.errors
  const inputClass =
    'border-line h-12 w-full border bg-background px-3 text-base outline-none focus:border-brand-green'
  const labelClass = 'flex flex-col gap-2 text-xs tracking-[.12em] uppercase'
  const errorClass = 'text-form-error text-xs normal-case'

  return (
    <form
      noValidate
      onSubmit={form.handleSubmit(onSubmit)}
      className="border-line border-t pt-6 sm:pt-8"
    >
      <p className="eyebrow">Send your enquiry</p>
      <h2 className="font-display mt-3 text-4xl leading-tight">
        Send us a few details
      </h2>
      <div className="mt-8 grid gap-x-5 gap-y-6 sm:grid-cols-2">
        <label className={labelClass} htmlFor="contact-name">
          Name
          <input
            id="contact-name"
            {...form.register('name')}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            autoComplete="name"
            className={inputClass}
          />
          {errors.name && (
            <span id="contact-name-error" role="alert" className={errorClass}>
              {errors.name.message}
            </span>
          )}
        </label>

        <label className={labelClass} htmlFor="contact-phone">
          Phone
          <input
            id="contact-phone"
            {...form.register('phone')}
            type="tel"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
            autoComplete="tel"
            className={inputClass}
          />
          {errors.phone && (
            <span id="contact-phone-error" role="alert" className={errorClass}>
              {errors.phone.message}
            </span>
          )}
        </label>

        <label className={labelClass} htmlFor="contact-event-type">
          Event type
          <select
            id="contact-event-type"
            {...form.register('eventType')}
            aria-invalid={Boolean(errors.eventType)}
            aria-describedby={
              errors.eventType ? 'contact-event-type-error' : undefined
            }
            className={inputClass}
            defaultValue=""
          >
            <option value="" disabled>
              Select an event type
            </option>
            {contactEventTypes.map((eventType) => (
              <option key={eventType} value={eventType}>
                {eventType}
              </option>
            ))}
          </select>
          {errors.eventType && (
            <span
              id="contact-event-type-error"
              role="alert"
              className={errorClass}
            >
              {errors.eventType.message}
            </span>
          )}
        </label>

        <label className={labelClass} htmlFor="contact-date">
          Event date
          <input
            id="contact-date"
            {...form.register('date')}
            type="date"
            min={earliestDate}
            aria-invalid={Boolean(errors.date)}
            aria-describedby={errors.date ? 'contact-date-error' : undefined}
            className={inputClass}
          />
          {errors.date && (
            <span id="contact-date-error" role="alert" className={errorClass}>
              {errors.date.message}
            </span>
          )}
        </label>

        <label
          className={`${labelClass} sm:col-span-2`}
          htmlFor="contact-venue"
        >
          Venue or location
          <input
            id="contact-venue"
            {...form.register('venue')}
            aria-invalid={Boolean(errors.venue)}
            aria-describedby={errors.venue ? 'contact-venue-error' : undefined}
            autoComplete="street-address"
            className={inputClass}
          />
          {errors.venue && (
            <span id="contact-venue-error" role="alert" className={errorClass}>
              {errors.venue.message}
            </span>
          )}
        </label>

        <label
          className={`${labelClass} sm:col-span-2`}
          htmlFor="contact-message"
        >
          Message
          <textarea
            id="contact-message"
            {...form.register('message')}
            rows={4}
            maxLength={500}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={
              errors.message ? 'contact-message-error' : undefined
            }
            className="border-line bg-background focus:border-brand-green min-h-32 w-full resize-y border px-3 py-3 text-base outline-none"
          />
          {message.length > 400 && (
            <span aria-live="polite" className="text-ink/60 text-xs">
              {message.length}/500
            </span>
          )}
          {errors.message && (
            <span
              id="contact-message-error"
              role="alert"
              className={errorClass}
            >
              {errors.message.message}
            </span>
          )}
        </label>
      </div>

      <button
        type="submit"
        className="bg-brand-green text-brand-white hover:bg-brand-green-deep mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-[2px] px-6 py-3 text-xs tracking-[.14em] uppercase sm:w-fit"
      >
        Submit
      </button>
      <p className="text-ink/60 mt-4 max-w-xl text-sm leading-6">
        We don&apos;t store your details. Your message opens in WhatsApp, and
        you send it from there.
      </p>
    </form>
  )
}
