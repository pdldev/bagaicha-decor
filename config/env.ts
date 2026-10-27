import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_WHATSAPP_NUMBER: z
    .string()
    .trim()
    .min(1)
    .default('9779812345678'),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
})

export const env = envSchema.parse(process.env)
