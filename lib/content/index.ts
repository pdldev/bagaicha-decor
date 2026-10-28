import { bouquets as rawBouquets } from '@/data/bouquets'
import { faqs as rawFaqs } from '@/data/faqs'
import { gifts as rawGifts } from '@/data/gifts'
import { services as rawServices } from '@/data/services'
import { testimonials as rawTestimonials } from '@/data/testimonials'
import {
  bouquetSchema,
  faqSchema,
  giftSchema,
  serviceSchema,
  testimonialSchema,
} from '@/lib/schemas/content'
export type {
  Bouquet,
  Faq,
  Gift,
  ProductSize,
  Service,
  ServiceCategory,
  Testimonial,
} from '@/types/content'

const validatedServices = serviceSchema.array().parse(rawServices)
const validatedBouquets = bouquetSchema.array().parse(rawBouquets)
const validatedGifts = giftSchema.array().parse(rawGifts)
const validatedTestimonials = testimonialSchema.array().parse(rawTestimonials)
const validatedFaqs = faqSchema.array().parse(rawFaqs)

export {
  validatedServices as services,
  validatedBouquets as bouquets,
  validatedGifts as gifts,
  validatedTestimonials as testimonials,
  validatedFaqs as faqs,
}

export const getServices = () => validatedServices
export const getServiceBySlug = (slug: string) =>
  validatedServices.find((service) => service.slug === slug)
export const getService = (slug: string) => getServiceBySlug(slug)
export const getServiceCatalogue = (slug: string) =>
  getServiceBySlug(slug)?.catalogue ?? null
export const getBouquets = () => validatedBouquets
export const getGifts = () => validatedGifts
export const getFeaturedBouquets = () =>
  validatedBouquets.filter((bouquet) => bouquet.inStock).slice(0, 4)
export const getTestimonials = () => validatedTestimonials
export const getFaqs = () => validatedFaqs
