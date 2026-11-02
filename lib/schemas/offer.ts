import { z } from 'zod'

export const offerIdSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)

export const offerSchema = z
  .object({
    id: offerIdSchema,
    festival: z.enum(['Tihar', 'Dashain']),
    title: z.string().min(1),
    discountPercent: z.number().min(1).max(50),
    startsAt: z.iso.datetime(),
    endsAt: z.iso.datetime(),
    productIds: z.array(z.string().min(1)).min(1),
    featuredIds: z.array(z.string().min(1)).length(3),
    heroImage: z.string().min(1),
    active: z.boolean(),
  })
  .refine((offer) => new Date(offer.endsAt) >= new Date(offer.startsAt), {
    message: 'Offer end date must be on or after its start date',
    path: ['endsAt'],
  })
  .refine(
    (offer) => offer.featuredIds.every((id) => offer.productIds.includes(id)),
    {
      message: 'Featured products must be included in productIds',
      path: ['featuredIds'],
    },
  )
  .refine((offer) => new Set(offer.featuredIds).size === 3, {
    message: 'Featured products must be unique',
    path: ['featuredIds'],
  })

export const offerQuerySchema = offerIdSchema

export type Offer = z.infer<typeof offerSchema>
