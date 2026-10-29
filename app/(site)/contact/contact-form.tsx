'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { services } from '@/lib/content'
import { trackEvent } from '@/lib/analytics'

const clean = (value: string) =>
  value.replace(/[\\u0000-\\u001F\\u007F\\u200B-\\u200D\\uFEFF]/g, '').trim()
const schema = z.object({
  name: z
    .string()
    .transform(clean)
    .pipe(z.string().min(2, 'Please tell us your name.').max(80)),
  phone: z
    .string()
    .transform(clean)
    .pipe(
      z
        .string()
        .regex(/^[+\d][\d +]{6,19}$/, 'Please add a valid phone number.'),
    ),
  eventType: z.string().transform(clean).pipe(z.string().min(1).max(80)),
  date: z.string().transform(clean).pipe(z.string().min(1)),
  venue: z.string().transform(clean).pipe(z.string().min(2).max(150)),
  message: z.string().transform(clean).pipe(z.string().min(10).max(500)),
})

type FormValues = z.infer<typeof schema>

export function ContactForm() {
  const [sent, setSent] = useState(false)
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      phone: '',
      eventType: '',
      date: '',
      venue: '',
      message: '',
    },
  })
  const whatsappUrl = (values: FormValues) =>
    buildWhatsAppUrl(
      `Namaste Bagaicha Flower Decor! My name is ${values.name}.\nEvent: ${values.eventType}\nDate: ${values.date}\nVenue: ${values.venue}\nPhone: ${values.phone}\nMessage: ${values.message}`,
    )

  function onSubmit(values: FormValues) {
    const url = whatsappUrl(values)
    setSent(true)
    trackEvent('contact_submit', { source: 'contact' })
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  if (sent) {
    const url = whatsappUrl(form.getValues())
    return (
      <div
        role="status"
        className="border-line bg-surface/60 flex min-h-[420px] flex-col justify-center border p-7 sm:p-10"
      >
        <p className="eyebrow">Enquiry ready</p>
        <h2 className="font-display mt-4 text-5xl leading-none font-light">
          Opening WhatsApp...
        </h2>
        <p className="text-ink/70 mt-5 max-w-sm text-sm leading-7">
          If WhatsApp did not open automatically, use the link below and
          we&apos;ll be happy to help.
        </p>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="border-maroon text-maroon mt-8 inline-flex w-fit border-b pb-1 text-sm font-medium"
        >
          Tap here to continue
        </a>
      </div>
    )
  }

  const fields = form.register
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
      className="border-line bg-surface/60 flex flex-col gap-5 border p-6 sm:p-9"
    >
      <div>
        <p className="eyebrow">Send your enquiry</p>
        <h2 className="font-display mt-3 text-4xl leading-none font-light">
          Tell us a little about it.
        </h2>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-xs tracking-[.16em] uppercase">
          Name
          <input
            {...fields('name')}
            aria-invalid={Boolean(form.formState.errors.name)}
            aria-describedby={
              form.formState.errors.name ? 'name-error' : undefined
            }
            autoComplete="name"
            className="border-line placeholder:text-ink/35 focus:border-maroon border-0 border-b bg-transparent px-0 py-3 text-sm tracking-normal normal-case outline-none"
            placeholder="Your name"
          />
          {form.formState.errors.name && (
            <span
              id="name-error"
              role="alert"
              className="text-maroon text-[11px] tracking-normal normal-case"
            >
              {form.formState.errors.name.message}
            </span>
          )}
        </label>
        <label className="flex flex-col gap-2 text-xs tracking-[.16em] uppercase">
          Phone
          <input
            {...fields('phone')}
            type="tel"
            aria-invalid={Boolean(form.formState.errors.phone)}
            aria-describedby={
              form.formState.errors.phone ? 'phone-error' : undefined
            }
            autoComplete="tel"
            className="border-line placeholder:text-ink/35 focus:border-maroon border-0 border-b bg-transparent px-0 py-3 text-sm tracking-normal normal-case outline-none"
            placeholder="98..."
          />
          {form.formState.errors.phone && (
            <span
              id="phone-error"
              role="alert"
              className="text-maroon text-[11px] tracking-normal normal-case"
            >
              {form.formState.errors.phone.message}
            </span>
          )}
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-xs tracking-[.16em] uppercase">
          Event type
          <select
            {...fields('eventType')}
            aria-invalid={Boolean(form.formState.errors.eventType)}
            aria-describedby={
              form.formState.errors.eventType ? 'event-type-error' : undefined
            }
            className="border-line focus:border-maroon border-0 border-b bg-transparent px-0 py-3 text-sm tracking-normal normal-case outline-none"
          >
            <option value="">Choose one</option>
            {services.map((service) => (
              <option key={service.slug}>{service.name}</option>
            ))}
            <option>Flowers/Gifts</option>
            <option>Other</option>
          </select>
          {form.formState.errors.eventType && (
            <span
              id="event-type-error"
              role="alert"
              className="text-maroon text-[11px] tracking-normal normal-case"
            >
              {form.formState.errors.eventType.message}
            </span>
          )}
        </label>
        <label className="flex flex-col gap-2 text-xs tracking-[.16em] uppercase">
          Event date
          <input
            {...fields('date')}
            type="date"
            aria-invalid={Boolean(form.formState.errors.date)}
            aria-describedby={
              form.formState.errors.date ? 'date-error' : undefined
            }
            className="border-line focus:border-maroon border-0 border-b bg-transparent px-0 py-3 text-sm tracking-normal normal-case outline-none"
          />
          {form.formState.errors.date && (
            <span
              id="date-error"
              role="alert"
              className="text-maroon text-[11px] tracking-normal normal-case"
            >
              {form.formState.errors.date.message}
            </span>
          )}
        </label>
      </div>
      <label className="flex flex-col gap-2 text-xs tracking-[.16em] uppercase">
        Venue / location
        <input
          {...fields('venue')}
          aria-invalid={Boolean(form.formState.errors.venue)}
          aria-describedby={
            form.formState.errors.venue ? 'venue-error' : undefined
          }
          autoComplete="street-address"
          className="border-line placeholder:text-ink/35 focus:border-maroon border-0 border-b bg-transparent px-0 py-3 text-sm tracking-normal normal-case outline-none"
          placeholder="Where will it be?"
        />
        {form.formState.errors.venue && (
          <span
            id="venue-error"
            role="alert"
            className="text-maroon text-[11px] tracking-normal normal-case"
          >
            {form.formState.errors.venue.message}
          </span>
        )}
      </label>
      <label className="flex flex-col gap-2 text-xs tracking-[.16em] uppercase">
        Message
        <textarea
          {...fields('message')}
          aria-invalid={Boolean(form.formState.errors.message)}
          aria-describedby={
            form.formState.errors.message ? 'message-error' : undefined
          }
          rows={4}
          className="border-line placeholder:text-ink/35 focus:border-maroon resize-none border-0 border-b bg-transparent px-0 py-3 text-sm tracking-normal normal-case outline-none"
          placeholder="Colours, guest count, anything you already know..."
        />
        {form.formState.errors.message && (
          <span
            id="message-error"
            role="alert"
            className="text-maroon text-[11px] tracking-normal normal-case"
          >
            {form.formState.errors.message.message}
          </span>
        )}
      </label>
      <button
        type="submit"
        className="bg-maroon text-background hover:bg-sage mt-2 inline-flex w-fit px-6 py-3 text-xs font-medium tracking-[.16em] uppercase transition"
      >
        Open WhatsApp
      </button>
    </form>
  )
}
