import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().trim().url().optional(),
  NEXT_PUBLIC_PHONE_NUMBER: z.string().trim().optional(),
  NEXT_PUBLIC_WHATSAPP_NUMBER: z.string().trim().min(1).optional(),
  NEXT_PUBLIC_GOOGLE_BUSINESS_PROFILE_URL: z.string().trim().url().optional(),
  NEXT_PUBLIC_GEO_LATITUDE: z.string().trim().optional(),
  NEXT_PUBLIC_GEO_LONGITUDE: z.string().trim().optional(),
  NEXT_PUBLIC_GOOGLE_MAPS_URL: z.string().trim().url().optional(),
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
})

export const env = envSchema.parse(process.env)
