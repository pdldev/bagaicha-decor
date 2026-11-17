import { z } from 'zod'
import { isPastEventDate } from './opening-hours'

export const contactEventTypes = [
  'Wedding',
  'Pasni',
  'Bratabandha',
  'Haldi and Mehendi',
  'Birthday',
  'Reception',
  'Car decoration',
  'Flowers and gifts',
  'Other',
] as const

const clean = (value: string) =>
  value.replace(/[\u0000-\u001F\u007F\u200B-\u200D\uFEFF]/g, '').trim()

export const contactFormSchema = z.object({
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
  eventType: z
    .string()
    .transform(clean)
    .pipe(
      z.enum(contactEventTypes, {
        error: 'Please choose an event type.',
      }),
    ),
  date: z
    .string()
    .transform(clean)
    .pipe(
      z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Please choose a valid event date.')
        .refine((value) => {
          const parsed = new Date(`${value}T00:00:00.000Z`)
          return (
            !Number.isNaN(parsed.getTime()) &&
            parsed.toISOString().slice(0, 10) === value
          )
        }, 'Please choose a valid event date.')
        .refine((value) => !isPastEventDate(value), {
          message: 'Please choose a date that is today or later.',
        }),
    ),
  venue: z
    .string()
    .transform(clean)
    .pipe(z.string().min(2, 'Please add a venue or location.').max(150)),
  message: z
    .string()
    .transform(clean)
    .pipe(
      z
        .string()
        .min(10, 'Please add a little more detail.')
        .max(500, 'Please keep your message under 500 characters.'),
    ),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>
export type ContactFormInput = z.input<typeof contactFormSchema>
