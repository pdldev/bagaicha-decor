import { z } from 'zod'

export const productSizeSchema = z.object({
  label: z.enum(['Small', 'Medium', 'Large']),
  price: z.number().nonnegative(),
})

export const serviceSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  category: z.enum(['Weddings', 'Family Rituals', 'Celebrations', 'Vehicles']),
  shortDescription: z.string().min(1),
  longDescription: z.string().min(1),
  heroImage: z.string().min(1),
  gallery: z.array(z.string()),
  inclusions: z.array(z.string()),
  idealFor: z.string().min(1),
  startingPrice: z.string().min(1),
  whatsappTemplate: z.string().min(1),
})

export const bouquetSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().nonnegative(),
  image: z.string().min(1),
  category: z.enum([
    'Rose',
    'Mixed',
    'Marigold',
    'Orchid',
    'Wedding',
    'Bridal',
    'Funeral/Condolence',
    'Custom',
  ]),
  occasions: z.array(z.string()),
  sizes: z.array(productSizeSchema).optional(),
  inStock: z.boolean(),
})

export const giftSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().nonnegative(),
  image: z.string().min(1),
  category: z.enum([
    'Chocolates',
    'Soft toys',
    'Gift hampers',
    'Cakes',
    'Personalised',
    'Combo with flowers',
  ]),
  tags: z.array(z.string()),
})

export const testimonialSchema = z.object({
  quote: z.string().min(1),
  name: z.string().min(1),
  event: z.string().min(1),
})

export const faqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
})

export const enquiryItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  type: z.string().min(1),
  price: z.number().nonnegative().optional(),
  qty: z.number().int().positive(),
})
